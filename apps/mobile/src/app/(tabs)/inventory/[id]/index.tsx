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
import SearchBar from "@/components/common/SearchBar";

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

const categoryDetail = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Biscuit",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.light.background,
            width: "100%",
          }}
        >
          <SearchBar />
          <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.light.background,
                  marginVertical: 4,
                }}
                onPress={() => {}}
              >
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
                    <Text style={{ fontSize: 18, fontFamily: "Inter-Medium" }}>
                      Abu Walad
                    </Text>
                    <Text
                      style={{ fontFamily: "Inter-Regular", color: "#80848A" }}
                    >
                      Quantity: 199
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: 80,
                      fontSize: 18,
                      fontFamily: "Inter-Medium",
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
      </View>
    </SafeAreaView>
  );
};

export default categoryDetail;

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
