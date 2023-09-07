import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { useGetUsersNotifications } from "../../hooks/api/useGetNotificationsData";
import { useAppTheme } from "../../contexts/preference";
import { ActivityIndicator, Button } from "react-native-paper";
import SingleNotificationItem from "../../components/Notifications/SingleNotificationItem";

type Props = {};

const NotificationScreen = (props: Props) => {
  const { authState } = useAuth();
  const { data, loading, error, refetch } = useGetUsersNotifications(
    authState?.user?.id || ""
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const { theme } = useAppTheme();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : !data && error ? (
        <View
          style={{
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
            rowGap: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "InterMedium", color: theme.colors.tint }}>
            There is an error, please refresh the page
          </Text>
          <Button
            style={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint
            }}
            onPress={() => {
              refetch();
            }}
          >
            <Text style={{ color: theme.colors.text }}>Refresh</Text>
          </Button>
        </View>
      ) : data.allNotificationsByUserId.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data.allNotificationsByUserId}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ width: "100%" }}
          renderItem={({ item }) => <SingleNotificationItem item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#EFEFEF" }}></View>}
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


