import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const BASE_URL = "https://mini-store-hub-api.onrender.com/graphql/";

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
    link,
    cache,
  });

  return client;
};
