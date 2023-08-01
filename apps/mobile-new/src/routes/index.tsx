import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AuthScreen from "../screens/AuthScreen";
import AppStack from "./AppStack";
import CategoryDetailScreen from "../screens/InventoryScreen/CategoryDetailScreen";
import ItemDetailScreen from "../screens/InventoryScreen/ItemDetailScreen";
import CheckoutScreen from "../screens/NewTransactionScreen/CheckoutScreen";
import AuthStack from "./AuthStack";
import SelectItemScreen from "../screens/NewTransactionScreen/SelectItemScreen";
import SelectCategoryScreen from "../screens/NewTransactionScreen/SelectCategoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Colors from "../constants/Colors";
import { ApolloProvider } from "@apollo/client";
import { useAuth } from "../contexts/auth";
import { apolloClient } from "../graphql/apolloClient";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNotifications } from "../hooks/useNotifications";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
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

  const Stack = createNativeStackNavigator();
  const { authState } = useAuth();
  const isLoggedIn = authState?.user ? true : false;
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={AppStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
          <Stack.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
            options={({ route }: any) => ({
              title: route?.params?.name,
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            })}
            // options={{ title: "Biscuit" }}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetailScreen}
            options={({ route }: any) => ({
              title: route?.params?.name,
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            })}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{
              title: "New Transaction",
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
          <Stack.Screen
            name="SelectCategory"
            component={SelectCategoryScreen}
            options={{
              title: "Select Category",
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
          <Stack.Screen
            name="SelectItem"
            component={SelectItemScreen}
            options={{
              title: "Select Items",
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({});
