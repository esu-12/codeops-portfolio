import Link from "next/link";

export default function OrderPage() {
  return (
    <main>
      <h1>Order History</h1>

      <p>Your previous orders will appear here.</p>

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
      </nav>
    </main>
  );
}