import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";

import { useAppTheme } from "../contexts/preference";
import OfflineBanner from "./OfflineBanner";
export const BaseLayout = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle;
}) => {
  const { theme } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
  return (
    <SafeAreaView style={[styles.container, style]}>
      <OfflineBanner />
      {children}
    </SafeAreaView>
  );
};
