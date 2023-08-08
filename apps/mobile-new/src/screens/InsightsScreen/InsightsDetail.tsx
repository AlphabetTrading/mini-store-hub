import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const InsightsDetailScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Text style={{ fontFamily: "Inter-Medium", fontSize: 16 }}>
                {index + 1}. {item.name}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "Inter-Medium" }}>
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

export default InsightsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
