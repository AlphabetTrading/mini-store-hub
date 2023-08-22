import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CheckoutItem } from "./TransactionItem";
import AsyncStorageUtils from "../../utils/async_storage";
import { CREATE_SALES_TRANSACTION_MUTATION } from "../../graphql/mutations/salesMutations";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "@/src/contexts/preference";
import { ActivityIndicator, Card, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
type Props = {
  checkoutItems: CheckoutItem[];
  setCheckoutItems: any;
};

const CheckoutInfoBanner = ({ checkoutItems, setCheckoutItems }: Props) => {
  const [total, setTotal] = React.useState<number>(0);
  const { authState } = useAuth();
  const navigation = useNavigation();

  const updateCheckout = useCallback(async () => {
    setTotal(
      checkoutItems.reduce(
        (prev, curr) =>
          prev + curr.selectedQuantity * curr.product?.activePrice?.price,
        0
      )
    );
    if (checkoutItems.length > 0) {
      AsyncStorageUtils.setItem("checkout", checkoutItems);
    } else {
      AsyncStorageUtils.removeItem("checkout");
    }
  }, [checkoutItems]);

  useEffect(() => {
    updateCheckout();
  }, [updateCheckout]);

  const { theme } = useAppTheme();
  const [createNewTransaction, { loading, error, data, reset }] = useMutation(
    CREATE_SALES_TRANSACTION_MUTATION,
    {
      onCompleted: async (data, clientOptions) => {
        if (data) {
          const { id, totalPrice } = data.createSaleTransaction;
          setCheckoutItems([]);
          navigation.navigate("Root", {
            screen: "SalesRoot",
          });
          await AsyncStorageUtils.removeItem("checkout");
          navigation.navigate("Root", {
            screen: "SalesRoot",
            params: {
              screen: "TransactionDetailScreen",
              params: {
                transactionID: id,
                totalPrice,
              },
            },
          });
        }
      },
    }
  );

  const onCheckout = async () => {
    const inputData = {
      retailShopId: authState?.user.retailShop[0].id,
      goods: checkoutItems.map((item: CheckoutItem) => ({
        productId: item.productId,
        quantity: item.selectedQuantity,
      })),
    };
    await createNewTransaction({
      variables: {
        data: inputData,
      },
    });
  };

  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View>
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
              disabled={loading}
              onPress={onCheckout}
            >
              {loading ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <ActivityIndicator color={theme.colors.white} />
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontFamily: "InterSemiBold",
                      fontSize: 16,
                    }}
                  >
                    Submitting...
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                    onPress={async (e) => {
                      e.stopPropagation();
                      await reset();
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.primary,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{
                    color: theme.colors.white,
                    fontFamily: "InterSemiBold",
                    fontSize: 16,
                  }}
                >
                  Proceed to Checkout
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={4000}
        // action={{
        //   label: "Undo",
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        Successfully Created.
      </Snackbar>
    </View>
  );
};

export default CheckoutInfoBanner;

const styles = StyleSheet.create({});
