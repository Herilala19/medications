import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { extra, connection } = ctx.getContext();

    if (extra?.user) {
      return true;
    }
    if (connection?.context?.user) {
      return true;
    }

    // For regular queries and mutations, use standard JWT authentication
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, extra, connection } = ctx.getContext();

    // For subscriptions with graphql-ws
    if (extra?.user) {
      return { user: extra.user };
    }

    // For subscriptions with subscriptions-transport-ws (legacy)
    if (connection?.context?.user) {
      return { user: connection.context.user };
    }

    // For regular HTTP requests
    return req;
  }
}
