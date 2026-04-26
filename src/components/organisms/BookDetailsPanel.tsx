import { useEffect } from "react";
import { Button } from "../atoms/Button.tsx";
import { Card } from "../atoms/Card.tsx";
import { Typography } from "../atoms/Typography.tsx";
import type { BookDetail } from "../../features/books/types.ts";
import { cn } from "../../lib/cn.ts";

type BookDetailsPanelProps = {
  book: BookDetail | null;
  isDesktop: boolean;
  isOpen: boolean;
  onClose: () => void;
};

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div className="space-y-1">
      <Typography as="p" size="caption" tone="muted">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </div>
  );
}

export function BookDetailsPanel({
  book,
  isDesktop,
  isOpen,
  onClose,
}: BookDetailsPanelProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || isDesktop) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isDesktop, isOpen]);

  if (!book) {
    if (!isDesktop) {
      return null;
    }

    return (
      <Card className="sticky top-6 min-h-[24rem]">
        <Typography as="h2" size="subtitle">
          Dettagli libro
        </Typography>
        <Typography tone="muted" className="mt-3">
          Seleziona un libro dai risultati per visualizzare qui le informazioni principali.
        </Typography>
      </Card>
    );
  }

  const content = (
    <Card
      padding="lg"
      surface="bare"
      className={cn(
        "h-full overflow-y-auto rounded-none",
        "md:rounded-[28px] md:border md:border-slate-200 md:bg-white/95 md:shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Typography as="h2" size="title" className="max-w-[16rem]">
          {book.title}
        </Typography>
        <Button variant="ghost" onClick={onClose} className="shrink-0">
          Chiudi
        </Button>
      </div>

      <div className="mt-6 space-y-5">
        {book.thumbnail ? (
          <div className="overflow-hidden rounded-[24px] bg-slate-100">
            <img src={book.thumbnail} alt={`Copertina di ${book.title}`} className="w-full object-cover" />
          </div>
        ) : null}

        <DetailRow
          label="Autori"
          value={book.authors.length > 0 ? book.authors.join(", ") : "Autore non disponibile"}
        />
        <DetailRow label="Editore" value={book.publisher} />
        <DetailRow label="Pubblicazione" value={book.publishedDate} />
        <DetailRow label="Pagine" value={book.pageCount ? String(book.pageCount) : null} />
        <DetailRow label="Lingua" value={book.language?.toUpperCase() ?? null} />
        <DetailRow
          label="Categorie"
          value={book.categories.length > 0 ? book.categories.join(", ") : null}
        />

        {book.description ? (
          <div className="space-y-2">
            <Typography as="p" size="caption" tone="muted">
              Descrizione
            </Typography>
            <div
              className="prose prose-slate max-w-none text-sm text-slate-700"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {book.previewLink ? (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
                "bg-slate-950 text-white hover:bg-slate-800",
              )}
            >
              Anteprima
            </a>
          ) : null}
          {book.infoLink ? (
            <a
              href={book.infoLink}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
                "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
              )}
            >
              Scheda Google
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );

  if (isDesktop) {
    return <div className="sticky top-6">{content}</div>;
  }

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-slate-950/35 md:hidden">
      <button
        type="button"
        aria-label="Chiudi dettagli"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-hidden rounded-t-[32px] bg-white">
        {content}
      </div>
    </div>
  ) : null;
}
