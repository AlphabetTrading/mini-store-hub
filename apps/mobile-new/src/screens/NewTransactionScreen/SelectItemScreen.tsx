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
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorageUtils from "../../utils/async_storage";
import { useAppTheme } from "@/src/contexts/preference";
type Props = {};

const SelectItem = () => {
  const route = useRoute<any>();
  const { categoryID } = route.params;
  const navigation = useNavigation();
  const [alreadySelected, setAlreadySelected] = useState<any[]>([]);
  const { theme } = useAppTheme();
  const fetchCheckout = useCallback(async () => {
    // const prevCheckout = await SecureStore.getItemAsync("checkout");
    const items = await AsyncStorageUtils.getItem("checkout");
    setAlreadySelected(items);
  }, [route]);

  useEffect(() => {
    fetchCheckout();
  }, [fetchCheckout]);

  const { authState } = useAuth();
  const { loading, data, error, refetch } = useQuery(
    GET_RETAIL_SHOP_PRODUCTS_SIMPLE,
    {
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
    }
  );

  const selectItem = (stockItem: any) => {
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
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          horizontal={true}
          style={{ width: "100%" }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              width: "100%",
            }}
          >
            {data.retailShopStockByRetailShopId.items.length > 0 ? (
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  width: "100%",
                }}
              >
                <SearchBar />
                <FlatList
                  data={data.retailShopStockByRetailShopId.items}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.colors.background,
                        marginVertical: 4,
                      }}
                      onPress={() => {
                        selectItem(item);
                      }}
                    >
                      <View
                        style={[
                          {
                            flexDirection: "row",
                            backgroundColor: "#FFF",
                            width: "100%",
                            padding: 10,
                            paddingVertical: 15,
                            alignItems: "center",
                            gap: 16,
                          },
                          alreadySelected.some((i) => i.id === item.id) && {
                            borderWidth: 0.5,
                            borderColor: "#3CC949",
                          },
                        ]}
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
            onPress={async () => {
              // await SecureStore.setItemAsync(
              //   "checkout",
              //   JSON.stringify(alreadySelected)
              // );
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
          </TouchableOpacity>
        </ScrollView>
      )}
    </BaseLayout>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    backgroundColor: Colors.light.background,
  },
});
