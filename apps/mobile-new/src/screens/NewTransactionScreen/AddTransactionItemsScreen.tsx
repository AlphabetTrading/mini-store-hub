import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { SearchBar } from "react-native-screens";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { BaseLayout } from "../../components/BaseLayout";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/auth";
import { GET_RETAIL_SHOP_PRODUCTS_SIMPLE } from "../../graphql/queries/retailShopQuery";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorageUtils from "../../utils/async_storage";
import { FAB } from "react-native-paper";

import CategoryList, {
  CategoryType,
} from "../../components/NewTransaction/CategoryList";
import SearchBarComponent from "../../components/NewTransaction/SearchBar";
import { Button } from "@rneui/base";
import { useAppTheme } from "@/src/contexts/preference";
import SingleProductItemCard from "@/src/components/NewTransaction/SingleProductItemCard";

const AllCategory: CategoryType = {
  id: "afasfiahsofa",
  name: "ALL",
};

const AddTransactionItemsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [alreadySelected, setAlreadySelected] = useState<any[]>([]);
  const { theme } = useAppTheme();

  const fetchCheckout = useCallback(async () => {
    const items = await AsyncStorageUtils.getItem("checkout");
    if (items) setAlreadySelected(items);
  }, [route]);

  useEffect(() => {
    fetchCheckout();
  }, [fetchCheckout]);

  const { authState } = useAuth();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>(AllCategory);

  const { loading, data, error, refetch } = useQuery(
    GET_RETAIL_SHOP_PRODUCTS_SIMPLE,
    {
      variables: {
        filterRetailShopStockInput: {
          retailShopId: authState?.user.retailShop[0].id,
        },
      },
      notifyOnNetworkStatusChange: true,
      refetchWritePolicy: "merge",
      partialRefetch: true,
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (selectedCategory.id === AllCategory.id) {
      refetch({
        filterRetailShopStockInput: {
          retailShopId: authState?.user.retailShop[0].id,
        },
      });
    } else {
      refetch({
        filterRetailShopStockInput: {
          product: {
            category: {
              id: selectedCategory.id,
            },
          },
          retailShopId: authState?.user.retailShop[0].id,
        },
      });
    }
  }, [selectedCategory]);

  const selectItem = (stockItem: any) => {
    if (alreadySelected) {
      if (alreadySelected.some((item: any) => item.id === stockItem.id)) {
        setAlreadySelected(
          alreadySelected.filter((filterItem) => filterItem.id !== stockItem.id)
        );
      } else {
        setAlreadySelected([
          ...alreadySelected,
          { ...stockItem, selectedQuantity: 1 },
        ]);
      }
    }
  };
  const updateItem = (stockItem: any) => {
    if (alreadySelected) {
      if (alreadySelected.some((item: any) => item.id === stockItem.id)) {
        setAlreadySelected((prev) =>
          prev.map((item) => {
            if (item.id === stockItem.id) {
              return stockItem;
            }
            return item;
          })
        );
      }
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    if (data && data.retailShopStockByRetailShopId.items) {
      const alteredItems = data.retailShopStockByRetailShopId.items.map(
        (item: any) => ({ ...item, selectedQuantity: 0 })
      );
      setProducts(alteredItems);
      setFilteredProducts(alteredItems);
    }
  }, [data, selectedCategory]);

  useEffect(() => {
    if (searchPhrase === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item: any) => {
          return (
            item.product.name
              .toLowerCase()
              .includes(searchPhrase.toLowerCase()) ||
            item.product.serialNumber
              .toLowerCase()
              .includes(searchPhrase.toLowerCase()) ||
            item.product.category.name
              .toLowerCase()
              .includes(searchPhrase.toLowerCase())
          );
        })
      );
    }
  }, [searchPhrase]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      backgroundColor: theme.colors.background,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      borderRadius: 32,
    },
  });
  return (
    <BaseLayout>
      <SearchBarComponent
        placeholder="Type Here..."
        onChangeText={(text: string) => {
          setSearchPhrase(text);
        }}
        value={searchPhrase}
      />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: theme.colors.background,
              width: "100%",
            }}
          >
            {error ? (
              <View>
                <Text>{error.message}</Text>
                <Button
                  onPress={() => {
                    refetch();
                  }}
                >
                  <Text style={{ color: theme.colors.text }}>Refresh</Text>
                </Button>
              </View>
            ) : filteredProducts.length > 0 ? (
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  width: "100%",
                }}
              >
                <SearchBar />
                <FlatList
                  contentContainerStyle={styles.container}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={filteredProducts.sort((a, b) =>
                    alreadySelected
                      ? alreadySelected.findIndex((i) => i.id === b.id) -
                        alreadySelected.findIndex((i) => i.id === a.id)
                      : 1
                  )}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 5,
                        backgroundColor: theme.colors.background,
                      }}
                    />
                  )}
                  renderItem={({ item, index }) => (
                    <SingleProductItemCard
                      key={item.id}
                      item={item}
                      updateItem={updateItem}
                      selectItem={selectItem}
                      alreadySelected={alreadySelected}
                    />
                  )}
                  keyExtractor={(item) => item.id}
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
                    fontSize: 18,
                    fontFamily: "InterMedium",
                    color: theme.colors.text,
                  }}
                >
                  No Items Found
                </Text>
              </View>
            )}
          </View>
          {/* <TouchableOpacity
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
            onPress={async () => {
              await AsyncStorageUtils.setItem("checkout", alreadySelected);
              navigation.navigate("Root", {
                screen: "NewTransactionRoot",
                params: { screen: "Index" },
              });
            }}
          >
            <AntDesign
              name="check"
              style={{ padding: 5 }}
              size={36}
              color="white"
            />
          </TouchableOpacity> */}
          <FAB
            icon="check"
            style={styles.fab}
            size="medium"
            customSize={64}
            onPress={async () => {
              await AsyncStorageUtils.setItem("checkout", alreadySelected);
              navigation.navigate("Root", {
                screen: "NewTransactionRoot",
                params: { screen: "Index" },
              });
            }}
          />
        </View>
      )}
    </BaseLayout>
  );
};

export default AddTransactionItemsScreen;
