import React from "react";
import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./src/routes";
import { AuthContextProvider } from "./src/contexts/auth";
import { LoadingContextProvider } from "./src/contexts/loading";
import { ApolloContextProvider } from "./src/contexts/apollo";
import useCachedResources from "./src/hooks/useCachedResources";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocalizationProvider } from "./src/contexts/localization";
import { PreferenceContextProvider } from "./src/contexts/preference";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PreferenceContextProvider>
        <LoadingContextProvider>
          {/* <ThemeProvider theme={theme}> */}
          <LocalizationProvider>
            <AuthContextProvider>
              <ApolloContextProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <Navigation />
                  </GestureHandlerRootView>
                </SafeAreaView>
              </ApolloContextProvider>
            </AuthContextProvider>
          </LocalizationProvider>
          {/* </ThemeProvider> */}
        </LoadingContextProvider>
      </PreferenceContextProvider>
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
