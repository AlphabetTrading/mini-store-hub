import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Stack,
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
  useSearchParams,
} from "expo-router";
import { Path, Svg } from "react-native-svg";
import Colors from "constants/Colors";

type Props = {};

const DATA = [
  {
    id: "1",
    name: "Egg",
    imageSrc: require("assets/icons/categories/egg.png"),
  },
  {
    id: "2",
    name: "Milk",
    imageSrc: require("assets/icons/categories/milk.png"),
  },
  {
    id: "3",
    name: "Biscuit",
    imageSrc: require("assets/icons/categories/biscuit.png"),
  },
];

const itemDetail = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Abu Walad",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            marginLeft: 8,
            color: "#828282",
            fontFamily: "InterBold",
            textTransform: "uppercase",
          }}
        >
          Detail
        </Text>
        <View
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: 20,
            gap: 10,
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              width: "100%",
              color: "#80848A",
              fontFamily: "InterRegular",
              fontSize: 14,
            }}
          >
            No. #XX1034
          </Text>
          <Text
            style={{
              width: "100%",
              color: "#2B2C2E",
              fontFamily: "InterSemiBold",
              fontSize: 18,
            }}
          >
            35.00 ETB
          </Text>
          <Text
            style={{
              width: "100%",
              color: "#80848A",
              fontFamily: "InterRegular",
              fontSize: 14,
            }}
          >
            Quantity: 100
          </Text>
        </View>
        <Text
          style={{
            marginLeft: 8,
            color: "#828282",
            fontFamily: "InterBold",
            textTransform: "uppercase",
          }}
        >
          Price History
        </Text>
        <View
          style={{
            backgroundColor: Colors.light.background,
            width: "100%",
          }}
        >
          <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: "#FFF",
                  marginVertical: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      width: 120,
                      color: "#80848A",
                      fontFamily: "InterRegular",
                      fontSize: 16,
                    }}
                  >
                    02 Apr, 2022
                  </Text>
                  <View
                    style={{
                      alignItems: "flex-end",
                      width: 100,
                    }}
                  >
                    <Svg width="24" height="30" viewBox="0 0 24 30" fill="none">
                      <Path
                        d="M6.25 18.7501V15.8645L10 12.5001L11.875 14.3751L13.75 8.12512L17.5 12.5001L19.9999 10.0001L18.1249 8.12512H23.1249V13.1251L21.25 11.2501L17.5 15.0001L14.375 11.2501L12.5 17.5001L10 15.0001L6.25 18.7501Z"
                        fill="#3CC949"
                      />
                      <Path
                        d="M23.125 21.875H21.25V13.75L23.125 15.625V21.875ZM19.375 21.875H17.5V17.5L19.375 15.625V21.875ZM15.625 21.875H13.75V18.125L14.6875 14.375L15.625 15.625V21.875ZM11.875 21.875H10V17.5L11.875 19.375V21.875ZM8.125 21.875H6.25V21.25L8.125 19.375V21.875Z"
                        fill="#3CC949"
                      />
                    </Svg>
                    <Text
                      style={{
                        color: "#2B2C2E",
                        width: "100%",
                        textAlign: "right",
                        fontFamily: "InterMedium",
                        fontSize: 18,
                      }}
                    >
                      ETB 35.00
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default itemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
    gap: 5,
  },
});
