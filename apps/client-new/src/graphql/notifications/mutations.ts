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
