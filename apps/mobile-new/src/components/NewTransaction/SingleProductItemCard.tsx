import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Avatar, TextInput } from "react-native-paper";
import { useAppTheme } from "../../contexts/preference";
import { Entypo } from "@expo/vector-icons";
import { CheckoutItem } from "./TransactionItem";
import { notifyMessage } from "../Toast";
import { useLocalization } from "../../contexts/localization";
import QuantityControl from "./QuantityControl";
type Props = {
  item: CheckoutItem;
  selectItem: (item: any) => void;
  updateItem: (item: any) => void;
  alreadySelected: any[];
};


const SingleProductItemCard = React.memo(({
  item,
  alreadySelected,
  selectItem,
  updateItem,
}: Props) => {
  const { theme } = useAppTheme();
  const { t, locale } = useLocalization();
  const isSelected =
    alreadySelected && alreadySelected.find((i) => i.id === item.id) !== undefined;
  const [productItem, setProductItem] = useState<CheckoutItem>({
    ...item,
    selectedQuantity: isSelected ? (alreadySelected.find((i) => i.id === item.id) ? alreadySelected.find((i) => i.id === item.id).selectedQuantity : 1) : 1,
  });

  useEffect(() => {
    updateItem(productItem);
  }, [productItem]);

  console.log(productItem.product.images)
  return (
    <TouchableOpacity
      onPress={() => {
        if (productItem.quantity === 0) {
          notifyMessage("Sorry the Item is Out of Stock!");
        } else {
          selectItem(productItem);
          if (isSelected) {
            setProductItem(item)
          }
        }
      }}
      style={[
        {
          borderRadius: 10,
          padding: 5,
          width: "100%",
        },
      ]}
    >
      <Card
        style={[
          {
            borderRadius: 10,
          },
          isSelected && {
            borderWidth: 1,
            borderColor: theme.colors.accent,
          },
        ]}
      >
        <Card.Content
          style={[
            {
              flexDirection: "row",
              backgroundColor: theme.colors.cardBackground,
              alignItems: "center",
              borderRadius: 9,
            },
          ]}
        >
          {isSelected ? (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "InterMedium",
                  color: theme.colors.text,
                }}
              >
                {locale.includes("am") ? productItem.product.amharicName : productItem.product.name}

              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}

              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "InterRegular",
                      color: theme.colors.text,

                    }}
                  >
                    {t("quantity")}: {item.quantity} {item.product.unit}
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
                    {t("etb")} {productItem.product.activePrice.price}
                  </Text>
                </View>

                <Pressable
                  onPress={(e: GestureResponderEvent) => {
                    e.stopPropagation();
                  }}
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                    gap: 10,
                  }}
                >
                  <QuantityControl
                    productItem={alreadySelected.find((i) => i.id === item.id)}
                    onChange={
                      (num: any) => {
                        setProductItem((prev: any) => {
                          return {
                            ...prev,
                            selectedQuantity: num,
                          };
                        });
                      }
                    } />
                  <View style={{
                    width: "100%",
                    alignItems: "flex-end",
                  }}>
                    <Text
                      style={{
                        color: theme.colors.text,
                        fontSize: 12,
                        width: "100%",

                        textAlign: "right",
                      }}
                    >
                      {productItem.selectedQuantity} x{" "}
                      {productItem.product.activePrice.price} = {t("etb")}{" "}
                      {productItem.selectedQuantity *
                        productItem.product.activePrice.price}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Avatar.Image 
                    source={{ uri: item.product.images.length > 0 ? item.product.images[0] : "https://picsum.photos/200/300" }}
              // source={{ uri: "https://picsum.photos/200" }}
               />
              <View style={{ flex: 1, gap: 5 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    color: theme.colors.text,
                  }}
                >
                  {locale.includes("am") ? item.product.amharicName : item.product.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    color: theme.colors.text,
                  }}
                >
                  {t("quantity")}: {item.quantity} {item.product.unit}
                </Text>
              </View>
              <Text
                style={{
                  width: 80,
                  fontSize: 18,
                  fontFamily: "InterMedium",
                  alignSelf: "flex-end",
                  color: theme.colors.text,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                {t("etb")} {item.product.activePrice.price}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
});

export default SingleProductItemCard;

const styles = StyleSheet.create({});
