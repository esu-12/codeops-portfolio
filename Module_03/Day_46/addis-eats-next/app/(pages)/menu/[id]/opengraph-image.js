// app/(pages)/menu/[id]/opengraph-image.js

import { ImageResponse } from "next/og";

export const alt = "A featured dish from Addis Eats";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const revalidate = 60;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://addis-eats-backend.onrender.com";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;

  let dish = null;

  try {
    const response = await fetch(`${API_URL}/menu/`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) {
      const result = await response.json();

      const dishes = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result)
          ? result
          : [];

      dish = dishes.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item.slug) === String(id)
      );
    }
  } catch (error) {
    console.error("Open Graph menu fetch failed:", error);
  }

  const title = dish?.nameEn || "Discover Our Menu";

  const price =
    dish?.priceETB != null ? `${dish.priceETB} ETB` : "";

  const subtitle = dish
    ? [price, dish.category || "Traditional favorite"]
        .filter(Boolean)
        .join(" · ")
    : "Authentic Ethiopian flavors";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px",
          background: "#f8f3ea",
          color: "#2d241f",
          border: "20px solid #7b1e1e",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#7b1e1e",
          }}
        >
          ADDIS EATS
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 32,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 24,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            marginTop: 28,
            color: "#6b5b50",
          }}
        >
          Authentic Ethiopian cuisine
        </div>
      </div>
    ),
    size
  );
}