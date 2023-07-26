import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import Colors from "@/constants/Colors";

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
  {
    id: "9",
    name: "Water",
    imageSrc: require("@/assets/icons/categories/water.png"),
  },
  {
    id: "10",
    name: "Soft Drink",
    imageSrc: require("@/assets/icons/categories/soft_drink.png"),
  },
  {
    id: "11",
    name: "Milk",
    imageSrc: require("@/assets/icons/categories/milk.png"),
  },
];

const selectCategory = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Select Category",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
      />
      <View
        style={{
          backgroundColor: Colors.light.background,
          width: "100%",
        }}
      >
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.background,
                width: "100%",
                height: "100%",
                flex: 1,
                alignItems: "center",
                margin: 8,
                gap: 4,
              }}
              onPress={() => {
                router.push({
                  pathname: "/selectItem",
                  params: { id: item.id },
                });
              }}
            >
              <View style={styles.categoryItem} key={index}>
                <Image style={styles.categoryImage} source={item.imageSrc} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={4}
        />
        {/* {DATA.map((item: any, index: number) => {
            return (
              <View style={styles.categoryItem} key={index}>
                <Image
                  style={styles.categoryImage}
                  source={require("../../assets/icons/Group.jpg")}
                />
                <Text style={styles.categoryText}>{item.title}</Text>
              </View>
            );
          })} */}
      </View>
    </SafeAreaView>
  );
};

export default selectCategory;

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
    fontFamily: "Inter-Light",
  },
});
