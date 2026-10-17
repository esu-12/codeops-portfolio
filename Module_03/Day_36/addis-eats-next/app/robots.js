// app/robots.js
export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu"],
      disallow: [
        "/cart",
        "/checkout",
        "/orders",
        "/login",
        "/register",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}