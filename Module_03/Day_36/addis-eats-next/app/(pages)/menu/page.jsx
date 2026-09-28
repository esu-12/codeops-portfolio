import Link from "next/link";
import DishList from "../../components/DishList/DishList";
import CategoryBar from "../../components/CategoryBar/CategoryBar";

export default function MenuPage() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <p>Choose from our Ethiopian dishes.</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>

      <h2>Categories</h2>

      <CategoryBar />

      <h2>Today's Dishes</h2>

      <DishList />
    </main>
  );
}