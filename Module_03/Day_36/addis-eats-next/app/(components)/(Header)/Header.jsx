"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

function Header() {
  const pathname = usePathname();

  // Active navigation states
  const isMenuActive = pathname === "/menu";
  const isCartActive = pathname === "/cart";
  const isCheckoutActive = pathname === "/checkout";
  const isOrdersActive = pathname === "/orders" || pathname.startsWith("/orders/");
  const isLoginActive = pathname === "/login";
  const isRegisterActive = pathname === "/register";

  return (
    <header className="site-header">
      <div className="site-header__inner">

        {/* LOGO */}
        <Link href="/" className="brand">
          <span>Addis Eats</span>
        </Link>

        {/* HEADER NAVIGATION */}
        <nav className="header-actions" aria-label="Main navigation">

          <Link
            href="/menu"
            className={`register-link ${isMenuActive ? "active" : ""}`}
          >
            Menu
          </Link>

          <Link
            href="/cart"
            className={`register-link ${isCartActive ? "active" : ""}`}
          >
            Cart
          </Link>

          <Link
            href="/checkout"
            className={`register-link ${isCheckoutActive ? "active" : ""}`}
          >
            Check Out
          </Link>

          <Link
            href="/orders"
            className={`register-link ${isOrdersActive ? "active" : ""}`}
          >
            Order
          </Link>

          <Link
            href="/login"
            className={`register-link ${isLoginActive ? "active" : ""}`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`register-link ${isRegisterActive ? "active" : ""}`}
          >
            Register
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Header;