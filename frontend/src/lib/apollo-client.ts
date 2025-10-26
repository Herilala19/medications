import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const isServer = typeof window === "undefined";

// Create HTTP link
const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8081/graphql",
});

// Create auth link
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create error link for token refresh
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        // Handle 401 Unauthorized errors
        if (
          extensions?.code === "UNAUTHENTICATED" ||
          message.includes("Unauthorized")
        ) {
          // Attempt to refresh token
          const refreshToken =
            typeof window !== "undefined"
              ? localStorage.getItem("refresh-token")
              : null;

          if (refreshToken) {
            // Call refresh token mutation
            fetch(
              process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
                "http://localhost:8081/graphql",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query: `
								mutation RefreshToken($token: JWT!) {
									refreshToken(token: $token) {
										accessToken
										refreshToken
									}
								}
							`,
                  variables: { token: refreshToken },
                }),
              },
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.data?.refreshToken) {
                  const { accessToken, refreshToken: newRefreshToken } =
                    data.data.refreshToken;
                  localStorage.setItem("auth-token", accessToken);
                  localStorage.setItem("refresh-token", newRefreshToken);

                  // Update the operation's headers with the new token
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${accessToken}`,
                    },
                  });

                  // Retry the original operation with new token
                  return forward(operation);
                } else {
                  // Refresh failed, redirect to login
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("refresh-token");
                  window.location.href = "/signin";
                }
              })
              .catch(() => {
                // Refresh failed, redirect to login
                localStorage.removeItem("auth-token");
                localStorage.removeItem("refresh-token");
                window.location.href = "/signin";
              });
          } else {
            // No refresh token, redirect to login
            localStorage.removeItem("auth-token");
            window.location.href = "/signin";
          }
        }
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  },
);

// Create WebSocket link for subscriptions (client-side only)
const wsLink = !isServer
  ? new GraphQLWsLink(
      createClient({
        url:
          process.env.NEXT_PUBLIC_WS_ENDPOINT || "ws://localhost:8081/graphql",
        connectionParams: () => {
          try {
            if (
              typeof window === "undefined" ||
              typeof localStorage === "undefined"
            ) {
              console.log("WebSocket connectionParams: not in browser context");
              return {};
            }
            const token = localStorage.getItem("auth-token");
            console.log("WebSocket connectionParams: token exists:", !!token);
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          } catch (error) {
            console.error("Error getting connectionParams:", error);
            return {};
          }
        },
        on: {
          connected: (socket) => {
            console.log("WebSocket connected:", socket);
          },
          error: (error) => {
            console.error("WebSocket error:", error);
          },
          closed: (event) => {
            console.log("WebSocket closed:", event);
          },
        },
        retryAttempts: 5,
        shouldRetry: () => true,
        lazy: true,
      }),
    )
  : null;

// Split link between HTTP and WebSocket
const splitLink =
  !isServer && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        from([errorLink, authLink, httpLink]),
      )
    : from([errorLink, authLink, httpLink]);

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add any field policies here if needed
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export default apolloClient;
