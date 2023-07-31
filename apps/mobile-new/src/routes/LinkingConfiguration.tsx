import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking: LinkingOptions<any> = {
  prefixes: [Linking.createURL("/")],
  //   config: {
  //     screens: {
  //       Root: {
  //         screens: {
  //           Search: "search",
  //           Saved: "saved",
  //           AccountRoot: {
  //             initialRouteName: "account" as any,
  //             screens: {
  //               Account: "account",
  //               Settings: "settings",
  //               Conversations: "conversations",
  //               Messages: { path: "messages/:conversationID/:recipientName" },
  //             },
  //           },
  //         },
  //       },
  //       FindLocations: "findlocations",
  //       ForgotPassword: "forgotpassword",
  //       MessageProperty: { path: "messageproperty/:propertyID" },
  //       PropertyDetails: "propertydetails",
  //       ResetPassword: { path: "resetpassword/:token" },
  //       SignIn: "signin",
  //       SignUp: "signup",
  //     },
  //   },
};

export default linking;
