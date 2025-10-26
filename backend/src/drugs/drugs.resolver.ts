import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserEntity } from '../common/decorators/user.decorator';
import { Role } from '@prisma/client';
import { DrugsService } from './drugs.service';
import { CreateDrugInput } from './dto/create-drug.input';
import { UpdateDrugInput } from './dto/update-drug.input';
import { CreateDrugScheduleInput } from './dto/create-drug-schedule.input';
import { UpdateDrugScheduleInput } from './dto/update-drug-schedule.input';
import { DrugOrderInput } from './dto/drug-order.input';
import { DrugConnection } from './models/drug-connection.model';
import { DrugScheduleConnection } from './models/drug-schedule-connection.model';
import { Drug } from './models/drug.model';
import { DrugSchedule } from './models/drug-schedule.model';
import { User } from '../users/models/user.model';
import { PaginationArgs } from '../common/pagination/pagination.args';

@Resolver(() => Drug)
@UseGuards(GqlAuthGuard, RolesGuard)
export class DrugsResolver {
  constructor(
    private readonly drugsService: DrugsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => DrugConnection)
  async drugs(
    @UserEntity() user: any,
    @Args() pagination: PaginationArgs,
    @Args('orderBy', { nullable: true }) orderBy?: DrugOrderInput,
    @Args('isActive', { nullable: true }) isActive?: boolean,
  ): Promise<DrugConnection> {
    return this.drugsService.findDrugs(user.id, pagination, orderBy, isActive);
  }

  @Query(() => Drug, { nullable: true })
  async drug(
    @Args('id') id: string,
    @UserEntity() user: any,
  ): Promise<Drug | null> {
    try {
      return (await this.drugsService.findDrugById(id)) as unknown as Drug;
    } catch (error) {
      return null;
    }
  }

  @Query(() => DrugScheduleConnection)
  async drugSchedules(
    @Args('drugId') drugId: string,
    @Args() pagination: PaginationArgs,
    @UserEntity() user: any,
  ): Promise<DrugScheduleConnection> {
    return this.drugsService.findDrugSchedules(user.id, drugId, pagination);
  }

  @Query(() => [Drug])
  async upcomingDrugs(@UserEntity() user: any): Promise<Drug[]> {
    return (await this.drugsService.getUpcomingDrugs(
      user.id,
    )) as unknown as Drug[];
  }

  @Mutation(() => Drug)
  @Roles(Role.USER, Role.ADMIN)
  async createDrug(
    @Args('input') input: CreateDrugInput,
    @UserEntity() user: any,
  ): Promise<Drug> {
    return (await this.drugsService.createDrug(
      user.id,
      input,
    )) as unknown as Drug;
  }

  @Mutation(() => Drug)
  @Roles(Role.USER, Role.ADMIN)
  async updateDrug(
    @Args('id') id: string,
    @Args('input') input: UpdateDrugInput,
    @UserEntity() user: any,
  ): Promise<Drug> {
    return (await this.drugsService.updateDrug(
      user.id,
      id,
      input,
    )) as unknown as Drug;
  }

  @Mutation(() => Boolean)
  @Roles(Role.USER, Role.ADMIN)
  async deleteDrug(
    @Args('id') id: string,
    @UserEntity() user: any,
  ): Promise<boolean> {
    return this.drugsService.deleteDrug(user.id, id);
  }

  @Mutation(() => DrugSchedule)
  @Roles(Role.USER, Role.ADMIN)
  async createDrugSchedule(
    @Args('input') input: CreateDrugScheduleInput,
    @UserEntity() user: any,
  ): Promise<DrugSchedule> {
    return (await this.drugsService.createDrugSchedule(
      user.id,
      input,
    )) as unknown as DrugSchedule;
  }

  @Mutation(() => DrugSchedule)
  @Roles(Role.USER, Role.ADMIN)
  async updateDrugSchedule(
    @Args('id') id: string,
    @Args('input') input: UpdateDrugScheduleInput,
    @UserEntity() user: any,
  ): Promise<DrugSchedule> {
    return (await this.drugsService.updateDrugSchedule(
      user.id,
      id,
      input,
    )) as unknown as DrugSchedule;
  }

  @Mutation(() => Boolean)
  @Roles(Role.USER, Role.ADMIN)
  async deleteDrugSchedule(
    @Args('id') id: string,
    @UserEntity() user: any,
  ): Promise<boolean> {
    return this.drugsService.deleteDrugSchedule(user.id, id);
  }

  @Mutation(() => DrugSchedule)
  @Roles(Role.USER, Role.ADMIN)
  async markDrugTaken(
    @UserEntity() user: any,
    @Args('scheduleId') scheduleId: string,
    @Args('takenAt', { nullable: true }) takenAt?: Date,
  ): Promise<DrugSchedule> {
    return (await this.drugsService.markDrugTaken(
      user.id,
      scheduleId,
      takenAt,
    )) as unknown as DrugSchedule;
  }

  @ResolveField('user', () => User)
  async drugUser(@Parent() drug: Drug) {
    return this.prisma.drug.findUnique({ where: { id: drug.id } }).user();
  }

  @ResolveField('schedules', () => [DrugSchedule])
  async resolveSchedules(@Parent() drug: Drug) {
    return this.prisma.drug.findUnique({ where: { id: drug.id } }).schedules();
  }
}

@Resolver(() => DrugSchedule)
@UseGuards(GqlAuthGuard, RolesGuard)
export class DrugScheduleResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField('drug', () => Drug)
  async scheduleDrug(@Parent() schedule: DrugSchedule) {
    return this.prisma.drugSchedule
      .findUnique({ where: { id: schedule.id } })
      .drug();
  }
}
