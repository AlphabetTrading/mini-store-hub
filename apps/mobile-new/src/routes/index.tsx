import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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

type Props = {};

const Navigation = (props: Props) => {
  const Stack = createNativeStackNavigator();
  const { authState } = useAuth();
  const isLoggedIn = authState?.user ? true : false;
  const client = apolloClient(authState?.accessToken);

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
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
                options={{ title: "New Transaction" }}
              />
              <Stack.Screen
                name="SelectCategory"
                component={SelectCategoryScreen}
                options={{ title: "Select Category" }}
              />
              <Stack.Screen
                name="SelectItem"
                component={SelectItemScreen}
                options={{ title: "Select Items" }}
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
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
