import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router";
import { Header } from "../components/organisms/Header.tsx";
import { Card } from "../components/atoms/Card.tsx";
import { Spinner } from "../components/atoms/Spinner.tsx";
import { Typography } from "../components/atoms/Typography.tsx";
import { useGetBookByIdQuery } from "../features/books/booksApi.ts";
import {
  createSearchParams,
  getSearchParamsState,
} from "../lib/booksSearchParams.ts";

function DetailPage() {
  const { bookId = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resultsState = useMemo(() => getSearchParamsState(searchParams), [searchParams]);
  const { data: book, isFetching, isError } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  });

  const backToResults = () => {
    navigate(`/results?${createSearchParams(resultsState).toString()}`);
  };

  return (
    <>
      <Header onLogoClick={() => navigate("/")} />
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <button type="button" onClick={backToResults} className="text-left text-sm text-slate-600">
            Torna ai risultati
          </button>

          {isFetching ? (
            <div className="flex min-h-64 items-center justify-center gap-3">
              <Spinner />
              <Typography tone="muted">Sto caricando il dettaglio del libro...</Typography>
            </div>
          ) : null}

          {isError ? (
            <Card>
              <Typography as="h1" size="title">
                Errore nel caricamento
              </Typography>
              <Typography tone="muted" className="mt-2">
                Non sono riuscito a recuperare il dettaglio del libro richiesto.
              </Typography>
            </Card>
          ) : null}

          {book ? (
            <Card padding="lg" className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <div className="overflow-hidden rounded-[24px] bg-slate-100">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`Copertina di ${book.title}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-80 items-center justify-center">
                    <Typography as="span" tone="muted">
                      No cover
                    </Typography>
                  </div>
                )}
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Typography as="h1" size="title">
                    {book.title}
                  </Typography>
                  <Typography tone="muted">
                    {book.authors.length > 0
                      ? book.authors.join(", ")
                      : "Autore non disponibile"}
                  </Typography>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailItem label="Editore" value={book.publisher} />
                  <DetailItem label="Pubblicazione" value={book.publishedDate} />
                  <DetailItem
                    label="Pagine"
                    value={book.pageCount ? String(book.pageCount) : null}
                  />
                  <DetailItem label="Lingua" value={book.language?.toUpperCase() ?? null} />
                  <DetailItem
                    label="Categorie"
                    value={book.categories.length > 0 ? book.categories.join(", ") : null}
                  />
                </div>

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
              </div>
            </Card>
          ) : null}
        </div>
      </main>
    </>
  );
}

function DetailItem({ label, value }: { label: string; value: string | null }) {
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

export default DetailPage;
