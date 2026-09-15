// src/pages/Checkout.jsx

import OrderForm from "../OrderForm.jsx";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <Link to="/cart" className="back-link">
          ← Back to Cart
        </Link>

        <p className="checkout-eyebrow">
          DELIVERY & CHECKOUT
        </p>

        <h2>Complete Your Order</h2>

        <p>
          Enter your delivery details and confirm your order.
        </p>
      </div>

      <div className="checkout-steps">
        <div className="step">
          <span>1</span>
          <p>Review Order</p>
        </div>

        <div className="step active">
          <span>2</span>
          <p>Delivery & Payment</p>
        </div>

        <div className="step">
          <span>3</span>
          <p>Confirmation</p>
        </div>
      </div>

      <OrderForm />
    </section>
  );
}

export default Checkout;