import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private context?: string;
  private logLevels: LogLevel[];

  constructor(private configService: ConfigService) {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    this.logLevels = this.getLogLevels(nodeEnv);
  }

  setContext(context: string) {
    this.context = context;
  }

  private getLogLevels(env: string): LogLevel[] {
    if (env === 'production') {
      return ['log', 'warn', 'error'];
    }
    return ['error', 'warn', 'log', 'debug', 'verbose'];
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels.includes(level);
  }

  private formatMessage(level: string, message: any, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    const pid = process.pid;

    return `[Nest] ${pid}  - ${timestamp}     ${level
      .toUpperCase()
      .padEnd(7)} [${ctx}] ${
      typeof message === 'object' ? JSON.stringify(message) : message
    }`;
  }

  log(message: any, context?: string) {
    if (this.shouldLog('log')) {
      console.log(this.formatMessage('log', message, context));
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context));
      if (trace) {
        console.error(trace);
      }
    }
  }

  warn(message: any, context?: string) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  debug(message: any, context?: string) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  verbose(message: any, context?: string) {
    if (this.shouldLog('verbose')) {
      console.log(this.formatMessage('verbose', message, context));
    }
  }
}
