import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import Colors from "../../constants/Colors";
type Props = {};

const DATA: { id: string; name: string; imageSrc: string }[] = [
  {
    id: "1",
    name: "Egg",
    imageSrc: require("../../assets/icons/categories/egg.png"),
  },
  {
    id: "2",
    name: "Milk",
    imageSrc: require("../../assets/icons/categories/milk.png"),
  },
  {
    id: "3",
    name: "Biscuit",
    imageSrc: require("../../assets/icons/categories/biscuit.png"),
  },
  {
    id: "4",
    name: "Oil",
    imageSrc: require("../../assets/icons/categories/oil.png"),
  },
  {
    id: "5",
    name: "Soft",
    imageSrc: require("../../assets/icons/categories/soft.png"),
  }
];

const insights = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              textTransform: "uppercase",
              color: "#828282",
              marginBottom: 20,
            }}
          >
            Most Sold Items
          </Text>
          {DATA.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                  marginVertical: 2,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "InterMedium" }}>
                  Sugar
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "InterMedium" }}>
                  120Kg
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 30,
            }}
            onPress={() =>
              router.push({
                pathname: "/insightDetail",
                params: {
                  title: "Most Sold Items",
                  data: JSON.stringify(DATA),
                },
              })
            }
          >
            <Text style={{ color: "#5684E0", fontFamily: "InterMedium" }}>
              See More
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textTransform: "uppercase",
              color: "#828282",
              marginBottom: 20,
            }}
          >
            Most Revenue by item
          </Text>
          {DATA.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                  marginVertical: 2,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "InterMedium" }}>
                  Sugar
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "InterMedium" }}>
                  120Kg
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 20,
            }}
            onPress={() =>
              router.push({
                pathname: "/insightDetail",
                params: {
                  title: "Most Revenue by item",
                  data: JSON.stringify(DATA),
                },
              })
            }
          >
            <Text style={{ color: "#5684E0", fontFamily: "InterMedium" }}>
              See More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default insights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
