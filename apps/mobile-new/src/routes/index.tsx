import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useAuth } from "../contexts/auth";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNotifications } from "../hooks/useNotifications";
import Loading from "../components/Loading";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "../types/types";
import AppStack from "./AppStack";
import SettingsScreen from "../screens/SettingsScreen";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import { adaptNavigationTheme } from "react-native-paper";
import LoginScreen from "../screens/AuthScreen";
import ForgotPasswordScreen from "../screens/AuthScreen/forgotPassword";
import ResetPasswordScreen from "../screens/AuthScreen/resetPassword";
import NotificationStack from "../navigations/NotificationsStack";

type Props = {};
const Navigation = (props: Props) => {
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<Loading />}
      theme={LightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

function RootNavigator() {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const { authState } = useAuth();
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  return authState !== null ? (
    <RootStack.Navigator initialRouteName={"Root"}>
      <RootStack.Group>
        <RootStack.Screen
          name="Root"
          component={AppStack}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Notifications"
          component={NotificationStack}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}
        />
        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: t("profile"),
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: "#FFF",
          }}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: t("settings"),
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: "#FFF",
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  ) : (
    <RootStack.Navigator initialRouteName={"SignIn"}>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({});
