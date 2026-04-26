import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../atoms/Button.tsx";
import { Typography } from "../atoms/Typography.tsx";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Paginazione risultati"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <Typography tone="muted">
        Pagina {currentPage} di {totalPages}
      </Typography>

      <ul className="flex items-center gap-2">
        <li>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canGoPrevious}
            aria-label="Pagina precedente"
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>

        <li>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canGoNext}
            aria-label="Pagina successiva"
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
