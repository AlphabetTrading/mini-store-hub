/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  SignIn: undefined;
  NewTransaction: undefined;
  Notifications: { conversationID: number; recipientName: string };
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Index: undefined;
  InventoryRoot: NavigatorScreenParams<InventoryTabParamList> | undefined;
  NewTransactionRoot:
    | NavigatorScreenParams<NewTransactionParamList>
    | undefined;
  SalesRoot: NavigatorScreenParams<SalesParamList> | undefined;
  Insights: undefined;
  Account: NavigatorScreenParams<AccountTabParamList> | undefined;
};
export type InventoryTabParamList = {
  Index: undefined;
  CategoryDetailScreen: { categoryID: number };
  ItemDetailScreen: { itemID: number };
};

export type NewTransactionParamList = {
  Index: undefined;
  SelectItem: undefined;
  SelectCategory: undefined;
  Checkout: undefined;
};

export type SalesParamList = {
  Index: undefined;
  TransactionDetailScreen: { transactionID: number };
};

export type AccountTabParamList = {
  Account: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
