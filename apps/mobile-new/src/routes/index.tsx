import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AuthStack from "./AuthStack";
import { useAuth } from "../contexts/auth";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNotifications } from "../hooks/useNotifications";
import Loading from "../components/Loading";
import ProfileScreen from "../screens/ProfileScreen";
import { NotificationTabParamList, RootStackParamList } from "../types/types";
import AppStack from "./AppStack";
import NotificationDetailScreen from "../screens/Notifications/NotificationDetailScreen";
import NotificationScreen from "../screens/Notifications/NotificationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import { adaptNavigationTheme } from "react-native-paper";

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
  return (
    <RootStack.Navigator initialRouteName={"Root"}>
      {authState !== null ? (
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
      ) : (
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
}

const NotificationStackNavigator =
  createNativeStackNavigator<NotificationTabParamList>();

export const NotificationStack = () => {
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  return (
    <NotificationStackNavigator.Navigator initialRouteName="Index">
      <NotificationStackNavigator.Screen
        name="Index"
        component={NotificationScreen}
        options={({ route }: any) => ({
          title: t("notifications"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
        })}
      />
      <NotificationStackNavigator.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
        })}
      />
    </NotificationStackNavigator.Navigator>
  );
};

// const InventoryStackNavigator =
//   createNativeStackNavigator<InventoryTabParamList>();

// export const InventoryStack = () => (
//   <InventoryStackNavigator.Navigator initialRouteName="Index">
//     <InventoryStackNavigator.Screen
//       name="Index"
//       component={InventoryScreen}
//       options={{ headerShown: false }}
//     />
//     <InventoryStackNavigator.Screen
//       name="CategoryDetailScreen"
//       component={CategoryDetailScreen}
//       options={({ route }: any) => ({
//         title: route?.params?.name,
//         headerStyle: {
//           backgroundColor: Colors.light.tint,
//         },
//         headerTintColor: "#FFF",
//       })}
//     />
//     <InventoryStackNavigator.Screen
//       name="ItemDetailScreen"
//       component={ItemDetailScreen}
//       options={({ route }: any) => ({
//         title: route?.params?.name,
//         headerStyle: {
//           backgroundColor: Colors.light.tint,
//         },
//         headerTintColor: "#FFF",
//       })}
//     />
//   </InventoryStackNavigator.Navigator>
// );

// const SalesStackNavigator = createNativeStackNavigator<SalesParamList>();

// export const SalesStack = () => (
//   <>
//     {/* <SalesStackNavigator.Screen
//       name="Index"
//       component={SalesScreen}
//       options={{ headerShown: false }}
//     />
//     <SalesStackNavigator.Screen
//       name="TransactionDetailScreen"
//       component={TransactionDetailScreen}
//       options={({ route }: any) => ({
//         title: route?.params?.name,
//         headerStyle: {
//           backgroundColor: Colors.light.tint,
//         },
//         headerTintColor: "#FFF",
//       })}
//     /> */}
//   </>
// );

// const NewTransactionStackNavigator =
//   createNativeStackNavigator<NewTransactionParamList>();

// export const NewTransactionStack = ({ navigation, route }: any) => {
//   return (
//     <NewTransactionStackNavigator.Navigator
//       initialRouteName="Index"
//       screenOptions={{
//         animation: "fade",
//         animationDuration: 5000,
//       }}
//     >
//       <NewTransactionStackNavigator.Screen
//         name="Index"
//         component={CheckoutScreen}
//         options={{
//           title: "Add New Transaction",
//           animation: "fade",
//           headerLeft: () => {
//             return (
//               <View style={{ marginRight: 25 }}>
//                 <Ionicons
//                   onPress={() => navigation.goBack()}
//                   name="arrow-back"
//                   size={24}
//                   color="white"
//                 />
//               </View>
//             );
//           },
//           headerStyle: {
//             backgroundColor: Colors.light.tint,
//           },
//           headerTintColor: "#FFF",
//         }}
//         // options={{ headerShown: false }}
//       />
//       <NewTransactionStackNavigator.Screen
//         name="SelectItem"
//         component={SelectItemScreen}
//         options={{
//           title: "Select Items",
//           headerStyle: {
//             backgroundColor: Colors.light.tint,
//           },
//           headerTintColor: "#FFF",
//         }}
//       />
//       <NewTransactionStackNavigator.Screen
//         name="SelectCategory"
//         component={SelectCategoryScreen}
//         options={{
//           title: "Select Category",
//           headerStyle: {
//             backgroundColor: Colors.light.tint,
//           },
//           headerTintColor: "#FFF",
//         }}
//       />
//     </NewTransactionStackNavigator.Navigator>
//   );
// };

export default Navigation;

const styles = StyleSheet.create({});
