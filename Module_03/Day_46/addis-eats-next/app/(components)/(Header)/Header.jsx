
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkAuthStatus, logoutUser } from "@/app/actions";
import "./Header.css";

function Header() {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus()
      .then((result) => setAuthenticated(result.authenticated))
      .catch(() => setAuthenticated(false));
  }, [pathname]);

  const isMenuActive = pathname === "/menu";
  const isCartActive = pathname === "/cart";
  const isCheckoutActive = pathname === "/checkout";
  const isOrdersActive =
    pathname === "/orders" || pathname.startsWith("/orders/");
  const isLoginActive = pathname === "/login";
  const isRegisterActive = pathname === "/register";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <span>Addis Eats</span>
        </Link>

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
            Orders
          </Link>

          {authenticated ? (
            <form action={logoutUser}>
              <button type="submit" className="register-link">
                Sign out
              </button>
            </form>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;