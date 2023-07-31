import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Stack, router } from "expo-router";
import Colors from "@/constants/Colors";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";

type Props = {};

const DATA = [
  {
    id: "1",
    name: "Egg",
    imageSrc: require("@/assets/icons/categories/egg.png"),
  },
  {
    id: "2",
    name: "Milk",
    imageSrc: require("@/assets/icons/categories/milk.png"),
  },
  {
    id: "3",
    name: "Biscuit",
    imageSrc: require("@/assets/icons/categories/biscuit.png"),
  },
  {
    id: "4",
    name: "Oil",
    imageSrc: require("@/assets/icons/categories/oil.png"),
  },
  {
    id: "5",
    name: "Soft",
    imageSrc: require("@/assets/icons/categories/soft.png"),
  },
  {
    id: "6",
    name: "Water",
    imageSrc: require("@/assets/icons/categories/water.png"),
  },
  {
    id: "7",
    name: "Soft Drink",
    imageSrc: require("@/assets/icons/categories/soft_drink.png"),
  },
  {
    id: "8",
    name: "Milk",
    imageSrc: require("@/assets/icons/categories/milk.png"),
  },
];

const inventory = (props: Props) => {
  const { data, error, loading, refetch } = useQuery(GET_CATEGORIES);
  console.log(data, error, "Categories");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <Text
              style={{
                marginLeft: 8,
                color: "#828282",
                fontFamily: "Inter-Bold",
                textTransform: "uppercase",
              }}
            >
              Categories
            </Text>
            <View
              style={{
                backgroundColor: Colors.light.background,
                width: "100%",
              }}
            >
              <FlatList
                data={data.categories.items}
                renderItem={({ item, index }) => (
                  <Link
                    style={{
                      backgroundColor: Colors.light.background,
                      width: "100%",
                      height: "100%",
                      flex: 1,
                      alignItems: "center",
                      margin: 8,
                      gap: 4,
                    }}
                    href={{
                      pathname: "/inventory/[id]",
                      params: { id: item.id, name: item.name },
                    }}
                  >
                    <View style={styles.categoryItem} key={index}>
                      <Image
                        style={styles.categoryImage}
                        source={require("@/assets/icons/categories/milk.png")}
                      />
                    </View>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </Link>
                )}
                keyExtractor={(item) => item.id}
                numColumns={4}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
    fontFamily: "Inter-Light",
  },
});
