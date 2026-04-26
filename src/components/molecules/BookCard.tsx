import { cva } from "class-variance-authority";
import { Card } from "../atoms/Card.tsx";
import { Typography } from "../atoms/Typography.tsx";
import type { BookDetail } from "../../features/books/types.ts";
import { cn } from "../../lib/cn.ts";

type BookCardProps = {
  book: BookDetail;
  onSelect: (bookId: string) => void;
  isSelected?: boolean;
};

const bookCardVariants = cva(
  "flex h-full flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-30px_rgba(15,23,42,0.5)]",
  {
    variants: {
      isSelected: {
        true: "ring-2 ring-amber-400",
        false: "",
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

function formatAuthors(authors: string[]) {
  if (authors.length === 0) {
    return "Autore non disponibile";
  }

  return authors.join(", ");
}

export function BookCard({
  book,
  onSelect,
  isSelected = false,
}: BookCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onSelect(book.id);
      }}
      className="h-full text-left"
    >
      <Card className={cn(bookCardVariants({ isSelected }))}>
        <div className="flex gap-4">
          <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={`Copertina di ${book.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Typography
                as="span"
                size="caption"
                tone="muted"
                className="text-center"
              >
                No cover
              </Typography>
            )}
          </div>
          <div className="flex-col flex">
            <div className="min-w-0 space-y-2">
              <Typography as="h3" size="subtitle" className="line-clamp-2">
                {book.title}
              </Typography>
              <Typography tone="muted" className="line-clamp-2">
                di {formatAuthors(book.authors)}
              </Typography>
            </div>

            <Typography as="p" size="body" className="line-clamp-2">
              {book.description}
            </Typography>

            <div className="mt-auto flex flex-wrap gap-2">
              {book.publisher ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {book.publisher}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}
