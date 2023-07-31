import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
