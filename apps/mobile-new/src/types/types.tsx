

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Notifications: NavigatorScreenParams<NotificationTabParamList> | undefined;
  Profile: undefined;
  Settings: undefined;
  SignIn: undefined;
  ForgotPassword: { phone: string };
  ResetPassword: { token: string; phone: string };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AuthTabParamList = {
  SignIn: undefined;
  ForgotPassword: { phone: string };
  ResetPassword: { token: string; phone: string };
};

export type RootTabParamList = {
  HomeRoot: NavigatorScreenParams<HomeTabParamList> | undefined;
  InventoryRoot: NavigatorScreenParams<InventoryTabParamList> | undefined;
  NewTransactionRoot:
  | NavigatorScreenParams<NewTransactionParamList>
  | undefined;
  SalesRoot: NavigatorScreenParams<SalesParamList> | undefined;
  InsightsRoot: NavigatorScreenParams<InsightsTabParamList> | undefined;
  AccountRoot: NavigatorScreenParams<AccountTabParamList> | undefined;
};
export type InventoryTabParamList = {
  Index: undefined;
  CategoryDetailScreen: { categoryID: string; categoryName: string };
  ItemDetailScreen: { itemID: string; itemName: string };
};

export type InsightsTabParamList = {
  Index: undefined;
  InsightsDetailScreen: { insightsID: INSIGHTS_TYPE };
};

export type HomeTabParamList = {
  Index: undefined;
  HomeDetailScreen: { itemID: string; itemName: string };
};

export type NotificationTabParamList = {
  Index: undefined;
  NotificationDetailScreen: { notificationID: string };
};

export type NewTransactionParamList = {
  Index: undefined;
  AddTransactionItems: undefined;
  SelectItem: { categoryID: string };
  SelectCategory: undefined;
};

export type SalesParamList = {
  Index: undefined;
  TransactionDetailScreen: { transactionID: string; totalPrice: number };
};

export type AccountTabParamList = {
  Account: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export const enum INSIGHTS_TYPE {
  MOST_SOLD_ITEMS = "MOST_SOLD_ITEMS",
  MOST_REVENUE_BY_ITEM = "MOST_REVENUE_BY_ITEM",
}
