import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Colors from "constants/Colors";

type Props = {};

const insightDetail = (props: Props) => {
  const params = useLocalSearchParams<{
    title: string;
    data: string;
  }>();
  // const { title, data } = params;

  // const insightData = JSON.parse(data || "") as {
  //   id: string;
  //   name: string;
  //   imageSrc: string;
  // }[];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          // title: title,
          headerTintColor: "#FFF",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* {insightData.map((item: any, index: number) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#FFF",
                  padding: 20,
                  marginVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontFamily: "InterMedium", fontSize: 16 }}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={{ fontSize: 16, fontFamily: "InterMedium" }}>
                  120kg
                </Text>
              </View>
            );
          })} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default insightDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
