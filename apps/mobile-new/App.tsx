import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./src/routes";
import React from "react";
import { AuthContextProvider } from "./src/contexts/auth";
import { LoadingContextProvider } from "./src/contexts/loading";
import { ApolloContextProvider } from "./src/contexts/apollo";
import useCachedResources from "./src/hooks/useCachedResources";
const Tab = createBottomTabNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoadingContextProvider>
        <AuthContextProvider>
          <ApolloContextProvider>
            <Navigation />
          </ApolloContextProvider>
        </AuthContextProvider>
      </LoadingContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
