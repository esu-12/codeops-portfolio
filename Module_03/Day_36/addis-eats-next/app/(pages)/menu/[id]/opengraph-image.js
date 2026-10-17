// app/(pages)/menu/[id]/opengraph-image.js
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "A featured dish from Addis Eats";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function OpenGraphImage({ params }) {
  const { id } = await params;

  let dish = null;

  try {
    const response = await fetch(`${API_URL}/menu/`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const result = await response.json();
      const dishes = Array.isArray(result.data) ? result.data : [];
      dish = dishes.find((item) => String(item.id) === String(id));
    }
  } catch {
    // Render a branded fallback if the menu API is temporarily unavailable.
  }

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
          border: "24px solid #7b1e1e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#7b1e1e" }}>
          ADDIS EATS · ETHIOPIAN CUISINE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 32,
          }}
        >
          {dish?.nameEn || "Discover Our Menu"}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 24 }}>
          {dish
            ? `${dish.priceETB} ETB · ${dish.category || "Traditional favorite"}`
            : "Authentic Ethiopian flavors"}
        </div>
        {dish?.description ? (
          <div style={{ display: "flex", fontSize: 24, marginTop: 24 }}>
            {String(dish.description).slice(0, 110)}
          </div>
        ) : null}
      </div>
    ),
    size
  );
}