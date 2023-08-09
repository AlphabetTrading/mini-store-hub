import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AuthStack from "./AuthStack";
import NotificationScreen from "../screens/NotificationScreen";
import Colors from "../constants/Colors";
import { useAuth } from "../contexts/auth";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNotifications } from "../hooks/useNotifications";
import Loading from "../components/Loading";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "../types";
import AppStack from "./AppStack";

type Props = {};
const Navigation = (props: Props) => {
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

  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const { authState } = useAuth();
  console.log(authState, " is auth state");
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
            component={NotificationScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.light.tint,
              },
              headerTintColor: "#FFF",
            }}
          />
          <RootStack.Screen
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
