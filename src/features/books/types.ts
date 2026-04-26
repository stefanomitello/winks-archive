export type BooksSearchParams = {
  query: string;
  page: number;
  pageSize: number;
};

// Tipo per singolo libro
export type BookDetail = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
  publisher: string | null;
  publishedDate: string | null;
  language: string | null;
  description: string | null;
  pageCount: number | null;
  categories: string[];
  previewLink: string | null;
  infoLink: string | null;
};

export type BooksSearchResult = {
  items: BookDetail[];
  totalItems: number;
};

type GoogleBookVolumeInfo = {
  title?: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  language?: string;
  previewLink?: string;
  infoLink?: string;
};

export type GoogleBooksVolume = {
  id: string;
  volumeInfo?: GoogleBookVolumeInfo;
};

export type GoogleBooksResponse = {
  totalItems?: number;
  items?: GoogleBooksVolume[];
};
