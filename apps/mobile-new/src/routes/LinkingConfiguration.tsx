import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking: LinkingOptions<any> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        initialRouteName: "index" as any,
        screens: {
          Index: "index",
          InventoryRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              CategoryDetailScreen: { path: "categorydetail/:categoryID" },
              ItemDetailScreen: { path: "itemdetail/:itemID" },
            },
          },
          NewTransaction: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              SelectItem: "selectitem",
              SelectCategory: "selectcategory",
              Checkout: "checkout",
            },
          },
          Sales: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              TransactionDetailScreen: {
                path: "transactiondetail/:transactionID",
              },
            },
          },
          Insights: "insights",
          AccountRoot: {
            initialRouteName: "account" as any,
            screens: {
              Account: "account",
              Settings: "settings",
            },
          },
        },
      },
      Notifications: "notifications",
      Profile: "profile",
      ForgotPassword: "forgotpassword",
      ResetPassword: { path: "resetpassword/:otp" },
      SignIn: "signin",
      NotFound: "*",
    },
  },
};

export default linking;
