import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppTheme } from "../contexts/preference";
import HomeScreen from "../screens/HomeScreen";
import { HomeTabParamList } from "../types/types";
import { useLocalization } from "../contexts/localization";
import AppbarRightAction from "../components/AppbarRightAction";
import GreetingsComponent from "../components/HomePage/GreetingsComponent";
import ItemDetailScreen from "../screens/InventoryScreen/ItemDetailScreen";

const HomeStackNavigator = createNativeStackNavigator<HomeTabParamList>();

export const HomeStack = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  return (
    <HomeStackNavigator.Navigator initialRouteName="Index">
      <HomeStackNavigator.Screen
        name="Index"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
          headerShown: true,
          headerTitle(props) {
            return <GreetingsComponent />;
          },
          headerRight: () => <AppbarRightAction />,
        }}
      />
      <HomeStackNavigator.Screen
        name="HomeDetailScreen"
        component={ItemDetailScreen}
        options={({ route }: any) => ({
          title: route?.params?.itemName,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#FFF",
        })}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;
