import { PAGE_SIZE_OPTIONS } from "../../lib/booksSearchParams.ts";

type PageSizeSelectProps = {
  value: number;
  onChange: (value: number) => void;
};

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <label className="inline-flex items-center gap-3 text-sm text-slate-600">
      <span>Risultati per pagina</span>
      <select
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-950 outline-none focus:border-amber-500"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
