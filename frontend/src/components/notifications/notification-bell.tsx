"use client";

import { gql, useQuery } from "@apollo/client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const GET_UNREAD_COUNT = gql`
  query GetUnreadNotificationCount {
    unreadNotificationCount
  }
`;

export function NotificationBell() {
  const { data, refetch } = useQuery(GET_UNREAD_COUNT, {
    pollInterval: 30000, // Poll every 30 seconds
  });

  const unreadCount = data?.unreadNotificationCount || 0;

  // Refetch when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Link
      href="/notifications"
      className="relative inline-flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
      title="Notifications"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
