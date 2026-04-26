import { Input } from "../atoms/Input.tsx";
import { Search } from "lucide-react";
import type { FormEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  autoFocus?: boolean;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  return (
    <form className={`relative w-full max-w-lg ${className}`.trim()} onSubmit={onSubmit}>
      <label className="block" htmlFor="search">
        <span className="sr-only">Cerca un libro</span>
        <Input
          id="search"
          name="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          placeholder="Cerca per titolo, autore o ISBN"
          type="search"
          className="pr-12"
        />
      </label>
      <button
        type="submit"
        className="absolute inset-y-0 right-3 cursor-pointer"
        aria-label="Avvia ricerca"
      >
        <Search />
      </button>
    </form>
  );
}
