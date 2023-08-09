import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { StatusBar } from "expo-status-bar";
import DashboardComponents from "../../components/HomePage/DashboardComponents";
export default function HomeScreen() {
  const filters = [
    { id: 1, name: "daily" },
    { id: 2, name: "weekly" },
    { id: 3, name: "monthly" },
  ];
  const [selectedFilter, setSelectedFilter] = useState("daily");

  console.log("Home");
  return (
    <BaseLayout
      style={{
        position: "relative",
      }}
    >
      <StatusBar style="light" />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            borderColor: "#D4D4D4",
            borderWidth: 0.5,
          }}
        >
          {filters.map(
            (filter: { id: number; name: string }, index: number) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    setSelectedFilter(filter.name);
                  }}
                >
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      borderWidth: 0.5,
                      borderColor: "#D4D4D4",
                      paddingVertical: 8,
                      backgroundColor:
                        selectedFilter === filter.name ? "#5684E033" : "#fff",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        color:
                          selectedFilter === filter.name
                            ? "#5684E0"
                            : "#6D6D6D",
                        fontFamily:
                          selectedFilter === filter.name
                            ? "InterSemiBold"
                            : "InterRegular",
                      }}
                    >
                      {filter.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }
          )}
        </View>
        <DashboardComponents selectedFilter={selectedFilter} />
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
