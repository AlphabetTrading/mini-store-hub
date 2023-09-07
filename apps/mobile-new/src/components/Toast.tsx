import { ToastAndroid, Platform } from "react-native";

export function notifyMessage(msg: string, isShort: boolean = false) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, isShort ? ToastAndroid.SHORT : ToastAndroid.LONG);
  } else {
  }
}
