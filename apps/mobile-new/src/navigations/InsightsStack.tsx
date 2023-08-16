import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CustomMaterialMenu from "../components/CustomMenu";
import { useAppTheme } from "../contexts/preference";
import InsightsScreen from "../screens/InsightsScreen";
import InsightsDetailScreen from "../screens/InsightsScreen/InsightsDetail";
import { InsightsTabParamList } from "../types/types";
import { Text } from "react-native-paper";
import NotificationIconComp from "../components/NotificationIconComp";
import { useLocalization } from "../contexts/localization";

const InsightsStackNavigator =
  createNativeStackNavigator<InsightsTabParamList>();

export const InsightsStack = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  return (
    <InsightsStackNavigator.Navigator initialRouteName="Index">
      <InsightsStackNavigator.Screen
        name="Index"
        component={InsightsScreen}
        options={{
          title: t("insights"),
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
      <InsightsStackNavigator.Screen
        name="InsightsDetailScreen"
        component={InsightsDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.categoryName,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        })}
      />
    </InsightsStackNavigator.Navigator>
  );
};

export default InsightsStack;
