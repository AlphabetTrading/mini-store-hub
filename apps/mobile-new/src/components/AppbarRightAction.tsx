import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationIconComp from "./NotificationIconComp";
import CustomMaterialMenu from "./CustomMenu";

const AppbarRightAction = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        columnGap: 12,
      }}
    >
      <NotificationIconComp />
      <CustomMaterialMenu />
    </View>
  );
};

export default AppbarRightAction;

const styles = StyleSheet.create({});
