import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../BaseLayout";
import { GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP } from "../../../graphql/queries/salesQueries";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../../contexts/auth";
import { useAppTheme } from "../../../contexts/preference";
import { useLocalization } from "../../../contexts/localization";
import { ActivityIndicator } from "react-native-paper";
import SingleSalesTransactionItem from "./SingleSalesTransactionItem";

type Props = {};

const SalesTransactions = (props: Props) => {
  const { authState } = useAuth();
  const { theme } = useAppTheme();
  const { loading, data, error, refetch } = useQuery(
    GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP,
    {
      variables: {
        retailShopId: authState?.user.retailShop[0].id,
        orderBy: {
          createdAt: "desc",
        },
      },
    }
  );

  const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: theme.colors.background,
    },
  });
  const { t } = useLocalization();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  return (
    <View
      style={{
        marginBottom: 50,
        flex: 1
      }}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={theme.colors.tint} />
        </View>
      ) : (
        data?.saleTransactionsByRetailShop && (
          <View
            style={{
              backgroundColor: theme.colors.background,
              width: "100%",
            }}
          >
            <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={data.saleTransactionsByRetailShop.items}
              ListHeaderComponent={
                <Text
                  style={{
                    marginLeft: 8,
                    color: theme.colors.text,
                    textTransform: "uppercase",
                  }}
                >
                  {t("sales")}
                </Text>
              }
              renderItem={({ item }) => <SingleSalesTransactionItem item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )
      )}
    </View>
  );
};

export default SalesTransactions;
