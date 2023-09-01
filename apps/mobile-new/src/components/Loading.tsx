import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useAppTheme } from "../contexts/preference";

type Props = {};

const Loading = (props: Props) => {
  const { theme } = useAppTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="small"
        animating={true} color={theme.colors.tint} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
