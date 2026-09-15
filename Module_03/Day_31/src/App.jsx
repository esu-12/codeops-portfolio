import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./Menu.jsx";
import Cart from "./pages/Cart.jsx";
import DishDetail from "./pages/DishDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

import SignIn from "./pages/SignIn.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
        <Route path="menu/:id" element={<DishDetail />} />

        <Route path="signin" element={<SignIn />} />

<Route
  path="checkout"
  element={
    <RequireAuth>
      <Checkout />
    </RequireAuth>
  }
/>
 
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />

          <Route path="menu" element={<Menu />} />

          <Route path="cart" element={<Cart />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;