import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

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
  const location = useLocation();

  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();

  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  const signOut = useAuthStore(
    (state) => state.signOut
  );

  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  // Menu is active ONLY on /menu
  const isMenuActive =
    location.pathname === "/menu" &&
    location.hash !== "#featured";

  // Featured Foods is active on:
  // /menu#featured
  // /menu/menu-1
  // /menu/menu-2
  // etc.
  const isFeaturedActive =
    location.hash === "#featured" ||
    (
      location.pathname.startsWith("/menu/") &&
      location.pathname !== "/menu"
    );

  /* =====================================================
     USER INITIALS
  ===================================================== */

  function getInitials(name = "") {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return `${parts[0][0]}${
      parts[parts.length - 1][0]
    }`.toUpperCase();
  }

  return (
    <header className="site-header">

      <div className="site-header__inner">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
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

          <NavLink
            to="/"
            end
          >
            Home
          </NavLink>


          {/* MENU */}

          <Link
            to="/menu"
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
            to="/menu#featured"
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

          <NavLink
            to="/cart"
            end
          >
            Order &amp;
            <br />
            Cart ({totalItems})
          </NavLink>


          {/* DELIVERY & CHECKOUT */}

          <NavLink
            to="/checkout"
            end
          >
            Delivery &amp;
            <br />
            Checkout
          </NavLink>

        </nav>


        {/* =================================================
            HEADER ACTIONS
        ================================================= */}

        <div className="header-actions">

          {/* CART SUMMARY */}

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


          {/* =================================================
              NOT AUTHENTICATED
          ================================================= */}

          {!isAuthenticated ? (
            <>

              {/* SIGN IN */}

              <NavLink
                to="/signin"
                className="header-signin"
                end
              >
                SignIn
              </NavLink>


              {/* REGISTER */}

              <NavLink
                to="/register"
                className="register-link"
                end
              >
                Register
              </NavLink>

            </>
          ) : (

            /* =================================================
               AUTHENTICATED USER
            ================================================= */

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