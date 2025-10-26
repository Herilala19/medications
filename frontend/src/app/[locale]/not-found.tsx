"use client";
import { Button, Typography } from "@/components";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export const NotFound: FC = () => {
  const t = useTranslations("NotFound");
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="m-auto min-h-screen flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <Typography.Title level="h1" className="text-4xl font-bold">
          {t("title")}
        </Typography.Title>
        <Typography.Paragraph className="text-lg text-text-secondary">
          {t("description")}
        </Typography.Paragraph>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Typography.Text className="text-sm text-text-tertiary">
          {t("errorCode")}
        </Typography.Text>
        <Button onClick={handleGoHome} variant="default" size="lg">
          {t("goHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
