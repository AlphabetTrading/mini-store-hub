import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { BaseLayout } from "../../components/BaseLayout";
import { useMutation } from "@apollo/client";
import { CREATE_SALES_TRANSACTION_MUTATION } from "../../graphql/mutations/salesMutations";
import { useAuth } from "../../contexts/auth";
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";

type Props = {};

interface checkoutItem {
  productId: string;
  product?: any;
  name: string;
  quantity: number;
  price: number;
}

const CheckoutScreen = ({ navigation }: any) => {
  const { authState } = useAuth();
  const route = useRoute<any>();
  const [total, setTotal] = React.useState<number>(0);
  const [checkoutItems, setCheckoutItems] = React.useState<checkoutItem[]>([]);
  const [createTransaction, { data, error, loading, reset }] = useMutation(
    CREATE_SALES_TRANSACTION_MUTATION
  );

  const fetchCheckoutItems = useCallback(async () => {
    const items = await SecureStore.getItemAsync("checkout");
    console.log(items, "Items");
    setCheckoutItems(JSON.parse(items ? items : ""));
    // setCheckoutItems(items)
  }, [navigation, route]);

  useEffect(() => {
    fetchCheckoutItems();
  }, [fetchCheckoutItems]);

  const addItem = (item: checkoutItem) => {
    setCheckoutItems((prev) => [...prev, item]);
    setTotal((prev) => prev + item.quantity * item.price);
  };

  const removeItem = async (item: checkoutItem) => {
    console.log(item, checkoutItems, "delted ");
    setCheckoutItems((prev) => {
      const data = prev.filter((prevItem) => {
        console.log(prevItem.productId, item.productId, "prevItem");
        return prevItem.productId !== item.productId;
      });
      console.log(prev.length, data.length, "after deleting");
      return prev;
      // prev.filter((prevItem) => prevItem.productId !== item.productId)
    });
    // await AsyncStorage.setItem("checkout", JSON.stringify(checkoutItems));
    // setTotal((prev) => prev - item.quantity * item.price);
  };

  const updateCheckout = useCallback(async () => {
    setTotal(
      checkoutItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
    );
    SecureStore.setItemAsync("checkout", JSON.stringify(checkoutItems));
  }, [checkoutItems]);

  useEffect(() => {
    updateCheckout();
  }, [updateCheckout]);

  const clearItems = () => {
    setCheckoutItems([]);
    setTotal(0);
  };

  console.log(checkoutItems, "Checkout");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCheckoutItems();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <BaseLayout>
      <View style={{ flex: 1 }}>
        {checkoutItems.length === 0 ? (
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ marginTop: 20 }}>No items added yet</Text>
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            horizontal={true}
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              gap: 10,
              borderColor: "#DC1616",
              borderWidth: 10,
            }}
          >
            <FlatList
              style={{ flex: 1, height: "100%" }}
              data={checkoutItems}
              renderItem={({ item: checkoutItem, index }) => (
                <View
                  key={index}
                  style={{
                    padding: 8,
                    paddingHorizontal: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    width: "100%",
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 12,
                    }}
                  >
                    <Feather
                      name="minus-circle"
                      size={24}
                      color="#DC161699"
                      onPress={() => removeItem(checkoutItem)}
                    />
                    <View>
                      <Text
                        style={[
                          styles.itemTextStyle,
                          { fontSize: 18, fontFamily: "InterMedium" },
                        ]}
                      >
                        {checkoutItem.product.name}
                      </Text>
                      <Text style={{ fontSize: 16, fontFamily: "InterLight" }}>
                        Unit Price: ETB {checkoutItem.product.activePrice.price}
                      </Text>
                      <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
                        ETB{" "}
                        <Text>
                          {checkoutItem.price * checkoutItem.quantity}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#5684E04D",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Pressable>
                        <Entypo
                          name="minus"
                          size={18}
                          color="#5684E0"
                          onPress={() => {}}
                        />
                      </Pressable>
                    </View>
                    <Text style={{ color: "black", fontSize: 18 }}>
                      {checkoutItem.quantity}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#5684E04D",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Pressable onPress={() => {}}>
                        <Entypo name="plus" size={18} color="#5684E0" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.productId}
            />

            <Text
              onPress={async () => {
                setCheckoutItems([]);
                await SecureStore.setItemAsync("checkout", JSON.stringify([]));
              }}
              style={{
                fontFamily: "InterSemiBold",
                fontSize: 10,
                color: "red",
              }}
            >
              Remove All
            </Text>
            <View style={{ alignItems: "center", marginTop: 20 }}>
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
                  margin: 10,
                  backgroundColor: "#5684E0",
                  padding: 15,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                }}
                onPress={async () => {
                  await createTransaction({
                    variables: {
                      data: {
                        retailShopId: authState?.user.retailShop[0].id,
                        goods: checkoutItems.map((item: checkoutItem) => ({
                          price: item.price,
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
                    color: "#FFF",
                    fontFamily: "InterSemiBold",
                    fontSize: 16,
                  }}
                >
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#5684E0",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          margin: 10,
        }}
        onPress={() => {
          navigation.navigate("Root", {
            screen: "NewTransactionRoot",
            params: { screen: "SelectCategory" },
          });
        }}
      >
        <Entypo name="plus" style={{ padding: 5 }} size={36} color="white" />
      </TouchableOpacity>
    </BaseLayout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  itemTextStyle: {
    textTransform: "capitalize",
  },
});
