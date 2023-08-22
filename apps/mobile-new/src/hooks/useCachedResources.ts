import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  const loadResourcesAndDataAsync = useCallback(async () => {
    try {
      SplashScreen.preventAutoHideAsync();

      // Load fonts
      await Font.loadAsync({
        InterThin: require("../../assets/fonts/Inter-Thin.ttf"),
        InterExtraLight: require("../../assets/fonts/Inter-ExtraLight.ttf"),
        InterLight: require("../../assets/fonts/Inter-Light.ttf"),
        InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
        InterMedium: require("../../assets/fonts/Inter-Medium.ttf"),
        InterSemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
        InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
        InterExtraBold: require("../../assets/fonts/Inter-ExtraBold.ttf"),
        InterBlack: require("../../assets/fonts/Inter-Black.ttf"),
        ...FontAwesome.font,
      });
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      SplashScreen.hideAsync();
    }
  }, []);
  useEffect(() => {
    loadResourcesAndDataAsync();
  }, [loadResourcesAndDataAsync]);

  return isLoadingComplete;
}
