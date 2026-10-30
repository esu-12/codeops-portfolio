"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextQuery = input.trim();
      const currentQuery = searchParams.get("q") || "";

      // Don't navigate if the search query hasn't changed.
      if (nextQuery === currentQuery) {
        return;
      }

      setQuery(nextQuery);
      setPage(1);

      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }
      params.delete("page");

      const queryString = params.toString();

      router.replace(
        queryString ? `/menu?${queryString}` : "/menu",
        { scroll: false }
      );
    }, 350);

    return () => clearTimeout(timer);
  }, [input, router, searchParams]);

  useEffect(() => {
    const nextQuery = searchParams.get("q") || "";
    const nextPage = Math.max(
      1,
      Number(searchParams.get("page")) || 1
    );

    setInput(nextQuery);
    setQuery(nextQuery);
    setPage(nextPage);
  }, [searchParams]);

  const key = query
    ? `/api/dishes/search?q=${encodeURIComponent(query)}&page=${page}`
    : null;

  const { data, error, isLoading, isValidating } = useSWR(
    key,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  function changePage(nextPage) {
    setPage(nextPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.replace(`/menu?${params.toString()}`, { scroll: false });
  }

  return (
    <section aria-label="Search dishes">
      <label htmlFor="dish-search">Search dishes</label>
      <input
        id="dish-search"
        type="search"
        value={input}
        placeholder="Search by dish name..."
        onChange={(event) => setInput(event.target.value)}
      />

      {!query ? (
        <p>Enter a search term to find dishes.</p>
      ) : error ? (
        <p role="alert">Could not load search results.</p>
      ) : (
        <>
          {isLoading && !data && <p>Loading dishes...</p>}

          {data && (
            <>
              <p aria-live="polite">
                {data.total} result(s)
                {isValidating ? " · Updating…" : ""}
              </p>

              <ul>
                {data.items.map((dish) => (
                  <li key={dish.id}>
                    <strong>{dish.name}</strong>
                    {" — "}
                    {dish.description}
                    {" · "}
                    {dish.price} {dish.currency}
                  </li>
                ))}
              </ul>

              <nav aria-label="Search result pages">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  Previous
                </button>

                <span>
                  {" "}Page {data.page} of {data.totalPages}{" "}
                </span>

                <button
                  type="button"
                  disabled={page >= data.totalPages}
                  onClick={() => changePage(page + 1)}
                >
                  Next
                </button>
              </nav>
            </>
          )}
        </>
      )}
    </section>
  );
}
