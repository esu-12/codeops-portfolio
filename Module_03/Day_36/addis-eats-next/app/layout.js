// app/layout.js
import Header from "./(components)/(Header)/Header";
import Footer from "./(components)/(Footer)/Footer";
import Providers from "./providers";

import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Addis Eats | Authentic Ethiopian Cuisine",
    template: "%s | Addis Eats",
  },

  description:
    "Discover authentic Ethiopian cuisine at Addis Eats, featuring traditional wat, sizzling tibs, vegan favorites, and more.",

  openGraph: {
    type: "website",
    siteName: "Addis Eats",
    title: "Addis Eats | Authentic Ethiopian Cuisine",
    description:
      "Explore traditional Ethiopian dishes, freshly prepared with authentic flavors.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats — Authentic Ethiopian Cuisine",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Authentic Ethiopian Cuisine",
    description:
      "Explore traditional Ethiopian dishes and authentic Ethiopian flavors.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}