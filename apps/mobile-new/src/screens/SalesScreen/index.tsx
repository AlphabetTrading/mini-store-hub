import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

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
];

const SalesScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.light.background,
            width: "100%",
          }}
        >
          <FlatList
            data={DATA}
            ListHeaderComponent={
              <Text
                style={{
                  marginLeft: 8,
                  color: "#828282",
                  textTransform: "uppercase",
                }}
              >
                Sales
              </Text>
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFF",
                  marginVertical: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: 16,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                }}
                onPress={() => {}}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "InterSemiBold",
                      fontSize: 18,
                      color: "#4F4F4F",
                    }}
                  >
                    Jul 07, 2023
                  </Text>
                  <Text
                    style={{
                      fontFamily: "InterRegular",
                      fontSize: 14,
                      color: "#80848A",
                    }}
                  >
                    11:51:26
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "InterSemiBold",
                        fontSize: 18,
                        color: "#4F4F4F",
                      }}
                    >
                      ETB 1165
                    </Text>
                    <Text
                      style={{
                        fontFamily: "InterRegular",
                        fontSize: 14,
                        color: "#80848A",
                        textAlign: "right",
                      }}
                    >
                      6 Items
                    </Text>
                  </View>
                  <Entypo name="chevron-right" size={24} color="#4F4F4F" />
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

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
