import { useAuth } from "../contexts/auth";
import { Platform } from "react-native";

export const useUser = () => {
  const { authState, setAuthState, updateNotificationToken } = useAuth();

  const addPushToken = async (token: string) => {
    if (authState) {
      const updatedAuthState = { ...authState };
      const prevAuthState = { ...authState };

      updatedAuthState.user.notification_token = token;
      updatedAuthState.user.allowsNotifications = true;
      setAuthState(updatedAuthState);

      try {
        await updateNotificationToken(
          authState,
          token,
          Platform.OS ? Platform.OS : "unknown"
        );
      } catch (error) {
        console.error(error, "error updating notification token");
        setAuthState(prevAuthState);
      }
    }
  };

  const setAllowsNotifications = async (allowed: boolean) => {
    if (authState) {
      const updatedAuthState = { ...authState };
      const prevAuthState = { ...authState };
      updatedAuthState.user.allowsNotifications = allowed;
      setAuthState(updatedAuthState);

      try {
        // await alterAllowsNotifications(authState.ID, allowed, authState.accessToken);
      } catch (error) {
        console.error(error);
        setAuthState(prevAuthState);
      }
    }
  };

  return {
    addPushToken,
    setAllowsNotifications,
  };
};
