import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreateDrugInput } from './dto/create-drug.input';
import { UpdateDrugInput } from './dto/update-drug.input';
import { CreateDrugScheduleInput } from './dto/create-drug-schedule.input';
import { UpdateDrugScheduleInput } from './dto/update-drug-schedule.input';
import { DrugOrderInput } from './dto/drug-order.input';
import { DrugConnection } from './models/drug-connection.model';
import { DrugScheduleConnection } from './models/drug-schedule-connection.model';
import { DrugOrderField } from './models/drug-order-field.enum';
import { FrequencyUnit, DrugSchedule, Drug, Prisma } from '@prisma/client';
import { PaginationArgs } from '../common/pagination/pagination.args';

@Injectable()
export class DrugsService {
  constructor(private prisma: PrismaService) {}

  async createDrug(userId: string, input: CreateDrugInput): Promise<Drug> {
    const drug = await this.prisma.drug.create({
      data: {
        ...input,
        userId,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
      },
    });

    await this.generateDrugSchedules(drug.id, drug);

    return this.prisma.drug.findUnique({
      where: { id: drug.id },
    });
  }

  async updateDrug(
    userId: string,
    id: string,
    input: UpdateDrugInput,
  ): Promise<Drug> {
    const drug = await this.findDrugById(id);
    this.ensureUserOwnsDrug(drug, userId);

    const updatedDrug = await this.prisma.drug.update({
      where: { id },
      data: {
        ...input,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        endDate: input.endDate ? new Date(input.endDate) : undefined,
      },
    });

    if (
      input.frequency ||
      input.frequencyUnit ||
      input.startDate ||
      input.endDate
    ) {
      await this.prisma.drugSchedule.deleteMany({
        where: { drugId: id },
      });
      await this.generateDrugSchedules(id, updatedDrug);
    }

    return this.prisma.drug.findUnique({
      where: { id },
    });
  }

  async deleteDrug(userId: string, id: string): Promise<boolean> {
    const drug = await this.findDrugById(id);
    this.ensureUserOwnsDrug(drug, userId);

    await this.prisma.drug.delete({
      where: { id },
    });

    return true;
  }

  async findDrugById(id: string): Promise<Drug> {
    const drug = await this.prisma.drug.findUnique({
      where: { id },
    });

    if (!drug) {
      throw new NotFoundException('Drug not found');
    }

    return drug;
  }

  async findDrugs(
    userId: string,
    { after, before, first, last }: PaginationArgs,
    orderBy?: DrugOrderInput,
    isActive?: boolean,
  ): Promise<DrugConnection> {
    const where: Prisma.DrugWhereInput = {
      userId,
      ...(isActive !== undefined && { isActive }),
    };

    const orderByClause = orderBy
      ? {
          [this.getOrderField(orderBy.field)]: orderBy.direction.toLowerCase(),
        }
      : { createdAt: 'desc' };

    return findManyCursorConnection(
      (args) =>
        this.prisma.drug.findMany({
          where,
          orderBy: orderByClause as Prisma.DrugOrderByWithRelationInput,
          ...args,
        }),
      () => this.prisma.drug.count({ where }),
      { first, last, before, after },
    ) as unknown as DrugConnection;
  }

  async createDrugSchedule(
    userId: string,
    input: CreateDrugScheduleInput,
  ): Promise<DrugSchedule> {
    const drug = await this.findDrugById(input.drugId);
    this.ensureUserOwnsDrug(drug, userId);

    return this.prisma.drugSchedule.create({
      data: input,
    });
  }

  async updateDrugSchedule(
    userId: string,
    id: string,
    input: UpdateDrugScheduleInput,
  ): Promise<DrugSchedule> {
    const schedule = await this.findDrugScheduleById(id);
    const drug = await this.findDrugById(schedule.drugId);
    this.ensureUserOwnsDrug(drug, userId);

    return this.prisma.drugSchedule.update({
      where: { id },
      data: {
        ...input,
        takenAt: input.takenAt ? new Date(input.takenAt) : undefined,
      },
    });
  }

  async deleteDrugSchedule(userId: string, id: string): Promise<boolean> {
    const schedule = await this.findDrugScheduleById(id);
    const drug = await this.findDrugById(schedule.drugId);
    this.ensureUserOwnsDrug(drug, userId);

    await this.prisma.drugSchedule.delete({
      where: { id },
    });

    return true;
  }

  async markDrugTaken(
    userId: string,
    scheduleId: string,
    takenAt?: Date,
  ): Promise<DrugSchedule> {
    const schedule = await this.findDrugScheduleById(scheduleId);
    const drug = await this.findDrugById(schedule.drugId);
    this.ensureUserOwnsDrug(drug, userId);

    return this.prisma.drugSchedule.update({
      where: { id: scheduleId },
      data: {
        taken: true,
        takenAt: takenAt || new Date(),
      },
    });
  }

  async findDrugSchedules(
    userId: string,
    drugId: string,
    { after, before, first, last }: PaginationArgs,
  ): Promise<DrugScheduleConnection> {
    const drug = await this.findDrugById(drugId);
    this.ensureUserOwnsDrug(drug, userId);

    const where: Prisma.DrugScheduleWhereInput = { drugId };

    return findManyCursorConnection(
      (args) =>
        this.prisma.drugSchedule.findMany({
          where,
          orderBy: { time: 'asc' },
          ...args,
        }),
      () => this.prisma.drugSchedule.count({ where }),
      { first, last, before, after },
    ) as unknown as DrugScheduleConnection;
  }

  async getUpcomingDrugs(userId: string): Promise<Drug[]> {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.prisma.drug.findMany({
      where: {
        userId,
        isActive: true,
        startDate: { lte: tomorrow },
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      orderBy: { startDate: 'asc' },
    });
  }

  private async generateDrugSchedules(
    drugId: string,
    drug: any,
  ): Promise<void> {
    const schedules = this.calculateDrugSchedules(drug);

    if (schedules.length > 0) {
      await this.prisma.drugSchedule.createMany({
        data: schedules.map((schedule) => ({
          drugId,
          time: schedule.time,
          dosage: schedule.dosage,
        })),
      });
    }
  }

  private calculateDrugSchedules(
    drug: any,
  ): Array<{ time: string; dosage: string }> {
    const schedules: Array<{ time: string; dosage: string }> = [];
    const startDate = new Date(drug.startDate);
    const endDate = drug.endDate ? new Date(drug.endDate) : null;

    let currentDate = new Date(startDate);
    const maxDate = endDate || new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    while (currentDate <= maxDate && (!endDate || currentDate <= endDate)) {
      const timeSlots = this.getTimeSlotsForFrequency(
        drug.frequency,
        drug.frequencyUnit,
      );

      for (const timeSlot of timeSlots) {
        schedules.push({
          time: timeSlot,
          dosage: drug.dosage,
        });
      }

      currentDate = this.getNextScheduleDate(
        currentDate,
        drug.frequency,
        drug.frequencyUnit,
      );
    }

    return schedules;
  }

  private getTimeSlotsForFrequency(
    frequency: number,
    unit: FrequencyUnit,
  ): string[] {
    const slots: string[] = [];
    const totalHours = this.getTotalHours(frequency, unit);
    const hoursPerSlot = 24 / frequency;

    for (let i = 0; i < frequency; i++) {
      const hour = Math.floor(i * hoursPerSlot);
      const minute = Math.floor((i * hoursPerSlot - hour) * 60);
      slots.push(
        `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`,
      );
    }

    return slots;
  }

  private getTotalHours(frequency: number, unit: FrequencyUnit): number {
    switch (unit) {
      case FrequencyUnit.HOURS:
        return frequency;
      case FrequencyUnit.DAYS:
        return frequency * 24;
      case FrequencyUnit.WEEKS:
        return frequency * 24 * 7;
      default:
        return 24;
    }
  }

  private getNextScheduleDate(
    currentDate: Date,
    frequency: number,
    unit: FrequencyUnit,
  ): Date {
    const nextDate = new Date(currentDate);

    switch (unit) {
      case FrequencyUnit.HOURS:
        nextDate.setHours(nextDate.getHours() + frequency);
        break;
      case FrequencyUnit.DAYS:
        nextDate.setDate(nextDate.getDate() + frequency);
        break;
      case FrequencyUnit.WEEKS:
        nextDate.setDate(nextDate.getDate() + frequency * 7);
        break;
    }

    return nextDate;
  }

  private async findDrugScheduleById(id: string): Promise<DrugSchedule> {
    const schedule = await this.prisma.drugSchedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException('Drug schedule not found');
    }

    return schedule;
  }

  private ensureUserOwnsDrug(drug: Drug, userId: string): void {
    if (drug.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this drug',
      );
    }
  }

  private getOrderField(field: DrugOrderField): string {
    switch (field) {
      case DrugOrderField.CREATED_AT:
        return 'createdAt';
      case DrugOrderField.UPDATED_AT:
        return 'updatedAt';
      case DrugOrderField.NAME:
        return 'name';
      case DrugOrderField.START_DATE:
        return 'startDate';
      default:
        return 'createdAt';
    }
  }
}
