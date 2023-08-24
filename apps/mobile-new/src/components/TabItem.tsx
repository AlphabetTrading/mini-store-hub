import { StyleSheet, View, Text } from "react-native";
import React from "react";

type Props = {
  svg: any;
  color: string;
  focused: boolean;
  name?: string;
};

const TabItem = ({ color, focused, name, svg }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {svg}
      {name && (
        <Text
          style={{
            width: "90%",
            textAlign: "center",
            fontSize: 12,
            color: color,
          }}
        >
          {name}
        </Text>
      )}
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({});
