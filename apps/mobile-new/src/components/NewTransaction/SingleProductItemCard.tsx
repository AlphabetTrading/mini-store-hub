import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Avatar } from "react-native-paper";
import { useAppTheme } from "@/src/contexts/preference";
import { Entypo } from "@expo/vector-icons";
import { CheckoutItem } from "./TransactionItem";

type Props = {
  item: CheckoutItem;
  selectItem: (item: any) => void;
  updateItem: (item: any) => void;
  alreadySelected: any[];
};

const SingleProductItemCard = ({
  item,
  alreadySelected,
  selectItem,
  updateItem,
}: Props) => {
  const { theme } = useAppTheme();
  const isSelected = alreadySelected.some((i) => i.id === item.id);
  const [productItem, setProductItem] = useState<CheckoutItem>({
    ...item,
    selectedQuantity: 1,
  });

  useEffect(() => {
    updateItem(productItem);
  }, [productItem]);

  return (
    <Card
      style={[
        {
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
        },
        isSelected && {
          borderWidth: 0.5,
          borderColor: theme.colors.accent,
        },
      ]}
    >
      <Card.Content>
        <TouchableOpacity
          onPress={() => {
            selectItem(productItem);
          }}
          style={[
            {
              flexDirection: "row",
              backgroundColor: theme.colors.primary,
              width: "100%",
              height: 80,
              alignItems: "center",
              gap: 16,
            },
          ]}
        >
          {isSelected ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, gap: 5 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    color: theme.colors.text,
                  }}
                >
                  {productItem.product.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    color: theme.colors.text,
                  }}
                >
                  Quantity: {productItem.selectedQuantity}
                </Text>
                <Text
                  style={{
                    width: 80,
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    alignSelf: "flex-start",
                    color: theme.colors.text,
                  }}
                >
                  ETB {productItem.product.activePrice.price}
                </Text>
                <Text></Text>
              </View>
              <Pressable
                onPress={(e: GestureResponderEvent) => {
                  e.stopPropagation();
                }}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  gap: 10,
                  flex: 0.5,
                }}
              >
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
                      padding: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Pressable
                      onPress={(e: GestureResponderEvent) => {
                        e.stopPropagation();
                        setProductItem((prev: CheckoutItem) => {
                          const newItem = {
                            ...prev,
                            selectedQuantity: Math.max(
                              1,
                              prev.selectedQuantity - 1
                            ),
                          };
                          return newItem;
                        });
                      }}
                    >
                      <Entypo
                        name="minus"
                        size={24}
                        color={theme.colors.text}
                      />
                    </Pressable>
                  </View>
                  <Text style={{ fontSize: 20, color: theme.colors.text }}>
                    {productItem.selectedQuantity}
                  </Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#5684E04D",
                      padding: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Pressable
                      onPress={(e: GestureResponderEvent) => {
                        e.stopPropagation();
                        setProductItem((prev: CheckoutItem) => {
                          return {
                            ...prev,
                            selectedQuantity: Math.min(
                              prev.quantity,
                              prev.selectedQuantity + 1
                            ),
                          };
                        });
                      }}
                    >
                      <Entypo name="plus" size={24} color={theme.colors.text} />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    {productItem.selectedQuantity} x{" "}
                    {productItem.product.activePrice.price} = ETB{" "}
                    {productItem.selectedQuantity *
                      productItem.product.activePrice.price}
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Avatar.Image source={{ uri: "/assets/images/profile.png" }} />
              <View style={{ flex: 1, gap: 5 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    color: theme.colors.text,
                  }}
                >
                  {item.product.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    color: theme.colors.text,
                  }}
                >
                  Quantity: {item.quantity}
                </Text>
              </View>
              <Text
                style={{
                  width: 80,
                  fontSize: 18,
                  fontFamily: "InterMedium",
                  alignSelf: "flex-end",
                  color: theme.colors.text,
                }}
              >
                ETB {item.product.activePrice.price}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default SingleProductItemCard;

const styles = StyleSheet.create({});
