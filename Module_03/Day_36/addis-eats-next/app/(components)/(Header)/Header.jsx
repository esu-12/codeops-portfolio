"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./Header.css";

function Header() {
  const pathname = usePathname();

  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  // Menu is active only on /menu
  const isMenuActive = pathname === "/menu";

  // Featured Foods is active on /menu/[id]
  const isFeaturedActive =
    pathname.startsWith("/menu/") &&
    pathname !== "/menu";

  return (
    <header className="site-header">

      <div className="site-header__inner">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className="brand"
        >
          <span>Mesob</span>
          <span>House</span>
        </Link>


        {/* =================================================
            MAIN NAVIGATION
        ================================================= */}

        <nav
          className="site-nav"
          aria-label="Main navigation"
        >

          {/* HOME */}

          <Link href="/">
            Home
          </Link>


          {/* MENU */}

          <Link
            href="/menu"
            className={
              isMenuActive
                ? "active"
                : undefined
            }
          >
            Menu
          </Link>


          {/* FEATURED FOODS */}

          <Link
            href="/menu#featured"
            className={
              isFeaturedActive
                ? "active"
                : undefined
            }
          >
            Featured
            <br />
            Foods
          </Link>


          {/* ORDER & CART */}

          <Link href="/cart">
            Order &amp;
            <br />
            Cart
          </Link>


          {/* DELIVERY & CHECKOUT */}

          <Link href="/checkout">
            Delivery &amp;
            <br />
            Checkout
          </Link>

        </nav>


        {/* =================================================
            HEADER ACTIONS
        ================================================= */}

        <div className="header-actions">

          <Link
            href="/cart"
            className="cart-pill"
          >
            Cart
          </Link>

          <Link
            href="/signin"
            className="header-signin"
          >
            SignIn
          </Link>

          <Link
            href="/register"
            className="register-link"
          >
            Register
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Header;