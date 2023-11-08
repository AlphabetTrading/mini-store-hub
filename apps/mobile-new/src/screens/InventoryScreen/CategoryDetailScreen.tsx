import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RETAIL_SHOP_PRODUCTS } from "../../graphql/queries/retailShopQuery";
import { useAuth } from "../../contexts/auth";
import { BaseLayout } from "../../components/BaseLayout";
import { useNavigation } from "@react-navigation/native";
import SearchBarComponent from "../../components/NewTransaction/SearchBar";
import { useLocalization } from "../../contexts/localization";
import { useAppTheme } from "../../contexts/preference";
import { Avatar, ActivityIndicator, Button } from "react-native-paper";

type Props = {};

const CategoryDetailScreen = ({
  route,
}: {
  route: { params: { categoryID: string; categoryName: string } };
}) => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const categoryID = route.params.categoryID;
  const { authState } = useAuth();
  const { t, locale } = useLocalization();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const { loading, data, error, refetch } = useQuery(GET_RETAIL_SHOP_PRODUCTS, {
    variables: {
      filterRetailShopStockInput: {
        product: {
          category: {
            id: categoryID,
          },
        },
        retailShopId: authState?.user.retailShop[0].id,
      },
    },
    onCompleted: (data) => {
      setFilteredItems(data?.retailShopStockByRetailShopId.items ?? []);
    },
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // local search with debounce
      setFilteredItems(
        data?.retailShopStockByRetailShopId.items.filter(
          (item: any) =>
            item.product.name
              .toLowerCase()
              .includes(searchPhrase.toLowerCase()) ||
            item.product.serialNumber
              .toLowerCase()
              .includes(searchPhrase.toLowerCase()) ||
            item.product.amharicName
              .toLowerCase()
              .includes(searchPhrase.toLowerCase()) ||
            item.product.unit.toLowerCase().includes(searchPhrase.toLowerCase())
        ) ?? []
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchPhrase]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 15,
      backgroundColor: theme.colors.background,
    },
    categoryItem: {
      backgroundColor: "#7B7B7B1A",
      height: 80,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      // height: 75,
    },
    categoryImage: {
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "70%",
      maxHeight: "70%",
    },
    categoryText: {
      color: theme.colors.text,
      fontSize: 11,
      fontFamily: "InterLight",
    },
  });

  return (
    <BaseLayout>
      <SearchBarComponent
        onChangeText={(text) => {
          setSearchPhrase(text);
        }}
        value={searchPhrase}
        placeholder={t("searchHere")}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          {filteredItems.length > 0 ? (
            <View
              style={{
                backgroundColor: theme.colors.background,
                width: "100%",
                marginBottom: 60
              }}
            >
              <FlatList
                contentContainerStyle={styles.container}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredItems}
                // key={filteredItems.id}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.colors.background,
                      marginVertical: 4,
                    }}
                    key={item.id}
                    onPress={() =>
                      navigation.navigate("Root", {
                        screen: "InventoryRoot",
                        params: {
                          screen: "ItemDetailScreen",
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
                        // backgroundColor: "#FFF",
                        backgroundColor: theme.colors.cardBackground,

                        width: "100%",
                        padding: 10,
                        paddingVertical: 15,
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <Avatar.Image
                        source={{ uri: item.product.images.length > 0 ? item.product.images[0] : "https://picsum.photos/200/300" }}
                        size={60}
                      />
                      <View style={{ flex: 1, gap: 5 }}>
                        <Text
                          style={{
                            color: theme.colors.text,
                            fontSize: 18,
                            fontFamily: "InterMedium",
                          }}
                        >
                          {locale.includes("en")
                            ? item.product.name
                            : item.product.amharicName}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "InterRegular",
                            // color: "#80848A",
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
                          // color: "#626262",
                          color: theme.colors.text,
                        }}
                      >
                        {locale.includes("en")
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
                )}
              } 

              />
            </View>
          ) : (
            <View
              style={{
                marginVertical: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 18,
                  fontFamily: "InterMedium",
                }}
              >
                No Items Found
              </Text>
              <Button
                onPress={onRefresh}
                style={{
                  borderColor: theme.colors.tint,
                  borderWidth: 1,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 18,
                    fontFamily: "InterMedium",
                  }}
                >
                  {t("refresh")}
                </Text>
              </Button>
            </View>
          )}
        </View>
      )}
    </BaseLayout>
  );
};

export default CategoryDetailScreen;
