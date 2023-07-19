import { View, Text } from "../../components/Themed";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from "../../constants/Colors";
import { Svg, Path } from "react-native-svg";
import FloatingAddButton from "../../components/FloatingAddButton";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

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
