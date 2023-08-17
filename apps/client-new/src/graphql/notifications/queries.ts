import { gql } from "@apollo/client";
import { Notification } from "../../../types/notification";

export const NOTIFICATIONS = gql`
  query Query($userId: String!) {
    allNotificationsByUserId(userId: $userId) {
      id
      body
      title
      isRead
      createdAt
    }
  }
`;

export interface NotificationData{
    getAllNotifications:Notification[]
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
    }
  }
`;
