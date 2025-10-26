import { GraphqlConfig } from './common/configs/config.interface';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    return {
      // schema options
      autoSchemaFile: graphqlConfig.schemaDestination || './src/schema.graphql',
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context: any) => {
            try {
              console.log('WebSocket connection attempt (graphql-ws)...');
              const { connectionParams, extra } = context;

              if (
                !connectionParams ||
                Object.keys(connectionParams).length === 0
              ) {
                console.log('No connection params provided');
                if (extra) extra.user = null;
                return true;
              }

              // Extract token from authorization header
              const authorization = connectionParams.authorization || '';
              const token = authorization.replace('Bearer ', '');

              if (token) {
                try {
                  // Verify and decode the JWT token
                  const payload = this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_ACCESS_SECRET'),
                  });
                  if (extra) {
                    extra.user = { id: payload.userId };
                  }
                  console.log(
                    'WebSocket authenticated for user:',
                    payload.userId,
                  );
                  return true;
                } catch (error) {
                  console.error(
                    'WebSocket authentication error:',
                    error.message,
                  );
                  if (extra) extra.user = null;
                  return false;
                }
              } else {
                console.log('WebSocket connection without token');
                if (extra) extra.user = null;
                return true;
              }
            } catch (error) {
              console.error('Error in onConnect:', error);
              return false;
            }
          },
        },
        'subscriptions-transport-ws': {
          onConnect: (connectionParams: any) => {
            // Extract token from authorization header
            const authorization = connectionParams?.authorization || '';
            const token = authorization.replace('Bearer ', '');

            if (token) {
              try {
                // Verify and decode the JWT token
                const payload = this.jwtService.verify(token, {
                  secret: this.configService.get('JWT_ACCESS_SECRET'),
                });
                return { user: { id: payload.userId } };
              } catch (error) {
                console.error('WebSocket authentication error:', error.message);
                return { user: null };
              }
            }
            return { user: null };
          },
        },
      },
      includeStacktraceInErrorResponses: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      context: ({ req, connection, extra }) => {
        // For subscriptions-transport-ws (legacy)
        if (connection) {
          console.log('Context: Using subscriptions-transport-ws');
          return { req: { user: connection.context?.user } };
        }
        // For graphql-ws subscriptions
        if (extra) {
          console.log('Context: Using graphql-ws, user:', extra.user);
          return { extra };
        }
        // For regular HTTP requests
        return { req };
      },
    };
  }
}
