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
      <h2>Sign In</h2>

      <p>Please sign in to continue.</p>

      <button onClick={handleSignIn}>
        Sign In
      </button>
    </section>
  );
}

export default SignIn;