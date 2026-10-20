// app/error.js

"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: "40px", textAlign: "center" }}>
          <h2>Something went wrong!</h2>
          <p>{error?.message || "An unexpected error occurred."}</p>
          <button onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}