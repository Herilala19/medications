import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  GET_DRUGS_QUERY,
  GET_DRUG_QUERY,
  CREATE_DRUG_MUTATION,
  UPDATE_DRUG_MUTATION,
  DELETE_DRUG_MUTATION,
} from "@/graphql/drugs.operations";
import type { CreateDrugFormData, UpdateDrugFormData } from "@/lib/validations";

interface Drug {
  id: string;
  name: string;
  description?: string;
  dosage: string;
  unit: string;
  frequency: number;
  frequencyUnit: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseDrugsListOptions {
  pageSize?: number;
  skip?: boolean;
}

interface UseDrugOptions {
  id: string;
  skip?: boolean;
}

export function useDrugsList(options: UseDrugsListOptions = {}) {
  const { pageSize = 10, skip = false } = options;
  const [currentPage, setCurrentPage] = useState(1);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, loading, refetch } = useQuery(GET_DRUGS_QUERY, {
    skip,
    variables: {
      first: pageSize,
      ...(cursor && { after: cursor }),
      orderBy: {
        field: "CREATED_AT",
        direction: "desc",
      },
    },
  });

  const [deleteDrugMutation] = useMutation(DELETE_DRUG_MUTATION);

  const drugs: Drug[] = data?.drugs?.edges?.map((edge: any) => edge.node) || [];
  const totalCount = data?.drugs?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageInfo = data?.drugs?.pageInfo;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + drugs.length, totalCount);

  const hasNextPage = pageInfo?.hasNextPage || false;
  const hasPreviousPage = pageInfo?.hasPreviousPage || false;

  const handlePageChange = async (page: number) => {
    const isNext = page > currentPage;
    const isPrevious = page < currentPage;

    setCurrentPage(page);

    try {
      let newCursor: string | undefined;

      if (page === 1) {
        newCursor = undefined;
      } else if (isNext && pageInfo?.endCursor) {
        newCursor = pageInfo.endCursor;
      } else if (isPrevious && pageInfo?.startCursor) {
        const offset = (page - 1) * pageSize;
        newCursor =
          offset > 0 ? btoa(`arrayconnection:${offset - 1}`) : undefined;
      } else {
        const offset = (page - 1) * pageSize;
        newCursor =
          offset > 0 ? btoa(`arrayconnection:${offset - 1}`) : undefined;
      }

      setCursor(newCursor);
      await refetch({
        first: pageSize,
        ...(newCursor && { after: newCursor }),
        orderBy: {
          field: "CREATED_AT",
          direction: "desc",
        },
      });
    } catch (err: any) {
      setError(err.message || "Failed to load drugs");
    }
  };

  const openDeleteDialog = (id: string, name: string) => {
    setDeleteConfirm({ id, name });
  };

  const closeDeleteDialog = () => {
    setDeleteConfirm(null);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    setError(null);
    try {
      await deleteDrugMutation({ variables: { id: deleteConfirm.id } });
      await refetch();
      closeDeleteDialog();
    } catch (err: any) {
      setError(err.message || "Failed to delete drug");
      closeDeleteDialog();
    }
  };

  return {
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
  };
}

export function useDrug(options: UseDrugOptions) {
  const { id, skip = false } = options;
  const [error, setError] = useState<string | null>(null);

  const { data, loading } = useQuery(GET_DRUG_QUERY, {
    variables: { id },
    skip,
  });

  const drug = data?.drug;

  const defaultValues = drug
    ? {
        name: drug.name,
        description: drug.description || "",
        dosage: drug.dosage,
        unit: drug.unit,
        frequency: drug.frequency,
        frequencyUnit: drug.frequencyUnit,
        startDate: new Date(drug.startDate).toISOString().split("T")[0],
        endDate: drug.endDate
          ? new Date(drug.endDate).toISOString().split("T")[0]
          : "",
      }
    : undefined;

  return {
    drug,
    loading,
    error,
    defaultValues,
  };
}

export function useCreateDrug() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [createDrugMutation, { loading }] = useMutation(CREATE_DRUG_MUTATION, {
    refetchQueries: [
      { 
        query: GET_DRUGS_QUERY, 
        variables: { 
          first: 10,
          orderBy: {
            field: "CREATED_AT",
            direction: "desc",
          },
        } 
      }
    ],
    awaitRefetchQueries: true,
  });

  const createDrug = async (data: CreateDrugFormData | any) => {
    setError(null);
    try {
      await createDrugMutation({
        variables: {
          input: {
            ...data,
            frequency: Number(data.frequency),
            description: data.description || undefined,
            endDate: data.endDate || undefined,
          },
        },
      });
      router.push("/drugs");
    } catch (err: any) {
      setError(err.message || "Failed to create drug");
    }
  };

  return {
    createDrug,
    loading,
    error,
  };
}

export function useUpdateDrug(drugId: string) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [updateDrugMutation, { loading }] = useMutation(UPDATE_DRUG_MUTATION, {
    refetchQueries: [
      { 
        query: GET_DRUGS_QUERY, 
        variables: { 
          first: 10,
          orderBy: {
            field: "CREATED_AT",
            direction: "desc",
          },
        } 
      }
    ],
    awaitRefetchQueries: true,
  });

  const updateDrug = async (formData: UpdateDrugFormData | any) => {
    setError(null);
    try {
      await updateDrugMutation({
        variables: {
          id: drugId,
          input: {
            ...formData,
            frequency: formData.frequency
              ? Number(formData.frequency)
              : undefined,
            description: formData.description || undefined,
            endDate: formData.endDate || undefined,
          },
        },
      });
      router.push("/drugs");
    } catch (err: any) {
      setError(err.message || "Failed to update drug");
    }
  };

  return {
    updateDrug,
    loading,
    error,
  };
}
