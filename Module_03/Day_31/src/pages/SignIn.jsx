// src/pages/SignIn.jsx

import { useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignIn() {
    localStorage.setItem("isAuthenticated", "true");

    const returnTo = location.state?.from || "/";

    navigate(returnTo, { replace: true });
  }

  return (
    <section className="signin-page">
      <p className="signin-eyebrow">ACCOUNT</p>

      <h2>Welcome Back to Our Table</h2>

      <p className="signin-message">
        Sign in to continue your Addis Eats order.
      </p>

      <div className="signin-benefits">
        <div>
          <strong>Fast Ordering</strong>
          <span>Save time on future orders.</span>
        </div>

        <div>
          <strong>Order History</strong>
          <span>Keep track of your favorite dishes.</span>
        </div>

        <div>
          <strong>Delivery Updates</strong>
          <span>Stay informed about your order.</span>
        </div>
      </div>

      <button onClick={handleSignIn}>
        Sign In
      </button>
    </section>
  );
}

export default SignIn;