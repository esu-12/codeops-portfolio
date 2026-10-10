// app/(pages)/menu/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://addis-eats-backend.onrender.com";

export default async function DishPage({ params }) {
  const { id } = await params;

  const response = await fetch(`${API_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();
  const dishes = Array.isArray(result.data) ? result.data : [];

  const dish = dishes.find(
    (item) => String(item.id) === String(id)
  );

  if (!dish) {
    notFound();
  }

  return (
    <main className="dish-detail">
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