"use client";
import { Card, CardContent } from "@/components";
import { DrugForm } from "@/components/organisms/DrugForm/DrugForm";
import { useAuth } from "@/hooks/useAuth";
import { useCreateDrug } from "@/hooks/useDrugs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CreateDrugPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { createDrug, loading, error } = useCreateDrug();
  const t = useTranslations("Drugs");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.title = `${t("addNewMedication")} | Medication Reminder`;
  }, [t]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCancel = () => {
    router.push("/drugs");
  };

  if (!isMounted) {
    return (
      <div className="mx-auto w-full max-w-4xl p-4 md:p-8 space-y-6">
        <div className="h-8 w-48 animate-pulse bg-background-component rounded" />
        <div className="h-64 animate-pulse bg-background-component rounded" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold">{t("accessDenied")}</h1>
        <p className="text-text-secondary">{t("signInToCreate")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/drugs"
          className="inline-flex items-center text-sm text-text-secondary hover:text-text-regular transition-colors mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t("backToMedications")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("addNewMedication")}
        </h1>
        <p className="text-text-secondary mt-1">{t("addNewDescription")}</p>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <DrugForm
        mode="create"
        defaultValues={{ frequencyUnit: "DAYS" }}
        onSubmit={createDrug}
        onCancel={handleCancel}
        isLoading={loading}
      />
    </div>
  );
}
