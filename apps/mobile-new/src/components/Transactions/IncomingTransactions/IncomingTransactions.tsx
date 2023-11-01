import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../BaseLayout";
import { GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP, GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP } from "../../../graphql/queries/salesQueries";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../../contexts/auth";
import { useAppTheme } from "../../../contexts/preference";
import { useLocalization } from "../../../contexts/localization";
import SingleTransactionItem from "../../Sales/SingleTransactionItem";
import { ActivityIndicator } from "react-native-paper";
import SingleIncomingItems from "./SingleIncomingItems";

type Props = {};

const IncomingTransactionsScreen = (props: Props) => {
  const { authState } = useAuth();
  const { theme } = useAppTheme();
  const { loading, data, error, refetch } = useQuery(
    GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP,
    {
      variables: {
        orderBy: {
          createdAt: "desc",
        },
        filterGoodsTransferInput: {
          retailShop: {
            id: authState?.user.retailShop[0].id
          },
          transferType: "WarehouseToRetailShop"
        },
      },
    }
  );
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center", }}
        >
          <ActivityIndicator size="small" color={theme.colors.tint} />
        </View>
      ) : (
        data?.goodsTransfers && (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data.goodsTransfers.items.filter((item: any) => item.goods.length > 0)}
            renderItem={({ item }) => <SingleIncomingItems item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text
                style={{
                  marginLeft: 8,
                  color: theme.colors.text,
                  textTransform: "uppercase",
                }}
              >
                {t("transactions")}
              </Text>
            }
          />
        )
      )}
    </View>
  );
};

export default IncomingTransactionsScreen;
