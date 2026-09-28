import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../../../components/DishList/DishList";

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <p>Dish ID: {id}</p>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

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