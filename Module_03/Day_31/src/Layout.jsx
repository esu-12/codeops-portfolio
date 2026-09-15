// src/Layout.jsx

import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./cart/CartProvider.jsx";
import "./App.css";

function Layout() {
  const { items } = useContext(CartContext);
  const cartCount = items.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  return (
    <>
      <header>
        <Link to="/">
          <h1>Addis Eats</h1>
        </Link>

        <p>Authentic Ethiopian food</p>

        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;