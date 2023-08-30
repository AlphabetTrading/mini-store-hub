import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/auth";
import { GET_RETAIL_SHOP_PRODUCTS_SIMPLE } from "../../graphql/queries/retailShopQuery";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorageUtils from "../../utils/async_storage";
import { Button, FAB } from "react-native-paper";

import CategoryList from "../../components/NewTransaction/CategoryList";
import SearchBarComponent from "../../components/NewTransaction/SearchBar";
import { useAppTheme } from "../../contexts/preference";
import SingleProductItemCard from "../../components/NewTransaction/SingleProductItemCard";
import { Category } from "../../types/models";
import { useLocalization } from "../../contexts/localization";

const AllCategory: Category = {
  id: "afasfiahsofa",
  name: "ALL",
  amharicDescription: "ሁሉም",
  amharicName: "ሁሉም",
  createdAt: "",
  updatedAt: "",
  description: "",
};

const AddTransactionItemsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [alreadySelected, setAlreadySelected] = useState<any[]>([]);
  const { theme } = useAppTheme();
  const { t } = useLocalization();

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
    useState<Category>(AllCategory);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);


  const { loading, error, refetch } = useQuery(
    GET_RETAIL_SHOP_PRODUCTS_SIMPLE,
    {
      variables: {
        filterRetailShopStockInput: {
          retailShopId: authState?.user.retailShop[0].id,
        },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      onCompleted: async (data,) => {
        if (data.retailShopStockByRetailShopId.items) {
          const alteredItems = data.retailShopStockByRetailShopId.items.map(
            (item: any) => ({ ...item, selectedQuantity: 0 })
          );
          setProducts(alteredItems);
          setFilteredProducts(alteredItems);
        }
      },
      onError: (err) => {
        console.log(err)
      }

    }
  );

  const GET_ALL_QUERY_VARIABLE = {
    filterRetailShopStockInput: {
      retailShopId: authState?.user.retailShop[0].id,
    },
  }

  const GET_CATEGORY_QUERY_VARIABLE = {
    filterRetailShopStockInput: {
      product: {
        category: {
          id: selectedCategory.id,
        },
      },
      retailShopId: authState?.user.retailShop[0].id,
    },
  }

  useEffect(() => {
    if (selectedCategory.id === AllCategory.id) {
      refetch(GET_ALL_QUERY_VARIABLE);
    } else {
      refetch(GET_CATEGORY_QUERY_VARIABLE);
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


  // useEffect(() => {
  //   if (data && data.retailShopStockByRetailShopId.items) {
  //     const alteredItems = data.retailShopStockByRetailShopId.items.map(
  //       (item: any) => ({ ...item, selectedQuantity: 0 })
  //     );
  //     setProducts(alteredItems);
  //     setFilteredProducts(alteredItems);
  //   }
  // }, [data, selectedCategory]);

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
      backgroundColor: theme.colors.primary,
    },
  });
  return (
    <BaseLayout>
      <SearchBarComponent
        placeholder={t("searchHere")}
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
                {/* <SearchBar /> */}
                <FlatList
                  contentContainerStyle={styles.container}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={filteredProducts}
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
            color={theme.colors.white}
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
