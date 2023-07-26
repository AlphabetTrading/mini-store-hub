import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

type Props = {};

const new_transaction = (props: Props) => {
  return (
    <Redirect href="/checkout" />
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Stack.Screen
    //     options={{
    //       headerStyle: {
    //         backgroundColor: Colors.light.tint,
    //       },
    //       headerTintColor: "#FFF",
    //     }}
    //   />
    //   <View
    //     style={{
    //       height: 60,
    //       width: 60,
    //       borderRadius: 60,
    //       backgroundColor: "#5684E0",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Pressable
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <AntDesign name="plus" size={45} color="white" />
    //     </Pressable>
    //   </View>
    // </SafeAreaView>
  );
};

export default new_transaction;

const styles = StyleSheet.create({});
