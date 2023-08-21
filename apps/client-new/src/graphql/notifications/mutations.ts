import { gql } from "@apollo/client";
import { UserRole } from "../../../types/user";
import { RecipientType } from "../../../types/notification";

export interface SendNotificationVars {
  data: {
    body: string;
    recipientId?: string;
    recipientType: RecipientType;
    title: string;
  };
}

export const SEND_NOTIFICATION = gql`
  mutation SendPushNotification($data: sendPushNotificationInput!) {
    sendPushNotification(data: $data) {
      id
    }
  }
`;

export interface MarkNotificationAsReadVars {
  notificationId: string;
  userId: string;
}

export interface MarkNotificationAsReadData {
  markNotificationAsRead: {
    id: string;
    isRead:boolean;
    notificationReads :{
      userId:string
    }[]
  };
}

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: String!, $userId: String!) {
    markNotificationAsRead(notificationId: $notificationId, userId: $userId) {
      id
      isRead
      notificationReads {
        userId
      }
    }
  }
`;
