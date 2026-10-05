// app/(pages)/menu/dish/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://addis-eats-backend.onrender.com";

export default async function DishPage({ params }) {
  const { id } = await params;

  console.log("URL ID:", id);

  const response = await fetch(`${API_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();

  const menu = result.data;

  console.log("MENU:", menu);

  const dish = menu.find(
    (item) => String(item.id) === String(id)
  );

  console.log("FOUND DISH:", dish);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.nameEn}</h1>

      <p>{dish.nameAm}</p>

      <p>Dish ID: {dish.id}</p>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.priceETB} ETB</p>

      <p>Spice Level: {dish.spiceLevel}</p>

      <p>{dish.description}</p>

      <p>Servings: {dish.servings}</p>

      <h2>Ingredients</h2>

      <ul>
        {dish.ingredients.map((ingredient) => (
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