import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

interface LoginAttempt {
  count: number;
  blockedUntil?: Date;
  lastAttempt: Date;
}

@Injectable()
export class LoginAttemptsService {
  private attempts: Map<string, LoginAttempt> = new Map();
  private readonly MAX_ATTEMPTS = 3;
  private readonly BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

  checkAndRecordAttempt(email: string): void {
    const normalizedEmail = email.toLowerCase();
    const attempt = this.attempts.get(normalizedEmail);
    const now = new Date();

    if (attempt) {
      if (attempt.blockedUntil && attempt.blockedUntil > now) {
        const remainingMinutes = Math.ceil(
          (attempt.blockedUntil.getTime() - now.getTime()) / 60000,
        );
        throw new HttpException(
          `Account temporarily locked. Please try again in ${remainingMinutes} minute(s).`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (attempt.blockedUntil && attempt.blockedUntil <= now) {
        this.attempts.delete(normalizedEmail);
      }
    }
  }

  recordFailedAttempt(email: string): void {
    const normalizedEmail = email.toLowerCase();
    const attempt = this.attempts.get(normalizedEmail);
    const now = new Date();

    if (!attempt) {
      this.attempts.set(normalizedEmail, {
        count: 1,
        lastAttempt: now,
      });
    } else {
      attempt.count += 1;
      attempt.lastAttempt = now;

      if (attempt.count >= this.MAX_ATTEMPTS) {
        attempt.blockedUntil = new Date(now.getTime() + this.BLOCK_DURATION_MS);
        throw new HttpException(
          `Too many failed login attempts. Account locked for 15 minutes.`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      this.attempts.set(normalizedEmail, attempt);
    }
  }

  recordSuccessfulLogin(email: string): void {
    const normalizedEmail = email.toLowerCase();
    this.attempts.delete(normalizedEmail);
  }

  getRemainingAttempts(email: string): number {
    const normalizedEmail = email.toLowerCase();
    const attempt = this.attempts.get(normalizedEmail);

    if (!attempt) {
      return this.MAX_ATTEMPTS;
    }

    const now = new Date();
    if (attempt.blockedUntil && attempt.blockedUntil > now) {
      return 0;
    }

    return Math.max(0, this.MAX_ATTEMPTS - attempt.count);
  }

  clearAttempts(email: string): void {
    const normalizedEmail = email.toLowerCase();
    this.attempts.delete(normalizedEmail);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  cleanupExpiredBlocks(): void {
    const now = new Date();
    let cleanedCount = 0;
    for (const [email, attempt] of this.attempts.entries()) {
      if (attempt.blockedUntil && attempt.blockedUntil <= now) {
        this.attempts.delete(email);
        cleanedCount++;
      }
    }
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired login blocks`);
    }
  }
}
