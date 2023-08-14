import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CustomMaterialMenu from "../components/CustomMenu";
import { useAppTheme } from "../contexts/preference";
import InventoryScreen from "../screens/InventoryScreen";
import CategoryDetailScreen from "../screens/InventoryScreen/CategoryDetailScreen";
import ItemDetailScreen from "../screens/InventoryScreen/ItemDetailScreen";
import { InventoryTabParamList } from "../types";
import { Text } from "react-native-paper";
import NotificationIconComp from "../components/NotificationIconComp";

const InventoryStackNavigator =
  createNativeStackNavigator<InventoryTabParamList>();

export const InventoryStack = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  return (
    <InventoryStackNavigator.Navigator initialRouteName="Index">
      <InventoryStackNavigator.Screen
        name="Index"
        component={InventoryScreen}
        options={{
          title: "Inventory",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <NotificationIconComp />
              <CustomMaterialMenu />
            </View>
          ),
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
