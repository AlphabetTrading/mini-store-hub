import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./src/routes";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./src/graphql/apolloClient";
import { AuthContextProvider } from "./src/contexts/auth";
const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    InterThin: require("./assets/fonts/Inter-Thin.ttf"),
    InterExtraLight: require("./assets/fonts/Inter-ExtraLight.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    InterBlack: require("./assets/fonts/Inter-Black.ttf"),
    ...FontAwesome.font,
  });
  const client = apolloClient("");

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
