import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import jwtDecode from "jwt-decode";

export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "https://mini-store-hub-api.onrender.com/graphql";
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

export const apolloClient = (authState: any, setAuthState: any) => {
  // setContext to add authorization header to every request

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers }: any) => {
      const { exp } = jwtDecode(authState.accessToken) as any;
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        const { accessToken, refreshToken } = await getRefresh(
          authState.refreshToken
        );
        setAuthState({
          ...authState,
          accessToken,
          refreshToken,
        });
      }

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${authState?.accessToken}`,
        },
      };
    });

    return forward(operation);
  });

  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: BASE_URL,
    headers: {
      Authorization: `Bearer ${authState?.accessToken}`,
    },
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, link]),
    cache,
  });

  return client;
};

// refresh token from graphql server
const getRefresh = async (refreshToken: string) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          refreshToken(refreshToken: "${refreshToken}") {
            accessToken
            refreshToken
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.refreshToken;
};

export const apolloClientWithNoToken = () => {
  const link = new HttpLink({
    uri: BASE_URL,
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: ApolloLink.from([retryLink, link]),
    cache,
  });

  return client;
};
