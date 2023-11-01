import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useGetSingleNotification } from "../../hooks/api/useGetNotificationsData";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useMutation } from "@apollo/client";
import { GET_UNREAD_NOTIFICATIONS_COUNT, MARK_NOTIFICATION_AS_READ } from "../../graphql/queries/notificationQueries";
import { useAuth } from "../../contexts/auth";
import { useLocalization } from "../../contexts/localization";
import { useAppTheme } from "../../contexts/preference";
import { ActivityIndicator } from "react-native-paper";
import { notifyMessage } from "../../components/Toast";

const NotificationDetailScreen = ({ route, navigation }: any) => {
  const { authState } = useAuth();
  const { data, loading, error, refetch } = useGetSingleNotification(
    route.params?.notificationID,
    authState?.user.id ?? "",
  );
  const { t, locale } = useLocalization();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [
    markNotificationAsRead,
    {
      loading: mutationLoading,
      reset,
    },
  ] = useMutation(MARK_NOTIFICATION_AS_READ, {
    onError: (err) => {
      notifyMessage("Error marking notification as read")
    },
    refetchQueries: [
      {
        query: GET_UNREAD_NOTIFICATIONS_COUNT,
        variables: {
          userId: authState?.user.id ?? "",
        },
      },
    ],
  });

  useEffect(() => {
    // navigation.getParent()?.setOptions({
    //   headerShown: false,
    // });
    // return () =>
    //   navigation.getParent()?.setOptions({
    //     headerShown: false,
    //   });
    if (data)
      navigation.setOptions({
        title: locale.includes("en")
          ? data.getUsersNotificationDetailByUserIdAndNotificationId?.title
          : data.getUsersNotificationDetailByUserIdAndNotificationId?.amharicTitle ?? data.getUsersNotificationDetailByUserIdAndNotificationId?.title,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          maxWidth: 200,
          overflow: "hidden",
        },
      });
  }, [navigation, data]);

  const hasReadNotification = (data: any) => {
    return (
      data.getUsersNotificationDetailByUserIdAndNotificationId.isRead ||
      data.getUsersNotificationDetailByUserIdAndNotificationId?.notificationReads.filter(
        (notfi: any) => notfi.userId === authState?.user.id
      ).length > 0
    );
  };

  const { theme } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      // padding: 15,
    },
  });


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.background,

    }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          horizontal={true}
          style={{ width: "100%" }}
        >
          {!data || !data.getUsersNotificationDetailByUserIdAndNotificationId ? (
            <View
              style={{
                marginVertical: 30,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "InterMedium", color: theme.colors.text }}>
                There is an error, please refresh the page
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                // justifyContent: "center",
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              {!data.getUsersNotificationDetailByUserIdAndNotificationId.isRead && (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginBottom: 10,
                    width: 100,
                    borderRadius: 8,
                    backgroundColor: theme.colors.accent,
                  }}
                  onPress={async () => {
                    await markNotificationAsRead({
                      variables: {
                        notificationId: route.params?.notificationID,
                        userId: authState?.user.id ?? "",
                      },
                    });

                    refetch();
                  }}
                >
                  <Text style={{
                    padding: 10,
                    color: theme.colors.text
                  }}>
                    {mutationLoading ? "Loading..." : "Mark as Read"}
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderColor: "#5684E0",
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "InterMedium",
                      textTransform: "capitalize",
                      fontSize: 20,
                      flex: 3,
                      color: theme.colors.text
                    }}
                  >
                    {locale.includes("en")
                      ? data.getUsersNotificationDetailByUserIdAndNotificationId?.title
                      : data.getUsersNotificationDetailByUserIdAndNotificationId?.amharicTitle ??
                      data.getUsersNotificationDetailByUserIdAndNotificationId?.title}
                  </Text>
                  <View style={{
                    flex: 1,
                  }}>
                    <Text style={{
                      fontFamily: "InterMedium", fontSize: 14, textAlign: "right",
                      color: theme.colors.text
                    }}>
                      {format(
                        new Date(data.getUsersNotificationDetailByUserIdAndNotificationId?.createdAt),
                        "MM:HH"
                      )}
                    </Text>
                    <Text style={{
                      fontFamily: "InterMedium", fontSize: 14, textAlign: "right",

                      color: theme.colors.text
                    }}>
                      {format(
                        new Date(data.getUsersNotificationDetailByUserIdAndNotificationId?.createdAt),
                        "MMM dd yyyy"
                      )}
                    </Text>

                  </View>
                </View>
                <Text style={{
                  fontFamily: "InterLight", fontSize: 16,

                  color: theme.colors.text
                }}>
                  {locale.includes("en")
                    ? data.getUsersNotificationDetailByUserIdAndNotificationId?.body
                    : data.getUsersNotificationDetailByUserIdAndNotificationId?.amharicBody ??
                    data.getUsersNotificationDetailByUserIdAndNotificationId?.body}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;

