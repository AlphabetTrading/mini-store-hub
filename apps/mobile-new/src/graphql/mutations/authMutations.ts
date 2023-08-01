import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        id
        firstName
        lastName
        username
        phone
        role
        retailShop {
          id
        }
      }
    }
  }
`;

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
