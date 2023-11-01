import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      // Auth: {
      //   initialRouteName: "index" as any,
      //   screens: {
      //     Index: "index",
      //     SignUp: "signup",
      //     ForgotPassword: "forgotpassword",
      //     ResetPassword: { path: "resetpassword/:otp" },
      //   },
      // },
      Root: {
        initialRouteName: "index" as any,
        screens: {
          HomeRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              HomeDetailScreen: { path: "home/:itemID" },
            },
          },
          InventoryRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              CategoryDetailScreen: { path: "categorydetail/:categoryID" },
              ItemDetailScreen: { path: "itemdetail/:itemID" },
            },
          },
          NewTransactionRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              AddTransactionItems: "addtransactionitems",
              SelectItem: "selectitem",
              SelectCategory: "selectcategory",
              Checkout: "checkout",
            },
          },
          SalesRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              TransactionDetailScreen: {
                path: "transactiondetail/:transactionID",
              },
            },
          },
          TransactionsRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              IncomingTransactionDetailScreen: {
                path: "transactiondetail/:transactionID",
              },
              SalesTransactionDetailScreen: {
                path: "transactiondetail/:transactionID",
              },

            },
          },
          InsightsRoot: {
            initialRouteName: "index" as any,
            screens: {
              Index: "index",
              InsightsDetailScreen: {
                path: "insights/:insightsID",
              },
            },
          },
          AccountRoot: {
            initialRouteName: "account" as any,
            screens: {
              Account: "account",
              Settings: "settings",
              Profile: "profile",
            },
          },
        },
      },
      Notifications: {
        initialRouteName: "index" as any,
        screens: {
          Index: "index",
          NotificationDetailScreen: {
            path: "notificationdetail/:notificationID",
          },
        },
      },
      Profile: "profile",
      Settings: "settings",
      SignIn: "signin",
      ForgotPassword: { path: "forgotpassword/:phone" },
      ResetPassword: { path: "resetpassword/:otp" },

      NotFound: "*",
    },
  },
};

export default linking;
