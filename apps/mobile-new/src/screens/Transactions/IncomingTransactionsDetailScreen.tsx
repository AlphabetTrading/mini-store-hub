import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { useQuery } from "@apollo/client";
import { GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP_AND_DATE } from "../../graphql/queries/salesQueries";
import { format } from "date-fns";
import { useAppTheme } from "../../contexts/preference";
import { useLocalization } from "../../contexts/localization";
import { ActivityIndicator } from "react-native-paper";
import TransactionItem from "../../components/Sales/TransactionItem";
import { FlatList } from "react-native-gesture-handler";
import CustomDivider from "../../components/CustomDivider";
import IncomingGoods from "../../components/Transactions/IncomingTransactions/IncomingGoods";

type Props = {};

const IncomingTransactionsDetailScreen = ({ route, navigation }: any) => {
  const { transactionID, totalPrice } = route.params;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const { t, locale } = useLocalization();

  const { data, loading, refetch, error } = useQuery(
    GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP_AND_DATE,
    {
      variables: {
        goodsTransferId: transactionID,
      },
    }
  );

  const { theme } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.colors.background,
      gap: 12,
    },
    totalStyle: {
      color: theme.colors.textSecondary,

      fontFamily: "InterBold",
      fontSize: 20,
    },
  });
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : !data || error ? (
        <View>
          <Text>{t("somethingWentWrong")}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View style={styles.container}>
            <Text
              style={{
                marginLeft: 8,
                color: theme.colors.text,
                fontFamily: "InterBold",
                textTransform: "uppercase",
              }}
            >
              {t("details")}
            </Text>
            <View
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 6,
                padding: 20,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "InterMedium",
                  fontSize: 14,
                }}
              >
                {data.goodsTransfer.goods?.length} {t("items")}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "InterMedium",
                  fontSize: 20,
                }}
              >
                {/* {data.goodsTransfer?.totalPrice} {t("etb")} */}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "InterMedium",
                  fontSize: 14,
                }}
              >
                {format(
                  new Date(data.goodsTransfer.createdAt),
                  "MMM dd yyyy, pp"
                )}
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 8,
                marginVertical: 15,
                color: theme.colors.text,
                fontFamily: "InterBold",
                textTransform: "uppercase",
              }}
            >
              {t("items")}
            </Text>

            <FlatList
              data={data.goodsTransfer.goods}
              renderItem={({ item }) => <IncomingGoods goods={item} />}
              ItemSeparatorComponent={CustomDivider}
              keyExtractor={(item) => item.id}
            />
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "#5684E033",
                backgroundColor: theme.colors.background,
                padding: 20,
                borderRadius: 6,
                marginTop: 20,
              }}
            >
              <Text style={styles.totalStyle}>{t("total")}</Text>
              <Text style={styles.totalStyle}>{t("etb")} {totalPrice}</Text>
            </View> */}
          </View>
        </ScrollView>
      )}
    </BaseLayout>
  );
};

export default IncomingTransactionsDetailScreen;
