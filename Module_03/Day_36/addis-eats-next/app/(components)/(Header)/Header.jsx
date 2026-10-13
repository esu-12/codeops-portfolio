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
          <span>Addis Eats</span>
        </Link>


        {/*  MAIN NAVIGATION    ====== */}

        {/* <nav
          className="site-nav"
          aria-label="Main navigation"
        >

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


        </nav> */}


        {/* =======HEADER ACTIONS  ================= */}

        <div className="header-actions">

          <Link
            href="/menu"
            className="register-link"
          >
            Menu
          </Link>

          <Link
            href="/cart"
            className="register-link"
          >
            Cart
          </Link>

          <Link
            href="/checkout"
            className="register-link"
          >
            Check Out
          </Link>

          <Link
            href="/order"
            className="register-link"
          >
            Order
          </Link>

          <Link
            href="/login"
            className="register-link"
          >
            Login
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