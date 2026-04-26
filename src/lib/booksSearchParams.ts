import type { BooksSearchParams } from "../features/books/types.ts";

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20] as const;
const DEFAULT_PAGE_SIZE = 10;

function normalizePage(value: string | null) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function normalizePageSize(value: string | null) {
  const parsed = Number(value);

  if (PAGE_SIZE_OPTIONS.includes(parsed as (typeof PAGE_SIZE_OPTIONS)[number])) {
    return parsed;
  }

  return DEFAULT_PAGE_SIZE;
}

export function getInitialSearchParams(): BooksSearchParams {
  const url = new URL(window.location.href);

  return getSearchParamsState(url.searchParams);
}

export function getSearchParamsState(
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike,
): BooksSearchParams {
  return {
    query: searchParams.get("q") ?? "",
    page: normalizePage(searchParams.get("page")),
    pageSize: normalizePageSize(searchParams.get("pageSize")),
  };
}

export function createSearchParams({ query, page, pageSize }: BooksSearchParams) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("q", query);
  }

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  return params;
}

type ReadonlyURLSearchParamsLike = {
  get: (name: string) => string | null;
};
