import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useAppTheme } from "@/src/contexts/preference";

export interface CheckoutItem {
  id?: string;
  productId: string;
  quantity: number;
  selectedQuantity: number;
  product: {
    id: string;
    name: string;
    amharicName: string;
    activePrice: {
      price: number;
      purchasedPrice: number;
    };
  };
  name: string;
}

const TransactionItem = ({
  checkoutItem,
  setCheckoutItems,
}: {
  checkoutItem: CheckoutItem;
  setCheckoutItems: any;
}) => {
  const ref = useRef(null);
  const { theme } = useAppTheme();

  const removeItem = async (item: CheckoutItem) => {
    setCheckoutItems((prev: CheckoutItem[]) => {
      const data = prev.filter((prevItem) => {
        return prevItem.productId !== item.productId;
      });
      return data;
    });
  };

  const RightActions = (progress: any, dragX: any) => {
    const widthThreshold = Dimensions.get("window").width / 2;

    const trans = dragX.interpolate({
      inputRange: [-widthThreshold, 0],
      // outputRange: [0, -widthThreshold],
      outputRange: [-widthThreshold * 0.5, 0],
      extrapolate: "clamp",
    });
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.4, 0],
    });
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
      >
        <RectButton
          onPress={() => removeItem(checkoutItem)}
          style={{
            height: "100%",
            width: "75%",
            transform: [{ translateX: 120 }],
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              height: "100%",
              transform: [{ translateX: trans }],
              flexDirection: "row",
              backgroundColor: "red",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 50,
              columnGap: 5,
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 15,
                fontSize: 20,
                fontWeight: "800",
                transform: [{ scale: scale }],
              }}
            >
              Delete
            </Animated.Text>
            <Entypo name="trash" size={24} color="white" />
          </Animated.View>
        </RectButton>
      </View>
    );
  };

  const handleQuantityChange = (change: number) => () => {
    setCheckoutItems((prev: CheckoutItem[]) => {
      return prev.map((item) => {
        console.log(
          item.productId,
          checkoutItem.productId,
          item.selectedQuantity,
          checkoutItem.selectedQuantity,
          checkoutItem.quantity,
          item.quantity
        );
        if (item.productId === checkoutItem.productId) {
          if (change === -1) {
            () => {
              return {
                ...item,
                selectedQuantity: Math.max(
                  0,
                  checkoutItem.selectedQuantity - 1
                ),
              };
            };
          } else {
            return {
              ...item,
              selectedQuantity: Math.min(
                checkoutItem.selectedQuantity + 1,
                checkoutItem.quantity
              ),
            };
          }
        } else {
          return item;
        }
      });
    });
  };
  return (
    <View
      style={{
        width: "100%",
        // backgroundColor: "#FFF",
        position: "relative",
        height: 80,
        paddingHorizontal: 10,
      }}
    >
      <Swipeable
        ref={ref}
        key={checkoutItem.productId}
        renderRightActions={RightActions}
        friction={1}
        enableTrackpadTwoFingerGesture
        // rightThreshold={100}
        onSwipeableOpen={(direction) => {
          removeItem(checkoutItem);
        }}
        onSwipeableClose={(direction) => {}}
        // overshootRight={false}
        // overshootFriction={8}
        // activeOffsetX={[-20, 20]}
        // onActivated={()=>removeItem(checkoutItem)}
      >
        <View
          style={{
            padding: 8,
            paddingHorizontal: 15,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 10,
            width: "100%",
            height: "100%",
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
            <View>
              <Text
                style={[
                  // styles.itemTextStyle,
                  {
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    color: theme.colors.text,
                  },
                ]}
              >
                {checkoutItem.product.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "InterLight",
                  color: theme.colors.text,
                }}
              >
                Unit Price: ETB {checkoutItem.product.activePrice.price}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "InterMedium",
                  color: theme.colors.text,
                }}
              >
                ETB{" "}
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  {checkoutItem.product.activePrice.price *
                    checkoutItem.selectedQuantity}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
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
              <Pressable onPress={handleQuantityChange(-1)}>
                <Entypo name="minus" size={24} color={theme.colors.text} />
              </Pressable>
            </View>
            <Text style={{ fontSize: 18, color: theme.colors.text }}>
              {checkoutItem.selectedQuantity}
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
              <Pressable onPress={handleQuantityChange(1)}>
                <Entypo name="plus" size={24} color={theme.colors.text} />
              </Pressable>
            </View>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 5,
  },
});

{
  /* <Feather
            name="minus-circle"
            size={24}
            color="#DC161699"
            onPress={() => removeItem(checkoutItem)}
          /> */
}
