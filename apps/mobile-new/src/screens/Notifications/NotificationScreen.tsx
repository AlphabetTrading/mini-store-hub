import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useAuth } from "../../contexts/auth";
import { useGetUsersNotifications } from "../../hooks/api/useGetNotificationsData";

type Props = {};

interface Notification {
  id: string;
  title: string;
  description: string;
  status: string;
}

const NotificationScreen = (props: Props) => {
  const navigation = useNavigation();
  const { authState } = useAuth();
  const { data, loading, error, refetch } = useGetUsersNotifications(
    authState?.user?.id || ""
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View
          style={{
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
            There is an error, please refresh the page
          </Text>
        </View>
      ) : data.allNotificationsByUserId.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data.allNotificationsByUserId}
          key={data.allNotificationsByUserId.length}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ width: "100%" }}
          renderItem={({ item, index }) => {
            const hasReadNotification =
              item.isRead ||
              item?.notificationReads.filter(
                (notfi: any) => notfi.userId === authState?.user.id
              ).length > 0;
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "100%",
                  backgroundColor: !hasReadNotification ? "#EFEFEF80" : "#FFF",
                }}
                onPress={() => {
                  navigation.navigate("Notifications", {
                    screen: "NotificationDetailScreen",
                    params: {
                      notificationID: item.id,
                    },
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <View style={{ gap: 10 }}>
                    <Text style={{ fontFamily: "InterMedium", fontSize: 16 }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "InterLight",
                        fontSize: 12,
                        paddingRight: 10,
                      }}
                    >
                      {item.body}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor:
                        item.recipientType === "USER"
                          ? "#00FF00"
                          : item.recipientType === "RETAIL_SHOP"
                          ? "#00FFFF"
                          : "#FF0000",
                      borderRadius: 3,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontFamily: "InterLight",
                    fontSize: 12,
                    color: "#000",
                  }}
                ></Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
            No Items Found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    backgroundColor: Colors.light.background,
  },
});
