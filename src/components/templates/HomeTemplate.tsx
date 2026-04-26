import type { ReactNode } from "react";

type HomeTemplateProps = {
  header?: ReactNode;
  controls: ReactNode;
  results: ReactNode;
  pagination: ReactNode;
};

export function HomeTemplate({
  header,
  controls,
  results,
  pagination,
}: HomeTemplateProps) {
  return (
    <>
      {header}
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          {controls}
          <section className="space-y-6">
            {results}
            {pagination}
          </section>
        </div>
      </main>
    </>
  );
}
