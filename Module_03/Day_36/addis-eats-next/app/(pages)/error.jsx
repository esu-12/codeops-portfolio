//app/(pages)/error.jsx

"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <main>
      <h1>Something went wrong</h1>

      <p>The menu could not be loaded.</p>

      <button type="button" onClick={() => reset()}>
        Try Again
      </button>

      <br />
      <br />

      <Link href="/">Back Home</Link>
    </main>
  );
}