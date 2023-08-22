import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CustomMaterialMenu from "../components/CustomMenu";
import { useAppTheme } from "../contexts/preference";
import InventoryScreen from "../screens/InventoryScreen";
import CategoryDetailScreen from "../screens/InventoryScreen/CategoryDetailScreen";
import ItemDetailScreen from "../screens/InventoryScreen/ItemDetailScreen";
import { InventoryTabParamList } from "../types/types";
import { Text } from "react-native-paper";
import NotificationIconComp from "../components/NotificationIconComp";
import { useLocalization } from "../contexts/localization";
import AppbarRightAction from "../components/AppbarRightAction";

const InventoryStackNavigator =
  createNativeStackNavigator<InventoryTabParamList>();

export const InventoryStack = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  const { t, locale } = useLocalization();
  return (
    <InventoryStackNavigator.Navigator initialRouteName="Index">
      <InventoryStackNavigator.Screen
        name="Index"
        component={InventoryScreen}
        options={{
          title: locale.includes("en")
            ? "Inventory"
            : t("categories") + " " + t("inventory"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
          headerRight: () => <AppbarRightAction />,
        }}
      />
      <InventoryStackNavigator.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.categoryName,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        })}
      />
      <InventoryStackNavigator.Screen
        name="ItemDetailScreen"
        component={ItemDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.itemName,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        })}
      />
    </InventoryStackNavigator.Navigator>
  );
};
