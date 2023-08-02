import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { openSettings } from "expo-linking";

import { useUser } from "./useUser";
import { useAuth } from "../contexts/auth";
import { useNavigation } from "@react-navigation/native";

export const useNotifications = () => {
  const { addPushToken, setAllowsNotifications } = useUser();
  const navigation = useNavigation<any>();
  const { authState } = useAuth();

  const registerForPushNotificationsAsync = async (alertUser?: boolean) => {
    if (Device.isDevice) {
      if (!authState) return;
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        if (alertUser)
          Alert.alert(
            "Error",
            "To enable Push Notifications please change your settings.",
            [
              {
                text: "OK",
              },
              {
                text: "Open Settings",
                onPress: openSettings,
              },
            ]
          );
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await addPushToken(token);
      if (!authState.user.allowsNotifications) setAllowsNotifications(false);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  // This listener is fired whenever a notification is received while the app is foregrounded
  const handleNotification = (notification: Notifications.Notification) => {
    // could be useful if you want to display your own toast message
    // could also make a server call to refresh data in other part of the app
  };

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data: { url?: string } = response.notification.request.content.data;
    // go to the notification url, with screen Name Notifications
    try {
      navigation.navigate("Notifications");
      // Linking.openURL("exp://192.168.42.135:19000/notifications");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};
