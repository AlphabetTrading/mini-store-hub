import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "https://mini-store-hub-api.onrender.com/graphql/";

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

export const getTokensFromStorage = async (): Promise<any> => {
  const localState = await SecureStore.getItemAsync("login");
  if (localState) {
    return JSON.parse(localState);
  } else {
    return null;
  }
};

export const apolloClient = () => {
  // setContext to add authorization header to every request

  // const authLink = new ApolloLink((operation, forward) => {
  //   operation.setContext(async ({ headers }: any) => {
  //     const { exp } = jwtDecode(authState.accessToken) as any;
  //     const expirationTime = exp * 1000 - 60000;

  //     if (Date.now() >= expirationTime) {
  //       const { accessToken, refreshToken } = await getRefresh(
  //         authState.refreshToken
  //       );
  //       setAuthState({
  //         ...authState,
  //         accessToken,
  //         refreshToken,
  //       });
  //     }

  //     const ops = authState
  //       ? {
  //           headers: {
  //             ...headers,
  //             authorization: authState.accessToken
  //               ? `Bearer  ${authState?.accessToken}`
  //               : null,
  //           },
  //         }
  //       : { headers };

  //     console.log(ops);
  //     return ops;
  //   });

  //   return forward(operation);
  // });

  const authLink = setContext(async (req, { headers }) => {
    const localState = await getTokensFromStorage();

    if (!localState) {
      return { headers };
    }
    const token = localState?.accessToken;

    const { exp } = jwtDecode(token) as any;
    const expirationTime = exp * 1000 - 60000;

    if (Date.now() >= expirationTime) {
      const { accessToken, refreshToken } = await getRefresh(
        localState?.refreshToken
      );
      setAuthState({
        ...localState,
        accessToken,
        refreshToken,
      });

      return accessToken
        ? {
            headers: {
              ...headers,
              authorization: accessToken ? `Bearer ${accessToken}` : null,
            },
          }
        : { headers };
    } else {
      // return the headers to the context so httpLink can read them
      return token
        ? {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : null,
            },
          }
        : { headers };
    }
  });

  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: BASE_URL,
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: ApolloLink.from([retryLink, authLink, link]),
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
function setAuthState(arg0: any) {
  throw new Error("Function not implemented.");
}
