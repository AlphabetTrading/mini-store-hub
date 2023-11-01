import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppTheme } from "../contexts/preference";
import TransactionDetailScreen from "../screens/SalesScreen/TransactionDetailScreen";
import { SalesParamList, TransactionsParamList } from "../types/types";
import { useLocalization } from "../contexts/localization";
import AppbarRightAction from "../components/AppbarRightAction";
import TransactionsScreen from "../screens/Transactions/Transactions";
import IncomingTransactionsDetailScreen from "../screens/Transactions/IncomingTransactionsDetailScreen";
import SalesTransactionsDetailScreen from "../screens/Transactions/SalesTransactionsDetailScreen";

const TransactionsStackNavigator = createNativeStackNavigator<TransactionsParamList>();

export const TransactionsStack = ({ navigation }: any) => {
    const { theme } = useAppTheme();
    const { t } = useLocalization();
    return (
        <TransactionsStackNavigator.Navigator initialRouteName="Index">
            <TransactionsStackNavigator.Screen
                name="Index"
                component={TransactionsScreen}
                options={{
                    title: t("sales"),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: "#FFF",
                    headerShown: true,
                    headerRight: () => <AppbarRightAction />,
                }}
            />
            <TransactionsStackNavigator.Screen
                name="SalesTransactionDetailScreen"
                component={SalesTransactionsDetailScreen}
                options={({ route }: any) => ({
                    title: t("transactionDetail"),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: "#FFF",
                })}
            />
            <TransactionsStackNavigator.Screen
                name="IncomingTransactionDetailScreen"
                component={IncomingTransactionsDetailScreen}
                options={({ route }: any) => ({
                    title: t("transactionDetail"),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: "#FFF",
                })}
            />
        </TransactionsStackNavigator.Navigator>
    );
};
