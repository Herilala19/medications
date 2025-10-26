import { Button } from "@/components";
import { type FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage = false,
  hasPreviousPage = false,
  isLoading = false,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage || isLoading}
        variant="outline"
        size="sm"
      >
        Previous
      </Button>

      <div className="flex gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-text-secondary">...</span>
            ) : (
              <Button
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        variant="outline"
        size="sm"
      >
        Next
      </Button>
    </div>
  );
};
