import { BookCard } from "../molecules/BookCard.tsx";
import { Spinner } from "../atoms/Spinner.tsx";
import { Typography } from "../atoms/Typography.tsx";
import type { BookDetail } from "../../features/books/types.ts";

type BooksResultsProps = {
  books: BookDetail[];
  isLoading: boolean;
  isError: boolean;
  hasQuery: boolean;
  selectedBookId?: string | null;
  onSelectBook: (bookId: string) => void;
};

export function BooksResults({
  books,
  isLoading,
  isError,
  hasQuery,
  selectedBookId = null,
  onSelectBook,
}: BooksResultsProps) {
  console.log(books);

  if (!hasQuery) {
    return (
      <div className="rounded-4xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
        <Typography as="h2" size="subtitle">
          Inizia da una ricerca
        </Typography>
        <Typography tone="muted" className="mt-2">
          Cerca un libro per titolo, autore o ISBN per visualizzare i risultati.
        </Typography>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <Spinner />
          <Typography tone="muted">Sto cercando i libri...</Typography>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-4xl border border-rose-200 bg-rose-50 px-6 py-12 text-center">
        <Typography as="h2" size="subtitle">
          Qualcosa è andato storto
        </Typography>
        <Typography tone="muted" className="mt-2">
          La richiesta verso Google Books non ha restituito un risultato valido.
        </Typography>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="rounded-4xl border border-slate-200 bg-white/80 px-6 py-12 text-center">
        <Typography as="h2" size="subtitle">
          Nessun risultato
        </Typography>
        <Typography tone="muted" className="mt-2">
          Prova a cambiare i termini di ricerca.
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isSelected={selectedBookId === book.id}
          onSelect={onSelectBook}
        />
      ))}
    </div>
  );
}
