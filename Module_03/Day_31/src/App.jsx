import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout/Layout.jsx";
import ErrorBoundary from "./utils/errorBoundary.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

import "./App.css";

/* =========================
   Lazy Loaded Pages
========================= */

const Home = lazy(() => import("./pages/home/Home.jsx"));
const Menu = lazy(() => import("./pages/menu/Menu.jsx"));
const DishDetail = lazy(() =>
  import("./pages/dishDetail/DishDetail.jsx")
);
const Cart = lazy(() => import("./pages/cart/Cart.jsx"));
const SignIn = lazy(() => import("./pages/signin/SignIn.jsx"));
const Register = lazy(() =>
  import("./pages/register/Register.jsx")
);
const Checkout = lazy(() =>
  import("./pages/checkout/Checkout.jsx")
);
const NotFound = lazy(() =>
  import("./pages/notfound/NotFound.jsx")
);


/* =========================
   Loading Component
========================= */

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7e2919",
        fontSize: "16px",
        fontWeight: "700",
      }}
    >
      Loading...
    </div>
  );
}


/* =========================
   App
========================= */

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>

              {/* Home */}
              <Route
                index
                element={<Home />}
              />

              {/* Menu */}
              <Route
                path="/menu"
                element={<Menu />}
              />

              {/* Dish Details */}
              <Route
                path="/menu/:id"
                element={<DishDetail />}
              />

              {/* Cart */}
              <Route
                path="/cart"
                element={<Cart />}
              />

              {/* Authentication */}
              <Route
                path="/signin"
                element={<SignIn />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              {/* Protected Checkout */}
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={<NotFound />}
              />

            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;