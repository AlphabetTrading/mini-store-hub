import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "https://mini-store-hub-api.onrender.com/graphql";

// const BASE_URL =
//   process.env.EXPO_PUBLIC_API_URL ??
//   "https://beb2-197-156-86-213.ngrok-free.app/graphql";

console.log(process.env.EXPO_PUBLIC_API_URL, BASE_URL, "apolloClient");
export const apolloClient = (token: any) => {
  console.log(process.env.EXPO_PUBLIC_API_URL, BASE_URL, "apolloClient");
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};
