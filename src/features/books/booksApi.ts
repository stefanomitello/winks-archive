import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BookDetail,
  BooksSearchParams,
  BooksSearchResult,
  GoogleBooksResponse,
  GoogleBooksVolume,
} from "./types.ts";

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function toHttps(url: string | undefined) {
  if (!url) {
    return null;
  }

  return url.replace("http://", "https://");
}

function mapVolumeToBook(volume: GoogleBooksVolume): BookDetail {
  console.log(volume);

  const info = volume.volumeInfo ?? {};

  return {
    id: volume.id,
    title: info.title?.trim() || "Titolo non disponibile",
    authors: info.authors ?? [],
    thumbnail: toHttps(
      info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail,
    ),
    description: info.description ?? null,
    publisher: info.publisher ?? null,
    publishedDate: info.publishedDate ?? null,
    pageCount: info.pageCount ?? null,
    categories: info.categories ?? [],
    language: info.language ?? null,
    previewLink: info.previewLink ?? null,
    infoLink: info.infoLink ?? null,
  };
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksSearchResult, BooksSearchParams>({
      query: ({ query, page, pageSize }) => {
        const params = new URLSearchParams({
          q: query,
          startIndex: String((page - 1) * pageSize),
          maxResults: String(pageSize),
          printType: "books",
        });

        if (apiKey) {
          params.set("key", apiKey);
        }

        return `volumes?${params.toString()}`;
      },
      transformResponse: (
        response: GoogleBooksResponse,
      ): BooksSearchResult => ({
        items: (response.items ?? []).map(mapVolumeToBook),
        totalItems: response.totalItems ?? 0,
      }),
    }),
    getBookById: builder.query<BookDetail, string>({
      query: (bookId) => {
        const params = new URLSearchParams();

        if (apiKey) {
          params.set("key", apiKey);
        }

        const suffix = params.toString();
        return suffix ? `volumes/${bookId}?${suffix}` : `volumes/${bookId}`;
      },
      transformResponse: (response: GoogleBooksVolume): BookDetail =>
        mapVolumeToBook(response),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi;
