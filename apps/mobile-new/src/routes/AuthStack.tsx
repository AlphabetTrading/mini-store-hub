import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/AuthScreen";
import ForgotPasswordScreen from "../screens/AuthScreen/forgotPassword";
import ResetPasswordScreen from "../screens/AuthScreen/resetPassword";
import { AuthTabParamList } from "../types/types";

type Props = {};

const AuthStack = (props: Props) => {
  const Stack = createNativeStackNavigator<AuthTabParamList>();
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
