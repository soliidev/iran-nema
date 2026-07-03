import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE = 5;

export default function PlacePagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE / 2));
    const end = Math.min(totalPages, start + MAX_VISIBLE - 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className="min-w-10"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </nav>
  );
}
