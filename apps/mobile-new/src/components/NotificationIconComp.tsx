import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../contexts/auth";
import {
  useGetUnreadNotificationsCount,
  useGetUsersNotifications,
} from "../hooks/api/useGetNotificationsData";

const NotificationIconComp = () => {
  const { authState } = useAuth();
  const { data, loading, error, refetch } = useGetUnreadNotificationsCount(
    authState?.user?.id || ""
  );

  const navigation = useNavigation();
  return (
    <View>
      <View>
        <AntDesign
          name="bells"
          color="#FFF"
          size={24}
          onPress={() => navigation.navigate("Notifications")}
        />

        {data && data?.unreadNotificationsByUserId.length > 0 ? (
          <View
            style={{
              position: "absolute",
              bottom: -5,
              right: -5,
              backgroundColor: "#FF0000",
              width: 16,
              height: 16,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 10 }}>
              {data?.unreadNotificationsByUserId?.length}
            </Text>
          </View>
        ) : null}
        {/* <View
          style={{
            position: "absolute",
            bottom: -5,
            right: -5,
            backgroundColor: "#FF0000",
            width: 16,
            height: 16,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 8 }}>12</Text>
        </View> */}
      </View>
    </View>
  );
};

export default NotificationIconComp;

const styles = StyleSheet.create({});
