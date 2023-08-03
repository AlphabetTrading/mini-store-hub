import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AppStack from "./AppStack";
import CategoryDetailScreen from "../screens/InventoryScreen/CategoryDetailScreen";
import ItemDetailScreen from "../screens/InventoryScreen/ItemDetailScreen";
import CheckoutScreen from "../screens/NewTransactionScreen/CheckoutScreen";
import AuthStack from "./AuthStack";
import SelectItemScreen from "../screens/NewTransactionScreen/SelectItemScreen";
import SelectCategoryScreen from "../screens/NewTransactionScreen/SelectCategoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Colors from "../constants/Colors";
import { useAuth } from "../contexts/auth";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNotifications } from "../hooks/useNotifications";
import Loading from "../components/Loading";
import ProfileScreen from "../screens/ProfileScreen";
import {
  InventoryTabParamList,
  NewTransactionParamList,
  RootStackParamList,
  SalesParamList,
} from "../types";
import InventoryScreen from "../screens/InventoryScreen";
import NewTransactionScreen from "../screens/NewTransactionScreen";
import TransactionDetailScreen from "../screens/SalesScreen/TransactionDetail";
import SalesScreen from "../screens/SalesScreen";
import { useLoading } from "../contexts/loading";

type Props = {};

const Navigation = (props: Props) => {
  // const { loading } = useLoading();

  // if (loading) return <Loading />;
  return (
    <NavigationContainer linking={LinkingConfiguration} fallback={<Loading />}>
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

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { authState } = useAuth();
  const isLoggedIn = authState?.user ? true : false;
  return (
    <Stack.Navigator initialRouteName="Root">
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Root"
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
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="SignIn"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

const InventoryStackNavigator =
  createNativeStackNavigator<InventoryTabParamList>();

export const InventoryStack = () => (
  <InventoryStackNavigator.Navigator initialRouteName="Index">
    <InventoryStackNavigator.Screen
      name="Index"
      component={InventoryScreen}
      options={{ headerShown: false }}
    />
    <InventoryStackNavigator.Screen
      name="CategoryDetailScreen"
      component={CategoryDetailScreen}
      options={({ route }: any) => ({
        title: route?.params?.name,
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: "#FFF",
      })}
    />
    <InventoryStackNavigator.Screen
      name="ItemDetailScreen"
      component={ItemDetailScreen}
      options={({ route }: any) => ({
        title: route?.params?.name,
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: "#FFF",
      })}
    />
  </InventoryStackNavigator.Navigator>
);

const SalesStackNavigator = createNativeStackNavigator<SalesParamList>();

export const SalesStack = () => (
  <SalesStackNavigator.Navigator initialRouteName="Index">
    <SalesStackNavigator.Screen
      name="Index"
      component={SalesScreen}
      options={{ headerShown: false }}
    />
    <SalesStackNavigator.Screen
      name="TransactionDetailScreen"
      component={TransactionDetailScreen}
      options={({ route }: any) => ({
        title: route?.params?.name,
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: "#FFF",
      })}
    />
  </SalesStackNavigator.Navigator>
);

const NewTransactionStackNavigator =
  createNativeStackNavigator<NewTransactionParamList>();

export const NewTransactionStack = ({ navigation, route }: any) => {
  return (
    <NewTransactionStackNavigator.Navigator initialRouteName="Index">
      <NewTransactionStackNavigator.Screen
        name="Index"
        component={NewTransactionScreen}
        options={{
          title: "Add New Transaction",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
        // options={{ headerShown: false }}
      />
      <NewTransactionStackNavigator.Screen
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
      <NewTransactionStackNavigator.Screen
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
      <NewTransactionStackNavigator.Screen
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
    </NewTransactionStackNavigator.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
