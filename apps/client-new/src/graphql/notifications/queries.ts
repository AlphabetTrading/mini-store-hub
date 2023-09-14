import { gql } from "@apollo/client";
import { Notification } from "../../../types/notification";

export interface AllNotificationData {
  getAllNotifications: Notification[];
}
export const ALL_NOTIFICATIONS = gql`
  query GetAllNotifications {
    getAllNotifications {
      title
      body
      createdAt
      recipientType
      recipientId
      id
      isRead
      notificationReads {
        userId
      }
    }
  }
`;

export interface NotificationByUserIdVars {
  userId: string;
}
export interface NotificationByUserIdData {
  allNotificationsByUserId: Notification[];
}

export const NOTIFICATIONS_BY_USERID = gql`
  query AllNotificationsByUserId($userId: String!) {
    allNotificationsByUserId(userId: $userId) {
      id
      isRead
      recipientId
      recipientType
      title
      body
      createdAt
      notificationReads {
        userId
      }
    }
  }
`;

export interface UnreadNotificationsCountVars {
  userId: string;
}
export interface UnreadNotificationsCountData {
  unreadNotificationsCountByUserId: number;
}

export const UNREAD_NOTIFICATIONS_COUNT = gql`
  query Query($userId: String!) {
    unreadNotificationsCountByUserId(userId: $userId)
  }
`;
