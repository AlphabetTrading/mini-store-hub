import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
// import jwtDecode from 'jwt-decode'

// const authLink = setContext(async () => {
//   let token = localStorage.getItem('JWT_Token')
//   const { exp } = jwtDecode(token)
//   // Refresh the token a minute early to avoid latency issues
//   const expirationTime = (exp * 1000) - 60000
//   if (Date.now() >= expirationTime) {
//     token = await refreshToken()
//     // set LocalStorage here based on response;
//   }
//   return {
//     // you can set your headers directly here based on the new token/old token
//     headers: {
//       ...
//     }
//   }
// })

const BASE_URL =
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

// const BASE_URL =
//   // process.env.EXPO_PUBLIC_API_URL ??
//   "https://98a9-196-188-34-119.ngrok-free.app/graphql";

export const apolloClient = (token: any) => {
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: retryLink.concat(link),
    cache,
  });

  return client;
};
