import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "../../constants/Colors";

type Props = {};

const inventory = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
    </SafeAreaView>
  );
};

export default inventory;

const styles = StyleSheet.create({});
