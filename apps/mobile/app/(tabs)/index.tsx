import { View, Text } from "../../components/Themed";
import EditScreenInfo from "../../components/EditScreenInfo";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from "../../constants/Colors";
import { Svg, Path } from "react-native-svg";
import FloatingAddButton from "../../components/FloatingAddButton";

export default function TabOneScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
        position: "relative",
      }}
    >
      {/* <FloatingAddButton /> */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
