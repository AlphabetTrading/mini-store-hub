import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP } from "../../graphql/queries/salesQueries";
import { format } from "date-fns";
import { useAppTheme } from "../../contexts/preference";
import { useLocalization } from "../../contexts/localization";

type Props = {};

const TransactionDetailScreen = ({ route }: any) => {
  const { transactionID, totalPrice } = route.params;
  const { t } = useLocalization();

  const { data, loading, refetch, error } = useQuery(
    GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP,
    {
      variables: {
        saleTransactionId: transactionID,
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
          <ActivityIndicator size="large" />
        </View>
      ) : !data || error ? (
        <View>
          <Text>Something went wrong</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
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
                {data.saleTransaction.saleTransactionItems?.length} {t("items")}
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "InterMedium",
                  fontSize: 20,
                }}
              >
                {data.saleTransaction?.totalPrice} ETB
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "InterMedium",
                  fontSize: 14,
                }}
              >
                {format(
                  new Date(data.saleTransaction.createdAt),
                  "MMM dd yyyy, pp"
                )}
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 8,
                marginVertical: 20,
                color: theme.colors.text,
                fontFamily: "InterBold",
                textTransform: "uppercase",
              }}
            >
              Items
            </Text>
            {data.saleTransaction.saleTransactionItems.map(
              (saleTransactionItem: any, index: number) => {
                return (
                  <View
                    key={saleTransactionItem.id}
                    style={{
                      flexDirection: "row",
                      // backgroundColor: "#FFF",
                      backgroundColor: theme.colors.background,

                      width: "100%",
                      padding: 20,
                      paddingVertical: 15,
                      alignItems: "center",
                      gap: 16,
                      marginVertical: 2,
                      borderRadius: 6,
                    }}
                  >
                    <View style={{ flex: 1, gap: 5 }}>
                      <Text
                        style={{
                          color: theme.colors.text,

                          fontSize: 18,
                          fontFamily: "InterSemiBold",
                        }}
                      >
                        {saleTransactionItem.product.name}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.text,

                          fontFamily: "InterLight",
                        }}
                      >
                        Quantity: {saleTransactionItem.quantity}
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: 80,
                        fontSize: 18,
                        fontFamily: "InterBold",
                        alignSelf: "flex-end",
                        // color: "#626262",
                        color: theme.colors.text,
                      }}
                    >
                      ETB {saleTransactionItem.subTotal}
                    </Text>
                  </View>
                );
              }
            )}
            <View
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
              <Text style={styles.totalStyle}>Total</Text>
              <Text style={styles.totalStyle}>ETB {totalPrice}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </BaseLayout>
  );
};

export default TransactionDetailScreen;
