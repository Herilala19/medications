import type { PropsWithChildren } from "react";
import { ApolloWrapper } from "./apollo-wrapper";
import { Toaster } from "sonner";
import { NotificationListener } from "@/components/notifications/notification-listener";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ApolloWrapper>
      <NotificationListener />
      <Toaster position="bottom-right" richColors closeButton />
      {children}
    </ApolloWrapper>
  );
};
