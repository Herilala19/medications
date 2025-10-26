"use client";
import { Card, CardContent } from "@/components";
import { DrugForm } from "@/components/organisms/DrugForm/DrugForm";
import { useAuth } from "@/hooks/useAuth";
import { useDrug, useUpdateDrug } from "@/hooks/useDrugs";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Link from "next/link";

export default function EditDrugPage() {
  const router = useRouter();
  const params = useParams();
  const drugId = params.id as string;
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Drugs");

  useEffect(() => {
    document.title = `${t("editMedication")} | Medication Reminder`;
  }, [t]);

  const {
    drug,
    loading: queryLoading,
    defaultValues,
  } = useDrug({
    id: drugId,
    skip: !isAuthenticated(),
  });

  const { updateDrug, loading: mutationLoading, error } = useUpdateDrug(drugId);

  const handleCancel = () => {
    router.push("/drugs");
  };

  if (!isAuthenticated()) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold">{t("accessDenied")}</h1>
        <p className="text-text-secondary">{t("signInToEdit")}</p>
      </div>
    );
  }

  if (queryLoading) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <p className="text-text-secondary">{t("loadingMedication")}</p>
      </div>
    );
  }

  if (!drug) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold">{t("medicationNotFound")}</h1>
        <p className="text-text-secondary">
          {t("medicationNotFoundDescription")}
        </p>
        <Link href="/drugs" className="text-primary hover:underline">
          {t("backToMedications")}
        </Link>
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
          {t("editMedication")}
        </h1>
        <p className="text-text-secondary mt-1">{t("editDescription")}</p>
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
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={updateDrug}
        onCancel={handleCancel}
        isLoading={mutationLoading}
      />
    </div>
  );
}
