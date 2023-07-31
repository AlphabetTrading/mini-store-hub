import { useAuth } from "@/context/auth";
import { apolloClient } from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export function AppWrapper(props: React.PropsWithChildren<{}>) {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  const client = apolloClient(authState?.accessToken);
  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="notification" />
        </Stack>
      </ApolloProvider>
    </ThemeProvider>
  );
}
