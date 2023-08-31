import { ApolloProvider } from "@apollo/client";
import { apolloClient, catchPersistor } from "../graphql/apolloClient";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

export const ApolloContextProvider = (props: Props) => {
  const [cacheReady, setCacheReady] = useState(false);
  const client = apolloClient();

  const initializeCache = useCallback(
    async () => {
      await catchPersistor.restore();
      // Set a flag to indicate that the cache is ready
      setCacheReady(true);
      client.onClearStore(async () => {
        await catchPersistor.purge();
      });
    },
    []
  )

  useEffect(() => {
    // Wait for the cache to be restored
    initializeCache();
  }, [initializeCache]);


  return cacheReady ? <ApolloProvider client={client}>{props.children}</ApolloProvider> : <ActivityIndicator />;
};
