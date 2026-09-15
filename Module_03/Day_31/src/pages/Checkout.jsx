// src/pages/Checkout.jsx

import OrderForm from "../OrderForm.jsx";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <section>
      <Link to="/cart">← Back to Cart</Link>

      <h2>Checkout</h2>

      <OrderForm />
    </section>
  );
}

export default Checkout;