"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  GET_NOTIFICATIONS,
  MARK_AS_READ,
  MARK_ALL_AS_READ,
} from "@/graphql/notifications.operations";
import { NotificationEdge } from "@/graphql/generated/operations";

export interface NotificationsData {
  notifications: {
    edges: NotificationEdge[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
  unreadNotificationCount: number;
}

interface UseNotificationsOptions {
  pageSize?: number;
  unreadOnly?: boolean;
  skip?: boolean;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { pageSize = 50, unreadOnly = false, skip = false } = options;
  const [cursor, setCursor] = useState<string | null>(null);

  const { data, loading, error, refetch, fetchMore } =
    useQuery<NotificationsData>(GET_NOTIFICATIONS, {
      variables: {
        first: pageSize,
        unreadOnly,
        ...(cursor && { after: cursor }),
      },
      skip,
      fetchPolicy: "cache-and-network",
    });

  const [markAsReadMutation, { loading: markingAsRead }] = useMutation(
    MARK_AS_READ,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (err) => {
        toast.error("Failed to mark notification as read");
        console.error("Mark as read error:", err);
      },
    },
  );

  const [markAllAsReadMutation, { loading: markingAllAsRead }] = useMutation(
    MARK_ALL_AS_READ,
    {
      onCompleted: () => {
        toast.success("All notifications marked as read");
        refetch();
      },
      onError: (err) => {
        toast.error("Failed to mark all notifications as read");
        console.error("Mark all as read error:", err);
      },
    },
  );

  const notifications = data?.notifications?.edges || [];
  const pageInfo = data?.notifications?.pageInfo;
  const unreadCount = data?.unreadNotificationCount || 0;
  const hasNextPage = pageInfo?.hasNextPage || false;
  const hasPreviousPage = pageInfo?.hasPreviousPage || false;

  const markAsRead = async (id: string) => {
    try {
      await markAsReadMutation({ variables: { id } });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation();
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const loadMore = async () => {
    if (!hasNextPage || loading) return;

    try {
      await fetchMore({
        variables: {
          after: pageInfo?.endCursor,
        },
      });
    } catch (err) {
      toast.error("Failed to load more notifications");
      console.error("Load more error:", err);
    }
  };

  const refresh = () => {
    setCursor(null);
    refetch();
  };

  return {
    notifications,
    unreadCount,
    loading,
    error: error?.message,
    markingAsRead,
    markingAllAsRead,
    hasNextPage,
    hasPreviousPage,
    markAsRead,
    markAllAsRead,
    loadMore,
    refresh,
  };
}

export function getNotificationIcon(type: string): string {
  switch (type) {
    case "DRUG_REMINDER":
      return "💊";
    case "DRUG_MISSED":
      return "⚠️";
    case "DRUG_UPCOMING":
      return "🔔";
    case "SYSTEM":
      return "ℹ️";
    default:
      return "📬";
  }
}

export function getNotificationTypeLabel(type: string): string {
  switch (type) {
    case "DRUG_REMINDER":
      return "Medication Reminder";
    case "DRUG_MISSED":
      return "Missed Medication";
    case "DRUG_UPCOMING":
      return "Upcoming Medication";
    case "SYSTEM":
      return "System Notification";
    default:
      return "Notification";
  }
}
