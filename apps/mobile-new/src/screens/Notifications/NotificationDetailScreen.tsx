import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useGetSingleNotification } from "../../hooks/api/useGetNotificationsData";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useMutation } from "@apollo/client";
import { MARK_NOTIFICATION_AS_READ } from "../../graphql/queries/notificationQueries";
import { useAuth } from "../../contexts/auth";

const NotificationDetailScreen = ({ route }: any) => {
  const { data, loading, error, refetch } = useGetSingleNotification(
    route.params?.notificationID || ""
  );
  const { authState } = useAuth();
  console.log(route, " iwwws data");
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
      data: mutationData,
      error: mutationError,
      loading: mutationLoading,
      reset,
    },
  ] = useMutation(MARK_NOTIFICATION_AS_READ);

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     headerShown: false,
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       headerShown: false,
  //     });
  // }, [navigation]);

  const hasReadNotification = (data: any) => {
    console.log(data, " is the nonoooooooo");
    return (
      data.notificationById.isRead ||
      data.notificationById?.notificationReads.filter(
        (notfi: any) => notfi.userId === authState?.user.id
      ).length > 0
    );
  };

  return (
    <SafeAreaView>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
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
          {!data || !data.notificationById ? (
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
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                width: "100%",
                paddingHorizontal: 10,
              }}
            >
              {!hasReadNotification(data) && (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginBottom: 10,
                    width: 100,
                    borderRadius: 8,
                    backgroundColor: Colors.light,
                  }}
                  onPress={async () => {
                    await markNotificationAsRead({
                      variables: {
                        notificationId: route.params?.notificationID,
                        userId: authState?.user.id || "",
                      },
                    });

                    refetch();
                  }}
                >
                  <Text style={{ padding: 10 }}>
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
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "InterMedium",
                      textTransform: "capitalize",
                      fontSize: 20,
                    }}
                  >
                    {data.notificationById?.title}
                  </Text>
                  <Text style={{ fontFamily: "InterMedium", fontSize: 14 }}>
                    {format(
                      new Date(data.notificationById?.createdAt),
                      "MMM dd yyyy"
                    )}
                  </Text>
                </View>
                <Text style={{ fontFamily: "InterLight", fontSize: 16 }}>
                  {data.notificationById?.body}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
  },
});
