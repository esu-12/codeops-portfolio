
import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>

      <p>Authentic Ethiopian food</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
