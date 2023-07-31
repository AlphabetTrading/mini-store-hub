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
  const { loading } = useLoading();

  return (
    <SafeAreaView style={[styles.container, style]}>
      {/* <StatusBar barStyle={"dark-content"} /> */}
      {loading ? <Loading /> : children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
