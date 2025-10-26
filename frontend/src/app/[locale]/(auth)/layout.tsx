import "@/styles/globals.scss";
import { Icon, Typography } from "@/components";
import { useTranslations } from "next-intl";
import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Auth Header */}
      <header className="border-b border-br-regular bg-background p-4">
        <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2">
          <Icon name="NextJs" size="2em" className="text-primary" />
          <Typography.Text className="font-medium text-lg">
            Medication Reminder App
          </Typography.Text>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1">{children}</main>

      {/* Auth Footer */}
      <footer className="border-t border-br-regular bg-background-component py-4">
        <div className="mx-auto max-w-md text-center">
          <Typography.Text className="text-sm text-text-secondary">
            © 2025 Medication Reminder App. All rights reserved.
          </Typography.Text>
        </div>
      </footer>
    </div>
  );
}
