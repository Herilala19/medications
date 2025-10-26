"use client";

import { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { toast } from "sonner";
import { NOTIFICATION_SUBSCRIPTION } from "@/graphql/notifications.operations";

export interface NotificationData {
  id: string;
  type: string;
  title: string;
  message: string;
  scheduledFor: string;
  read: boolean;
  status: string;
  createdAt: string;
  drugSchedule?: {
    id: string;
    time: string;
    dosage: string;
  };
}

export function useNotificationSubscription() {
  const shouldSkip =
    typeof window === "undefined" ||
    typeof localStorage === "undefined" ||
    !localStorage.getItem("auth-token");

  const { data, loading, error } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    shouldResubscribe: true,
    skip: shouldSkip,
    onError: (err) => {
      console.error("Notification subscription error:", err);
    },
  });

  useEffect(() => {
    if (data?.notificationCreated) {
      const notification: NotificationData = data.notificationCreated;

      // Show toast notification
      toast(notification.title, {
        description: notification.message,
        duration: 5000,
        action: notification.drugSchedule
          ? {
              label: "View",
              onClick: () => {
                // Navigate to drug schedule or mark as taken
                console.log(
                  "View drug schedule:",
                  notification.drugSchedule?.id,
                );
              },
            }
          : undefined,
      });

      // Play notification sound (optional)
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/icon.png",
            badge: "/badge.png",
          });
        }
      }
    }
  }, [data]);

  return {
    notification: data?.notificationCreated as NotificationData | undefined,
    loading,
    error,
  };
}
