import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "../constants/Colors";

type Props = {};

const DATA = [
  {
    id: "1",
    name: "Egg",
    imageSrc: require("../assets/icons/categories/egg.png"),
  },
  {
    id: "2",
    name: "Milk",
    imageSrc: require("../assets/icons/categories/milk.png"),
  },
  {
    id: "3",
    name: "Biscuit",
    imageSrc: require("../assets/icons/categories/biscuit.png"),
  },
  {
    id: "4",
    name: "Oil",
    imageSrc: require("../assets/icons/categories/oil.png"),
  },
  {
    id: "5",
    name: "Soft",
    imageSrc: require("../assets/icons/categories/soft.png"),
  },
  {
    id: "6",
    name: "Water",
    imageSrc: require("../assets/icons/categories/water.png"),
  },
  {
    id: "7",
    name: "Soft Drink",
    imageSrc: require("../assets/icons/categories/soft_drink.png"),
  },
  {
    id: "8",
    name: "Milk",
    imageSrc: require("../assets/icons/categories/milk.png"),
  },
];

const salesDetail = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Transaction Detail",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
      />
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={{
              marginLeft: 8,
              color: "#828282",
              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            Details
          </Text>
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 6,
              padding: 20,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: "#80848A",
                fontFamily: "InterMedium",
                fontSize: 14,
              }}
            >
              No. #XX1034
            </Text>
            <Text
              style={{
                color: "#2B2C2E",
                fontFamily: "InterMedium",
                fontSize: 20,
              }}
            >
              2,335.00 ETB
            </Text>
            <Text
              style={{
                color: "#80848A",
                fontFamily: "InterMedium",
                fontSize: 14,
              }}
            >
              Jul 07, 2023 12:04:25
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 8,
              marginVertical: 20,
              color: "#828282",
              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            Items
          </Text>
          {DATA.map((data: any, index: number) => {
            return (
              <View
                key={data.id}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#FFF",
                  width: "100%",
                  padding: 20,
                  paddingVertical: 15,
                  alignItems: "center",
                  gap: 16,
                  marginVertical: 2,
                  borderRadius: 6,
                }}
              >
                <View style={{ flex: 1, gap: 5 }}>
                  <Text style={{ fontSize: 18, fontFamily: "InterSemiBold" }}>
                    Abu Walad
                  </Text>
                  <Text
                    style={{ fontFamily: "InterLight", color: "#80848A" }}
                  >
                    Quantity: 199
                  </Text>
                </View>
                <Text
                  style={{
                    width: 80,
                    fontSize: 18,
                    fontFamily: "InterBold",
                    alignSelf: "flex-end",
                    color: "#626262",
                  }}
                >
                  ETB 35
                </Text>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#5684E033",
              padding: 20,
              borderRadius: 6,
              marginTop: 20,
            }}
          >
            <Text style={styles.totalStyle}>Total</Text>
            <Text style={styles.totalStyle}>ETB 2335</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default salesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
    gap: 12,
  },
  totalStyle: {
    color: "#5684E0",
    fontFamily: "InterBold",
    fontSize: 20,
  },
});
