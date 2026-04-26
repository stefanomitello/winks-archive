import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { SearchBar } from "../components/molecules/SearchBar.tsx";
import { Typography } from "../components/atoms/Typography.tsx";

function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const goToResults = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) return;

    navigate(
      `/results?q=${encodeURIComponent(normalizedQuery)}&page=1&pageSize=10`,
    );
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center gap-5 text-center">
          <Typography as="h1" size="caption" tone="accent">
            Wink's Archive
          </Typography>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={goToResults}
            autoFocus
            className="max-w-2xl"
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
