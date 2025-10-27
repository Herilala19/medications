import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    let requestInfo: { method?: string; url?: string; operationName?: string } =
      {};

    if (req) {
      requestInfo = {
        method: req.method,
        url: req.url,
      };
    } else {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      if (info) {
        requestInfo = {
          operationName: info.fieldName,
        };
      }
    }

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        const contextType = context.getType<string>();

        if (contextType === 'http') {
          this.logger.log(
            `${requestInfo.method} ${requestInfo.url} - ${elapsed}ms`,
            'HTTP',
          );
        } else if (contextType === 'graphql' || !req) {
          this.logger.log(
            `GraphQL ${
              requestInfo.operationName || 'operation'
            } - ${elapsed}ms`,
            'GraphQL',
          );
        }
      }),
    );
  }
}
