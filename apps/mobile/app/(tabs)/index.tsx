import { Button, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from "constants/Colors";

export default function HomeScreen() {
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
