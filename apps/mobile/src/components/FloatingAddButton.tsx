import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

type Props = {};

const FloatingAddButton = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: "#5684E0",
        width: Dimensions.get("window").width * 0.2,
        height: Dimensions.get("window").width * 0.2,
        borderRadius: Dimensions.get("window").width * 0.1,
        position: "absolute",
        left: 0,
        bottom: -Dimensions.get("window").width * 0.1,
        marginHorizontal: "auto",
        zIndex: 10
      }}
    >
      <Pressable
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="plus" size={40} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

export default FloatingAddButton;

const styles = StyleSheet.create({});
