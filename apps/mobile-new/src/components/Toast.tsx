import { ToastAndroid, Platform } from "react-native";

export function notifyMessage(msg: string, duration: boolean = false) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, duration ? ToastAndroid.SHORT : ToastAndroid.LONG);
  } else {
  }
}
