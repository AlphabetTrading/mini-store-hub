import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { SearchBar } from "react-native-screens";
import { AntDesign, Entypo } from "@expo/vector-icons";
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

const selectItem = (props: Props) => {
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);

  const selectItem = (item: any) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                    selectedItems.some((i) => i.id === item.id) && {
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
                    <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
                      Abu Walad
                    </Text>
                    <Text
                      style={{ fontFamily: "InterRegular", color: "#80848A" }}
                    >
                      Quantity: 199
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
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#5684E0",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            margin: 10,
          }}
          onPress={() => {}}
        >
          <AntDesign
            name="check"
            style={{ padding: 20 }}
            size={36}
            color="white"
            onPress={() => {
              //   router.push({
              //     pathname: "/checkout",
              //     params: { items: JSON.stringify(selectedItems) },
              //   })
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default selectItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    backgroundColor: Colors.light.background,
  },
});
