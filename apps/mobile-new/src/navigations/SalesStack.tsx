import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CustomMaterialMenu from "../components/CustomMenu";
import { useAppTheme } from "../contexts/preference";
import SalesScreen from "../screens/SalesScreen";
import TransactionDetailScreen from "../screens/SalesScreen/TransactionDetailScreen";
import { SalesParamList } from "../types";
import { Text } from "react-native-paper";
import NotificationIconComp from "../components/NotificationIconComp";

const SalesStackNavigator = createNativeStackNavigator<SalesParamList>();

export const SalesStack = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  return (
    <SalesStackNavigator.Navigator initialRouteName="Index">
      <SalesStackNavigator.Screen
        name="Index"
        component={SalesScreen}
        options={{
          title: "Sales Transactions",
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
      <SalesStackNavigator.Screen
        name="TransactionDetailScreen"
        component={TransactionDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        })}
      />
    </SalesStackNavigator.Navigator>
  );
};
