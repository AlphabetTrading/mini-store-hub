import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RETAIL_SHOP_PRODUCT_DETAIL } from "../../graphql/queries/retailShopQuery";
import { useAuth } from "../../contexts/auth";
import { BaseLayout } from "../../components/BaseLayout";
import { useAppTheme } from "../../contexts/preference";
import { PriceHistory } from "../../types/models";
import { useLocalization } from "../../contexts/localization";
import PriceHistoryItem from "../../components/PriceHistory/PriceHistoryItem";
import CustomDivider from "../../components/CustomDivider";
import { ActivityIndicator } from "react-native-paper";



const ItemDetailScreen = ({ route }: any) => {
  const { itemID } = route.params;
  const { authState } = useAuth();
  const { theme } = useAppTheme();
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);


  const { loading, data, error, refetch } = useQuery(
    GET_RETAIL_SHOP_PRODUCT_DETAIL,
    {
      variables: {
        productId: itemID,
        retailShopId: authState?.user.retailShop[0].id,
      },

      onCompleted: (data) => {
        setPriceHistory(
          data.retailShopStockByProductIdAndByRetailShopId.product.priceHistory
        );
      },
    }
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.colors.background,
      gap: 5,
    },
  });
  const { t } = useLocalization();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then((res) => {
      setRefreshing(false);
    });
  }, []);
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              marginLeft: 8,
              color: theme.colors.textSecondary,
              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            {t("detail")}
          </Text>
          <View
            style={{
              // backgroundColor: "#FFF",
              backgroundColor: theme.colors.cardBackground,
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 20,
              gap: 10,
              borderRadius: 6,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                width: "100%",
                // color: "#80848A",
                color: theme.colors.text,

                fontFamily: "InterRegular",
                fontSize: 14,
              }}
            >
              {t("item")} #
              {
                data.retailShopStockByProductIdAndByRetailShopId.product
                  .serialNumber
              }
            </Text>
            <Text
              style={{
                width: "100%",
                // color: "#2B2C2E",
                color: theme.colors.text,

                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              {
                data.retailShopStockByProductIdAndByRetailShopId.product
                  .priceHistory[0]?.price
              }{" "}
              {t("etb")}
            </Text>
            <Text
              style={{
                width: "100%",
                // color: "#80848A",
                color: theme.colors.text,

                fontFamily: "InterRegular",
                fontSize: 14,
              }}
            >
              {t("quantity")}:{" "}
              {data.retailShopStockByProductIdAndByRetailShopId.quantity}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 8,
              // color: "#828282",
              color: theme.colors.text,

              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            {t("priceHistory")}
          </Text>
          <View
            style={{
              width: "100%",
            }}
          >
            <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={priceHistory}
              renderItem={({ item }) => (<PriceHistoryItem item={item} />)}
              ItemSeparatorComponent={CustomDivider}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      )}
    </BaseLayout>
  );
};

export default ItemDetailScreen;
