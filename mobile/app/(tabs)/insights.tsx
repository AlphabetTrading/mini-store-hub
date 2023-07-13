import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "../../constants/Colors";

type Props = {};

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
    </SafeAreaView>
  );
};

export default insights;

const styles = StyleSheet.create({});
