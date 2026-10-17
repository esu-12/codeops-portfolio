// app/opengraph-image.jsx
import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Authentic Ethiopian Cuisine";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f3ea",
          color: "#2d241f",
          fontFamily: "sans-serif",
          border: "24px solid #7b1e1e",
        }}
      >
        <div style={{ fontSize: 32, color: "#7b1e1e" }}>
          AUTHENTIC ETHIOPIAN CUISINE
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 34, marginTop: 20 }}>
          Traditional flavors. Made with care.
        </div>
      </div>
    ),
    size
  );
}