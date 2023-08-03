import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import SearchBar from "../../components/SearchBar";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_CATEGORY } from "../../graphql/queries/categoryQueries";
import { GET_RETAIL_SHOP_PRODUCTS } from "../../graphql/queries/retailShopQuery";
import { useAuth } from "../../contexts/auth";
import { BaseLayout } from "../../components/BaseLayout";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const DATA = [
  {
    id: "1",
    name: "Egg",
    imageSrc: require("../../../assets/icons/categories/egg.png"),
  },
  {
    id: "2",
    name: "Milk",
    imageSrc: require("../../../assets/icons/categories/milk.png"),
  },
  {
    id: "3",
    name: "Biscuit",
    imageSrc: require("../../../assets/icons/categories/biscuit.png"),
  },
  {
    id: "4",
    name: "Oil",
    imageSrc: require("../../../assets/icons/categories/oil.png"),
  },
  {
    id: "5",
    name: "Soft",
    imageSrc: require("../../../assets/icons/categories/soft.png"),
  },
  {
    id: "6",
    name: "Water",
    imageSrc: require("../../../assets/icons/categories/water.png"),
  },
  {
    id: "7",
    name: "Soft Drink",
    imageSrc: require("../../../assets/icons/categories/soft_drink.png"),
  },
  {
    id: "8",
    name: "Milk",
    imageSrc: require("../../../assets/icons/categories/milk.png"),
  },
  {
    id: "9",
    name: "Water",
    imageSrc: require("../../../assets/icons/categories/water.png"),
  },
  {
    id: "10",
    name: "Soft Drink",
    imageSrc: require("../../../assets/icons/categories/soft_drink.png"),
  },
  {
    id: "11",
    name: "Milk",
    imageSrc: require("../../../assets/icons/categories/milk.png"),
  },
];

const CategoryDetailScreen = ({
  route,
}: {
  route: { params: { categoryID: string; categoryName: string } };
}) => {
  const navigation = useNavigation();
  const categoryID = route.params.categoryID;
  const { authState } = useAuth();
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
  });

  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {data.retailShopStockByRetailShopId.items.length > 0 ? (
            <View
              style={{
                backgroundColor: Colors.light.background,
                width: "100%",
              }}
            >
              <SearchBar />
              <FlatList
                data={data.retailShopStockByRetailShopId.items}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.light.background,
                      marginVertical: 4,
                    }}
                    onPress={() =>
                      navigation.navigate("Root", {
                        screen: "InventoryRoot",
                        params: {
                          screen: "ItemDetailScreen",
                          params: {
                            itemID: item.product.id,
                            itemName: item.product.name,
                          },
                        },
                      })
                    }
                  >
                    <Text>{JSON.stringify(item)}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#FFF",
                        width: "100%",
                        padding: 10,
                        paddingVertical: 15,
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 100,
                          backgroundColor: "#F0F0F0",
                          width: 60,
                          height: 60,
                        }}
                      ></View>
                      {/* <Image style={{ borderRadius: 100 }} source={item.imageSrc} /> */}
                      <View style={{ flex: 1, gap: 5 }}>
                        <Text
                          style={{ fontSize: 18, fontFamily: "InterMedium" }}
                        >
                          {item.product.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "InterRegular",
                            color: "#80848A",
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
                          color: "#626262",
                        }}
                      >
                        ETB 35
                      </Text>
                    </View>
                  </TouchableOpacity>
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
              <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
                No Items Found
              </Text>
            </View>
          )}
        </View>
      )}
    </BaseLayout>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    backgroundColor: Colors.light.background,
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
    color: "#777777",
    fontSize: 11,
    fontFamily: "InterLight",
  },
});
