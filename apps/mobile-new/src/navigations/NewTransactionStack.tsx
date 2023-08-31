import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { useAppTheme } from "../contexts/preference";
import CheckoutScreen from "../screens/NewTransactionScreen";
import AddTransactionItemsScreen from "../screens/NewTransactionScreen/AddTransactionItemsScreen";
import SelectCategoryScreen from "../screens/NewTransactionScreen/SelectCategoryScreen";
import SelectItemScreen from "../screens/NewTransactionScreen/SelectItemScreen";
import { NewTransactionParamList } from "../types/types";
import { useLocalization } from "../contexts/localization";

const NewTransactionStackNavigator =
  createNativeStackNavigator<NewTransactionParamList>();

export const NewTransactionStack = ({ navigation, route }: any) => {
  const { theme } = useAppTheme();
  const { t, locale } = useLocalization();
  return (
    <NewTransactionStackNavigator.Navigator
      initialRouteName="Index"
      screenOptions={{
        animation: "fade",
        animationDuration: 5000,
      }}
    >
      <NewTransactionStackNavigator.Screen
        name="Index"
        component={CheckoutScreen}
        options={{
          title: t("newTransaction"),
          animation: "fade",
          headerLeft: () => {
            return (
              <View style={{ marginRight: 25 }}>
                <Ionicons
                  onPress={() => navigation.goBack()}
                  name="arrow-back"
                  size={24}
                  color="white"
                />
              </View>
            );
          },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        }}
      // options={{ headerShown: false }}
      />
      <NewTransactionStackNavigator.Screen
        name="AddTransactionItems"
        component={AddTransactionItemsScreen}
        options={{
          title: t("addTransactionItems"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        }}
      />
      <NewTransactionStackNavigator.Screen
        name="SelectItem"
        component={SelectItemScreen}
        options={{
          title: t("selectItems"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        }}
      />
      <NewTransactionStackNavigator.Screen
        name="SelectCategory"
        component={SelectCategoryScreen}
        options={{
          title: t("selectCategory"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        }}
      />
    </NewTransactionStackNavigator.Navigator>
  );
};
