// src/pages/NotFound.jsx

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>404 - Page Not Found</h2>

      <p>Sorry, we couldn't find that page.</p>

      <Link to="/">Go Home</Link>
    </section>
  );
}

export default NotFound;