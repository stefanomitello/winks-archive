import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Drawer } from "../components/atoms/Drawer.tsx";
import { Spinner } from "../components/atoms/Spinner.tsx";
import { Typography } from "../components/atoms/Typography.tsx";
import { PageSizeSelect } from "../components/molecules/PageSizeSelect.tsx";
import { Header } from "../components/organisms/Header.tsx";
import { BooksResults } from "../components/organisms/BooksResults.tsx";
import { Pagination } from "../components/organisms/Pagination.tsx";
import { HomeTemplate } from "../components/templates/HomeTemplate.tsx";

import {
  useGetBookByIdQuery,
  useGetBooksQuery,
} from "../features/books/booksApi.ts";
import { useDebouncedValue } from "../hooks/useDebouncedValue.ts";
import {
  createSearchParams,
  getSearchParamsState,
} from "../lib/booksSearchParams.ts";

function ResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialParams = getSearchParamsState(searchParams);
  const [query, setQuery] = useState(initialParams.query);
  const [page, setPage] = useState(initialParams.page);
  const [pageSize, setPageSize] = useState(initialParams.pageSize);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const debouncedQuery = useDebouncedValue(query, 500);
  const normalizedQuery = debouncedQuery.trim();

  const { data, isFetching, isError } = useGetBooksQuery(
    { query: normalizedQuery, page, pageSize },
    { skip: normalizedQuery.length === 0 },
  );

  const {
    data: selectedBook,
    isFetching: isFetchingBookDetail,
    isError: isBookDetailError,
  } = useGetBookByIdQuery(selectedBookId ?? "", {
    skip: selectedBookId === null,
  });

  useEffect(() => {
    setSearchParams(createSearchParams({ query, page, pageSize }), {
      replace: true,
    });
  }, [page, pageSize, query, setSearchParams]);

  const books = data?.items ?? [];
  const totalItems = data?.totalItems ?? 0;

  const onHeaderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    setPage(1);
  };

  return (
    <>
      <HomeTemplate
        header={
          <Header
            query={query}
            onQueryChange={(nextValue) => {
              setSelectedBookId(null);
              setIsDrawerOpen(false);
              setQuery(nextValue);
              setPage(1);
            }}
            onSearchSubmit={onHeaderSubmit}
            onLogoClick={() => {
              navigate("/");
            }}
          />
        }
        controls={
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200/80 bg-white/80 px-5 py-4 backdrop-blur">
            <Typography tone="muted">
              {normalizedQuery
                ? `${totalItems > 1000 ? "1000+" : totalItems} risultati per "${normalizedQuery}"`
                : "Nessuna ricerca attiva"}
            </Typography>
            <PageSizeSelect
              value={pageSize}
              onChange={(nextPageSize) => {
                setSelectedBookId(null);
                setIsDrawerOpen(false);
                setPageSize(nextPageSize);
                setPage(1);
              }}
            />
          </div>
        }
        results={
          <BooksResults
            books={books}
            hasQuery={normalizedQuery.length > 0}
            isError={isError}
            isLoading={isFetching}
            selectedBookId={selectedBookId}
            onSelectBook={(bookId) => {
              setSelectedBookId(bookId);
              setIsDrawerOpen(true);
            }}
          />
        }
        pagination={
          normalizedQuery && totalItems > 0 ? (
            <Pagination
              currentPage={page}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={(nextPage) => {
                setSelectedBookId(null);
                setIsDrawerOpen(false);
                setPage(nextPage);
              }}
            />
          ) : null
        }
      />

      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title={selectedBook?.title ?? "Dettagli libro"}
      >
        {isFetchingBookDetail ? (
          <div className="flex min-h-48 items-center justify-center gap-3">
            <Spinner />
            <Typography tone="muted">Sto caricando i dettagli...</Typography>
          </div>
        ) : null}

        {isBookDetailError ? (
          <div className="rounded-4xl border px-5 py-6">
            <Typography as="h3" size="subtitle">
              Errore nel caricamento
            </Typography>
            <Typography tone="muted" className="mt-2">
              Non sono riuscito a recuperare i dettagli del libro selezionato.
            </Typography>
          </div>
        ) : null}

        {selectedBook ? (
          <div className="space-y-5">
            {selectedBook.thumbnail ? (
              <div className="overflow-hidden rounded-3xl ">
                <img
                  src={selectedBook.thumbnail}
                  alt={`Copertina di ${selectedBook.title}`}
                  className="w-full object-cover"
                />
              </div>
            ) : null}

            <DetailRow
              label="Autori"
              value={
                selectedBook.authors.length > 0
                  ? selectedBook.authors.join(", ")
                  : "Autore non disponibile"
              }
            />
            <DetailRow label="Editore" value={selectedBook.publisher} />
            <DetailRow
              label="Pubblicazione"
              value={selectedBook.publishedDate}
            />
            <DetailRow
              label="Pagine"
              value={
                selectedBook.pageCount ? String(selectedBook.pageCount) : null
              }
            />
            <DetailRow
              label="Categorie"
              value={
                selectedBook.categories.length > 0
                  ? selectedBook.categories.join(", ")
                  : null
              }
            />
            <DetailRow
              label="Lingua"
              value={selectedBook.language?.toUpperCase() ?? null}
            />

            {selectedBook.description ? (
              <div className="space-y-2">
                <Typography as="p" size="caption" tone="muted">
                  Descrizione
                </Typography>
                <div
                  className="prose prose-slate max-w-none text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: selectedBook.description }}
                />
              </div>
            ) : null}

            {selectedBook.previewLink ? (
              <a
                target="blank"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium bg-black text-amber-50 p-3 px-6"
                href={selectedBook.previewLink}
              >
                Vai al link
              </a>
            ) : null}

            {selectedBook.infoLink ? (
              <a
                target="blank"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium p-3 px-6"
                href={selectedBook.infoLink}
              >
                Info
              </a>
            ) : null}
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

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

export default ResultsPage;
