import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h1>Your Cart</h1>

      <p>Your cart is currently empty.</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}