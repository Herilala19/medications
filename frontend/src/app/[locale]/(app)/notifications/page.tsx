"use client";

import { Bell, Check, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import {
  useNotifications,
  getNotificationIcon,
} from "@/hooks/useNotifications";
import { useAuth } from "@/hooks/useAuth";

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();

  const {
    notifications,
    unreadCount,
    loading,
    error,
    markingAsRead,
    markingAllAsRead,
    hasNextPage,
    markAsRead,
    markAllAsRead,
    loadMore,
  } = useNotifications({
    pageSize: 50,
    unreadOnly: false,
    skip: !isAuthenticated(),
  });

  useEffect(() => {
    document.title = `Notifications | Medication Reminder`;
  }, []);

  if (!isAuthenticated()) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              Please sign in to view notifications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && notifications.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-red-600">Error</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            disabled={markingAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="h-4 w-4" />
            {markingAllAsRead ? "Marking..." : "Mark all as read"}
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No notifications yet</h2>
          <p className="text-muted-foreground">
            You'll see your drug reminders and updates here
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {notifications.map(({ node }) => (
              <div
                key={node.id}
                className={`p-4 rounded-lg border transition-all ${
                  node.read
                    ? "bg-background border-border"
                    : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">
                    {getNotificationIcon(node.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{node.title}</h3>
                        <p className="text-muted-foreground mt-1">
                          {node.message}
                        </p>
                        {node.drugSchedule && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="font-medium">Time:</span>{" "}
                            {node.drugSchedule.time} •{" "}
                            <span className="font-medium">Dosage:</span>{" "}
                            {node.drugSchedule.dosage}
                          </div>
                        )}
                      </div>
                      {!node.read && (
                        <button
                          onClick={() => markAsRead(node.id)}
                          disabled={markingAsRead}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Mark as read"
                        >
                          <Check className="h-3 w-3" />
                          Mark read
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>
                        {formatDistanceToNow(new Date(node.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      {node.read && node.readAt && (
                        <span>
                          Read{" "}
                          {formatDistanceToNow(new Date(node.readAt), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                      <span className="capitalize">
                        {node.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
