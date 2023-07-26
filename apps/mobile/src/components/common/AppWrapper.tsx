import { apolloClient } from "@/graphql/apolloClient";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack, useSegments, router } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

function useCurrentTheme() {}

function useProtectedRoute(user: any) {
  console.log("In Protected Route", user);
  React.useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [user]);
}
export function AppWrapper() {
  const [user, setUser] = useState(null);
  console.log("Appwrapper");
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const fetchSession = async () => {
    const session = await AsyncStorage.getItem("login");
    const sessionObj = JSON.parse(session ? session : "");
    setUser(sessionObj ? sessionObj : null);
    useProtectedRoute(sessionObj);
  };

  React.useEffect(() => {
    if (!user) {
      fetchSession();
    }
    console.log(user, "Here");
  }, []);

  const colorScheme = useColorScheme();
  useEffect(() => {
    setClient(user ? apolloClient(user) : null);
  }, [user]);

  if (!client) {
    return <Slot />;
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="notification" />
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}
