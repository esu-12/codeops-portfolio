// src/auth/RequireAuth.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function RequireAuth({ children }) {
  const location = useLocation();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;