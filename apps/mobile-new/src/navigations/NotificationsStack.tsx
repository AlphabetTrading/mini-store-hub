import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import NotificationDetailScreen from "../screens/Notifications/NotificationDetailScreen";
import NotificationScreen from "../screens/Notifications/NotificationScreen";
import { NotificationTabParamList } from "../types/types";

const NotificationStackNavigator =
  createNativeStackNavigator<NotificationTabParamList>();

const NotificationStack = () => {
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  return (
    <NotificationStackNavigator.Navigator initialRouteName="Index">
      <NotificationStackNavigator.Screen
        name="Index"
        component={NotificationScreen}
        options={({ route }: any) => ({
          title: t("notifications"),
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
        })}
      />
      <NotificationStackNavigator.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
        })}
      />
    </NotificationStackNavigator.Navigator>
  );
};

export default NotificationStack;
