import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {
    notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {
      edges {
        node {
          id
          type
          title
          message
          scheduledFor
          read
          readAt
          status
          createdAt
          drugSchedule {
            id
            time
            dosage
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    unreadNotificationCount
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($id: String!) {
    markNotificationAsRead(id: $id) {
      id
      read
      readAt
    }
  }
`;

export const MARK_ALL_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription OnNotificationCreated {
    notificationCreated {
      id
      type
      title
      message
      scheduledFor
      read
      status
      createdAt
      drugSchedule {
        id
        time
        dosage
      }
    }
  }
`;
