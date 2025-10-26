"use client";

import { useNotificationSubscription } from "@/hooks/useNotificationSubscription";
import { useEffect, useState } from "react";

export function NotificationListener() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only activate subscription after client-side mount
  const { notification, error } = useNotificationSubscription();

  useEffect(() => {
    // Request notification permission on mount
    if (
      isMounted &&
      typeof window !== "undefined" &&
      "Notification" in window
    ) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (error) {
      console.error("Notification subscription error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (notification) {
      console.log("Received notification:", notification);
    }
  }, [notification]);

  // This component doesn't render anything
  return null;
}
