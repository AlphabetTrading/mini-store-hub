import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  Platform,
  StatusBar,
} from "react-native";

import Loading from "./Loading";
import { useLoading } from "../contexts/loading";
import Colors from "../constants/Colors";

export const BaseLayout = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
