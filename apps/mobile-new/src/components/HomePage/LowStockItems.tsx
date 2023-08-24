import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetLowStockItems } from "../../hooks/api/useGetLowStockItems";
import { useAuth } from "../../contexts/auth";
import { ActivityIndicator, Avatar, Card } from "react-native-paper";
import { useLocalization } from "../../contexts/localization";
import { useAppTheme } from "../../contexts/preference";
import { useNavigation } from "@react-navigation/native";

const LowStockItems = () => {
  const { authState } = useAuth();
  const retailShopID = authState?.user.retailShop[0].id;
  const navigation = useNavigation();
  const { t, locale } = useLocalization();
  const { theme } = useAppTheme();

  const { loading, data, refetch } = useGetLowStockItems(retailShopID);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.text,
        }}
      >
        {t("lowStockItems")}
      </Text>
      <View
        style={{
          paddingBottom: 24,
          marginBottom: 10,
          paddingHorizontal: 5,
        }}
      >
        {loading ? (
          <View style={{ margin: 20 }}>
            <ActivityIndicator animating={true} color={"#5C6BC0"} />
          </View>
        ) : data?.findLowStockByRetailShopId.items.length > 0 ? (
          data?.findLowStockByRetailShopId.items.map((item: any) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: theme.colors.cardBackground,
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              <Card.Content
                style={{
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Root", {
                      screen: "HomeRoot",
                      params: {
                        screen: "HomeDetailScreen",
                        params: {
                          itemID: item.product.id,
                          itemName: locale.includes("en")
                            ? item.product.name
                            : item.product.amharicName,
                        },
                      },
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: theme.colors.cardBackground,
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <Avatar.Image
                      source={{ uri: "https://picsum.photos/200" }}
                      size={40}
                    />
                    <View style={{ flex: 1, gap: 5 }}>
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontSize: 18,
                          fontFamily: "InterMedium",
                        }}
                      >
                        {/* {item.product.name} */}
                        {locale === "en"
                          ? item.product.name
                          : item.product.amharicName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                          color: theme.colors.text,
                        }}
                      >
                        {t("quantity")}: {item.quantity}
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
                      {locale === "en"
                        ? `${item.product.activePrice
                          ? item.product.activePrice.price
                          : 29
                        } ${t("etb")}`
                        : `${t("etb")} ${item.product.activePrice
                          ? item.product.activePrice.price
                          : 29
                        } `}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{ color: theme.colors.text, margin: 20 }}>
            {t("noLowStockItems")}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LowStockItems;

const styles = StyleSheet.create({});
