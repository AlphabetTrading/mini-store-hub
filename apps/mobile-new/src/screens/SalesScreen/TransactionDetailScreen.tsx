import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../components/BaseLayout";
import Colors from "../../constants/Colors";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP } from "../../graphql/queries/salesQueries";
import { format } from "date-fns";

type Props = {};

const TransactionDetailScreen = ({ route }: any) => {
  const { transactionID, totalPrice } = route.params;

  const { data, loading, refetch, error } = useQuery(
    GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP,
    {
      variables: {
        saleTransactionId: transactionID,
      },
    }
  );
  console.log(route.params, " is data");
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
                color: "#828282",
                fontFamily: "Inter-Bold",
                textTransform: "uppercase",
              }}
            >
              Details
            </Text>
            <View
              style={{
                backgroundColor: "#FFF",
                borderRadius: 6,
                padding: 20,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: "#80848A",
                  fontFamily: "Inter-Medium",
                  fontSize: 14,
                }}
              >
                {data.saleTransaction.saleTransactionItems?.length} Items
              </Text>
              <Text
                style={{
                  color: "#2B2C2E",
                  fontFamily: "Inter-Medium",
                  fontSize: 20,
                }}
              >
                {data.saleTransaction?.totalPrice} ETB
              </Text>
              <Text
                style={{
                  color: "#80848A",
                  fontFamily: "Inter-Medium",
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
                color: "#828282",
                fontFamily: "Inter-Bold",
                textTransform: "uppercase",
              }}
            >
              Items
            </Text>
            {data.saleTransaction.saleTransactionItems.map(
              (data: any, index: number) => {
                return (
                  <View
                    key={data.id}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#FFF",
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
                        style={{ fontSize: 18, fontFamily: "Inter-SemiBold" }}
                      >
                        {data.product.name}
                      </Text>
                      <Text
                        style={{ fontFamily: "Inter-Light", color: "#80848A" }}
                      >
                        Quantity: {data.quantity}
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: 80,
                        fontSize: 18,
                        fontFamily: "Inter-Bold",
                        alignSelf: "flex-end",
                        color: "#626262",
                      }}
                    >
                      ETB {data.subTotal}
                    </Text>
                  </View>
                );
              }
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#5684E033",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
    gap: 12,
  },
  totalStyle: {
    color: "#5684E0",
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
});
