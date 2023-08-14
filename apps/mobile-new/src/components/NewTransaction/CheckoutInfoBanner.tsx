import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { CheckoutItem } from "./TransactionItem";
import AsyncStorageUtils from "../../utils/async_storage";
import { CREATE_SALES_TRANSACTION_MUTATION } from "../../graphql/mutations/salesMutations";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "@/src/contexts/preference";
import { Card } from "react-native-paper";
type Props = {
  checkoutItems: CheckoutItem[];
  setCheckoutItems: any;
};

const CheckoutInfoBanner = ({ checkoutItems, setCheckoutItems }: Props) => {
  const [total, setTotal] = React.useState<number>(0);
  const { authState } = useAuth();

  const { theme } = useAppTheme();
  const [createTransaction, {}] = useMutation(
    CREATE_SALES_TRANSACTION_MUTATION
  );

  const updateCheckout = useCallback(async () => {
    setTotal(
      checkoutItems.reduce(
        (prev, curr) => prev + curr.quantity * curr.product?.activePrice?.price,
        0
      )
    );
    AsyncStorageUtils.setItem("checkout", checkoutItems);
  }, [checkoutItems]);

  useEffect(() => {
    updateCheckout();
  }, [updateCheckout]);

  return (
    <Card
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Card.Content>
        <Text
          onPress={async () => {
            setCheckoutItems([]);
            await AsyncStorageUtils.setItem("checkout", []);
            setTotal(0);
          }}
          style={{
            fontFamily: "InterSemiBold",
            fontSize: 20,
            color: "red",
          }}
        >
          Remove All
        </Text>
        <View style={{ alignItems: "flex-start", gap: 10 }}>
          <Text style={{ fontFamily: "InterSemiBold", fontSize: 18 }}>
            Total:{" "}
            <Text
              style={{
                color: "#000",
                fontFamily: "InterBold",
                fontSize: 20,
              }}
            >
              ETB {total}
            </Text>
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 16,
            }}
            onPress={async () => {
              await createTransaction({
                variables: {
                  data: {
                    retailShopId: authState?.user.retailShop[0].id,
                    goods: checkoutItems.map((item: CheckoutItem) => ({
                      price: item.product.activePrice.price,
                      productId: item.productId,
                      quantity: item.quantity,
                    })),
                  },
                },
              });
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: "InterSemiBold",
                fontSize: 16,
              }}
            >
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CheckoutInfoBanner;

const styles = StyleSheet.create({});
