import { useQuery } from "@apollo/client";
import {
  GET_NOTIFICATION_DETAIL,
  GET_USERS_NOTIFICATIONS,
} from "../../graphql/queries/notificationQueries";

export const useGetUsersNotifications = (userId: string) => {
  return useQuery(GET_USERS_NOTIFICATIONS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      userId,
    },
  });
};

export const useGetSingleNotification = (notificationId: string) => {
  return useQuery(GET_NOTIFICATION_DETAIL, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      notificationById: notificationId,
    },
  });
};
