import type { FormEvent } from "react";
import { Typography } from "../atoms/Typography.tsx";
import { SearchBar } from "../molecules/SearchBar.tsx";

type HeaderProps = {
  query?: string;
  onQueryChange?: (value: string) => void;
  onSearchSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onLogoClick: () => void;
};

function Header({
  query = "",
  onQueryChange,
  onSearchSubmit,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button type="button" onClick={onLogoClick} className="text-left">
          <Typography as="span" size="title">
            Wink&apos;s Archive
          </Typography>
        </button>
        {onQueryChange ? (
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearchSubmit}
            className="max-w-xl"
          />
        ) : null}
      </div>
    </header>
  );
}

export { Header };
