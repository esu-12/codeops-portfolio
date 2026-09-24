import { NavLink, Link } from "react-router-dom";

import {
  useCartTotalItems,
  useCartTotalPrice,
} from "../../store/cartStore";

import {
  useAuthStore,
  useIsAuthenticated,
  useUser,
} from "../../store/authStore";

import "./Header.css";

function Header() {
  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();

  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  const signOut = useAuthStore(
    (state) => state.signOut
  );

  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${
      parts[parts.length - 1][0]
    }`.toUpperCase();
  };

  const firstName =
    user?.name?.split(" ")[0] || "Guest";

  return (
    <header className="site-header">
      <div className="site-header__inner">

        {/* Logo */}
        <Link to="/" className="brand">
          <span>Mesob</span>
          <span>House</span>
        </Link>

        {/* Main Navigation */}
        <nav
          className="site-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/menu">
            Menu
          </NavLink>

          <NavLink to="/menu#featured">
            Featured
            <br />
            Foods
          </NavLink>

          <NavLink to="/cart">
            Order &amp;
            <br />
            Cart ({totalItems})
          </NavLink>

          <NavLink to="/checkout">
            Delivery &amp;
            <br />
            Checkout
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">

          {/* Cart */}
          <Link
            to="/cart"
            className="cart-pill"
            aria-label={`Cart with ${totalItems} items`}
          >
            <span className="cart-pill__count">
              {totalItems} items
            </span>

            <span className="cart-pill__price">
              ETB {totalPrice.toLocaleString()}
            </span>
          </Link>

          {!isAuthenticated ? (
            <>
              {/* Sign In */}
              <NavLink
                to="/signin"
                className="header-signin"
              >
                Sign
                <br />
                In
              </NavLink>

              {/* Register */}
              <NavLink
                to="/register"
                className="register-link"
              >
                Register
              </NavLink>
            </>
          ) : (
            /* Logged-in User */
            <div className="header-user">

              <div className="header-welcome">
                Welcome
              </div>

              <button
                type="button"
                className="header-profile"
                onClick={signOut}
                title="Sign out"
              >
                <span className="profile-avatar">
                  {getInitials(user?.name)}
                </span>

                <span className="profile-name">
                  Selam, {user?.name}
                </span>
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;