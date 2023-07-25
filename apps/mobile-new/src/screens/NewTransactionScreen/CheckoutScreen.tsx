import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {};

interface checkoutItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const CheckoutScreen = ({ navigation }: any) => {
  const [checkoutItems, setCheckoutItems] = React.useState<checkoutItem[]>([]);

  const [total, setTotal] = React.useState<number>(0);

  const addItem = (item: checkoutItem) => {
    setCheckoutItems((prev) => [...prev, item]);
    setTotal((prev) => prev + item.quantity * item.price);
  };

  const removeItem = (item: checkoutItem) => {
    setCheckoutItems((prev) =>
      prev.filter((prevItem) => prevItem.name !== item.name)
    );
    setTotal((prev) => prev - item.quantity * item.price);
  };

  const clearItems = () => {
    setCheckoutItems([]);
    setTotal(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
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
          <View
            style={{
              padding: 10,
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            {checkoutItems.map((item: checkoutItem, index: number) => {
              return (
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
                      onPress={() => removeItem(item)}
                    />
                    <View>
                      <Text
                        style={[
                          styles.itemTextStyle,
                          { fontSize: 18, fontFamily: "InterMedium" },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 16, fontFamily: "InterLight" }}>
                        Unit Price: ETB {item.price}
                      </Text>
                      <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
                        ETB <Text>{item.price * item.quantity}</Text>
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
                      {item.quantity}
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
              );
            })}
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
                onPress={() => {}}
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
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#5684E0",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          margin: 10,
        }}
        onPress={() => navigation.navigate("SelectCategory")}
      >
        <Entypo name="plus" style={{ padding: 20 }} size={36} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  itemTextStyle: {
    textTransform: "capitalize",
  },
});
