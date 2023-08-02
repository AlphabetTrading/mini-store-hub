import { gql } from "@apollo/client";

export const ACCEPT_NOTIFICATION_MUTATION = gql`
  mutation AcceptNotification(
    $notificationInput: CreateNotificationTokenInput!
  ) {
    acceptNotification(notificationInput: $notificationInput) {
      id
      token
      device_type
    }
  }
`;

export const REMOVE_NOTIFICATION_MUTATION = gql`
  mutation RemoveNotificationToken($token: String!) {
    removeNotificationToken(data: $token) {
      id
    }
  }
`;
