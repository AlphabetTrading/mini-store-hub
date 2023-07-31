import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query AllUsersNotifications(
    $filterNotificationInput: FilterNotificationInput
  ) {
    allUsersNotifications(filterNotificationInput: $filterNotificationInput) {
      items {
        amharicBody
        amharicTitle
        body
        createdAt
        id
        status
        title
        updatedAt
      }
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS = gql`
  query UnreadNotifications($userId: String!) {
    unreadNotifications(userId: $userId) {
      amharicBody
      amharicTitle
      body
      createdAt
      id
      status
      title
      updatedAt
    }
  }
`;

export const GET_NOTIFICATION_DETAIL = gql`
  query NotificationById($notificationByIdId: String!) {
    notificationById(id: $notificationByIdId) {
      amharicBody
      amharicTitle
      body
      createdAt
      id
      status
      title
      updatedAt
    }
  }
`;
