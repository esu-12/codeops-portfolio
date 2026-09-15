// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <p>TABLE NOT SET • ERROR</p>

      <h2>404</h2>

      <h3>ይቅርታ! ይህ ገጽ አልተገኘም</h3>

      <p>
        Looks like this dish has already been enjoyed or
        this page doesn't exist.
      </p>

      <div className="not-found-links">
        <Link to="/">Return to Today's Specials</Link>
        <Link to="/menu">Explore Full Menu</Link>
        <Link to="/cart">Check Current Order</Link>
      </div>
    </section>
  );
}

export default NotFound;