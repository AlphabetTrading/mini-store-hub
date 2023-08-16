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
        notificationReads {
          id
          userId
        }
      }
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS = gql`
  query UnreadNotificationsByUserId($userId: String!) {
    unreadNotificationsByUserId(userId: $userId) {
      id
      recipientId
      user {
        id
      }
    }
  }
`;

export const GET_NOTIFICATION_DETAIL = gql`
  query notificationById($notificationById: String!) {
    notificationById(id: $notificationById) {
      amharicBody
      amharicTitle
      body
      createdAt
      id
      isRead
      recipientId
      recipientType
      title
      updatedAt
      notificationReads {
        id
        userId
      }
    }
  }
`;

export const GET_USERS_NOTIFICATIONS = gql`
  query usersNotifications($userId: String!) {
    allNotificationsByUserId(userId: $userId) {
      id
      isRead
      body
      amharicBody
      amharicTitle
      createdAt
      recipientId
      recipientType
      title
      updatedAt
      notificationReads {
        id
        userId
      }
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: String!, $userId: String!) {
    markNotificationAsRead(notificationId: $notificationId, userId: $userId) {
      id
      notificationReads {
        id
        userId
      }
    }
  }
`;
