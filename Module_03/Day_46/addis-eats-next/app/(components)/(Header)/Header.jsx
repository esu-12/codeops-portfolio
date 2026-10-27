"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkAuthStatus, logoutUser } from "@/app/actions";
import { useCart } from "../../providers";
import "./Header.css";

function Header() {
  const pathname = usePathname();
  const { totalItems, totalPrice } = useCart();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    checkAuthStatus()
      .then((result) => {
        setAuthenticated(result.authenticated);
        setRole(result.role);
      })
      .catch(() => {
        setAuthenticated(false);
        setRole(null);
      });
  }, [pathname]);

  const isMenuActive = pathname === "/menu";
  const isCartActive = pathname === "/cart";
  const isCheckoutActive = pathname === "/checkout";
  const isOrdersActive =
    pathname === "/orders" || pathname.startsWith("/orders/");
  const isDashboardActive =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isLoginActive = pathname === "/login";
  const isRegisterActive = pathname === "/register";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <img
            src="/ethiopian-flag.svg"
            alt="Ethiopian flag"
            className="brand-flag"
          />
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
            aria-label={`Cart, ${totalItems} items, ETB ${totalPrice.toLocaleString()}`}
          >
            <span className="cart-pill__icon" aria-hidden="true">
              🛒
            </span>

            <span className="cart-pill__details">
              <span className="cart-pill__count">
                Cart ({totalItems})
              </span>

              <span className="cart-pill__price">
                ETB {totalPrice.toLocaleString()}
              </span>
            </span>
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

          {authenticated && role === "staff" && (
            <Link
              href="/dashboard"
              className={`register-link ${isDashboardActive ? "active" : ""}`}
            >
              Dashboard
            </Link>
          )}

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