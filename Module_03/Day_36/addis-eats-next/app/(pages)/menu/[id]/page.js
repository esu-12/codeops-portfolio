// app/(pages)/menu/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getDish(id) {
  try {
    const response = await fetch(`${API_URL}/menu/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Menu API returned ${response.status}`);
    }

    const result = await response.json();

    const dishes = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
        ? result.data
        : [];

    return (
      dishes.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item.slug) === String(id)
      ) ?? null
    );
  } catch (error) {
    console.error("Failed to load dish:", error);
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on the Addis Eats menu.",
    };
  }

  const description =
    `${dish.description || `Discover ${dish.nameEn} at Addis Eats.`} ` +
    `Price: ${dish.priceETB} ETB.`;

  const dishUrl = `${SITE_URL}/menu/${encodeURIComponent(String(dish.id))}`;

  // Next.js generates the image URL from the dish's opengraph-image file.
  const imageUrl = `${dishUrl}/opengraph-image`;

  return {
    title: dish.nameEn,
    description,
    openGraph: {
      type: "website",
      url: dishUrl,
      title: dish.nameEn,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: dish.nameEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dish.nameEn,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const dishUrl = `${SITE_URL}/menu/${encodeURIComponent(String(dish.id))}`;

  const imageUrl = `${SITE_URL}/opengraph-image`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "@id": `${dishUrl}#menu-item`,
    name: dish.nameEn,
    description: dish.description || "",
    url: dishUrl,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      price: Number(dish.priceETB),
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="dish-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <h1>{dish.nameEn}</h1>

      {dish.nameAm && <p>{dish.nameAm}</p>}

      <p>{dish.description}</p>
      <p><strong>Category:</strong> {dish.category}</p>
      <p><strong>Price:</strong> {dish.priceETB} ETB</p>
      <p><strong>Spice Level:</strong> {dish.spiceLevel}</p>
      <p><strong>Servings:</strong> {dish.servings}</p>

      <h2>Ingredients</h2>
      <ul>
        {dish.ingredients?.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <nav>
        <Link href="/menu">Back to Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}