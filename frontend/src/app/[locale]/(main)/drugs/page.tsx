"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Pagination,
} from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { useDrugsList } from "@/hooks/useDrugs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function DrugsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Drugs");
  const [isMounted, setIsMounted] = useState(false);

  const {
    drugs,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    handlePageChange,
    deleteConfirm,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    refetch,
  } = useDrugsList({
    pageSize: 10,
    skip: !isAuthenticated(),
  });

  useEffect(() => {
    document.title = `${t("title")} | Medication Reminder`;
  }, [t]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isAuthenticated() && refetch) {
      refetch();
    }
  }, [isMounted, isAuthenticated, refetch]);

  const handleEdit = (id: string) => {
    router.push(`/drugs/edit/${id}`);
  };

  const handleCreate = () => {
    router.push("/drugs/create");
  };

  if (!isMounted) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 min-h-[60vh]">
        <div className="h-8 w-48 animate-pulse bg-background-component rounded" />
        <div className="h-4 w-64 animate-pulse bg-background-component rounded" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold">{t("accessDenied")}</h1>
        <p className="text-text-secondary">{t("signInToManage")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-text-secondary mt-1">{t("subtitle")}</p>
        </div>
        <Button onClick={handleCreate} size="lg">
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
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          {t("addMedication")}
        </Button>
      </div>

      {/* Stats */}
      {totalCount > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t("totalMedications")}</CardDescription>
              <CardTitle className="text-3xl">{totalCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t("active")}</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {drugs.filter((d) => d.isActive).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t("inactive")}</CardDescription>
              <CardTitle className="text-3xl text-gray-500">
                {drugs.filter((d) => !d.isActive).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Drugs List */}
      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-text-secondary">{t("loadingMedications")}</p>
          </CardContent>
        </Card>
      ) : drugs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4 text-gray-300"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              {t("noMedicationsFound")}
            </h3>
            <p className="text-text-secondary mb-4">
              {t("addFirstMedication")}
            </p>
            <Button onClick={handleCreate}>
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
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              {t("addMedication")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Page Info */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              {t("showing")} {startIndex + 1}-{endIndex} {t("of")} {totalCount}{" "}
              {t("medications")}
            </p>
          </div>

          {/* Drugs Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-br-regular bg-background-component">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("name")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("dosage")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("frequency")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("startDate")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("endDate")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("status")}
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        {t("actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-br-regular">
                    {drugs.map((drug) => (
                      <tr
                        key={drug.id}
                        className="hover:bg-background-component transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-text-regular">
                              {drug.name}
                            </span>
                            {drug.description && (
                              <span className="text-sm text-text-secondary mt-1">
                                {drug.description}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-regular">
                          {drug.dosage} {drug.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-regular">
                          {drug.frequency}x {drug.frequencyUnit.toLowerCase()}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-regular">
                          {new Date(drug.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-regular">
                          {drug.endDate
                            ? new Date(drug.endDate).toLocaleDateString()
                            : t("ongoing")}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={drug.isActive ? "success" : "destructive"}
                          >
                            {drug.isActive ? t("active") : t("inactive")}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleEdit(drug.id)}
                              variant="outline"
                              size="sm"
                            >
                              {t("edit")}
                            </Button>
                            <Button
                              onClick={() =>
                                openDeleteDialog(drug.id, drug.name)
                              }
                              variant="destructive"
                              size="sm"
                            >
                              {t("delete")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                isLoading={loading}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={closeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirmDescription")}{" "}
              <span className="font-semibold text-text-regular">
                {deleteConfirm?.name}
              </span>{" "}
              {t("deleteConfirmFrom")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
