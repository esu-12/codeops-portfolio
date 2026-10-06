// app/(components)/FilterShell/FilterShell.jsx

"use client";

import CategoryBar from "../CategoryBar/CategoryBar";

export default function FilterShell({ children }) {
  return (
    <section className="filter-shell">
      <CategoryBar />

      {children}
    </section>
  );
}