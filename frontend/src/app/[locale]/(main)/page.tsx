"use client";
import { Typography } from "@/components";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");

  useEffect(() => {
    document.title = "Medication Reminder";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-6 p-8 text-center">
      <Typography.Title level="h1">{t("title")}</Typography.Title>
      <Typography.Paragraph>{t("description")}</Typography.Paragraph>

      <div className="mx-auto w-full flex flex-col gap-6 rounded-xl border border-br-regular bg-background-component p-10">
        <Typography.Paragraph className="text-lg">
          {t("welcome")}
        </Typography.Paragraph>
        <Typography.Text className="text-lg">
          {t("appDescription")}
        </Typography.Text>
      </div>
    </div>
  );
}
