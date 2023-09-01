import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppTheme } from "../contexts/preference";
import InsightsScreen from "../screens/InsightsScreen";
import InsightsDetailScreen from "../screens/InsightsScreen/InsightsDetail";
import { InsightsTabParamList } from "../types/types";
import { useLocalization } from "../contexts/localization";
import AppbarRightAction from "../components/AppbarRightAction";

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
          headerRight: () => <AppbarRightAction />,
        }}
      />
      <InsightsStackNavigator.Screen
        name="InsightsDetailScreen"
        component={InsightsDetailScreen}
        options={({ route }: any) => ({
          title: t("insightsDetail"),
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
