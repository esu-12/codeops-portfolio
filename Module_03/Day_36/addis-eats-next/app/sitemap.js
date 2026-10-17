// app/sitemap.js
const API_URL = "https://addis-eats-backend.onrender.com";

export default async function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/menu",
    "/login",
    "/register",
  ];

  let dishes = [];

  try {
    const response = await fetch(`${API_URL}/menu/`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const result = await response.json();
      dishes = Array.isArray(result.data) ? result.data : [];
    }
  } catch {
    // Keep static routes available if the menu API is down.
  }

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));

  const dishEntries = dishes.map((dish) => ({
    url: `${siteUrl}/menu/${encodeURIComponent(String(dish.id))}`,
  }));

  return [...staticEntries, ...dishEntries];
}