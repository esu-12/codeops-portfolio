
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "../../providers";
import "./Checkout.css";

const DELIVERY_FEE = 158;

function CheckoutPage() {
  const router = useRouter();

  /* =========================
     Zustand Cart
  ========================= */

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  /* =========================
     Checkout State
  ========================= */

  const [deliveryMode, setDeliveryMode] =
    useState("immediate");

  const [paymentMethod, setPaymentMethod] =
    useState("telebirr");

  const [submitted, setSubmitted] =
    useState(false);

  const [customerName, setCustomerName] =
    useState("");

const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  city: "",
});

function handleChange(event) {
  const { name, value } = event.target;

  setForm((currentForm) => ({
    ...currentForm,
    [name]: value,
  }));
}
  /* =========================
     Order Total
  ========================= */

  const grandTotal = totalPrice + DELIVERY_FEE;

  /* =========================
     Submit Order
  ========================= */

  function onSubmit(event) {
    event.preventDefault(); 
    const orderData = {
      ...form,
      deliveryMode,
      paymentMethod,
      totalItems,
      totalPrice,
      deliveryFee: DELIVERY_FEE,
      grandTotal,
    };

    console.log(
      "Checkout submitted:",
      orderData
    );

    setCustomerName(form.name);
    setSubmitted(true);
  }

  /* =========================
     Empty Cart
  ========================= */

  if (cartItems.length === 0 && !submitted) {
    return (
      <section className="checkout-empty">
        <div className="checkout-empty-card">
          <span className="checkout-empty-icon">
            🛒
          </span>

          <h1>Your basket is empty</h1>

          <p>
            Add dishes from the menu before continuing
            to delivery and payment.
          </p>

          <Link
            href="/menu"
            className="checkout-primary-button"
          >
            Browse the Menu
          </Link>
        </div>
      </section>
    );
  }

  /* =========================
     Successful Order
  ========================= */

  if (submitted) {
    return (
      <section className="checkout-success">
        <div className="checkout-success-card">
          <div className="success-mark">✓</div>

          <p className="checkout-eyebrow">
            ORDER RECEIVED
          </p>

          <h1>
            Thank you, {customerName}!
          </h1>

          <p>
            Your Mesob feast has been sent for
            preparation. We will contact you with
            delivery updates.
          </p>

          <div className="success-total">
            ETB {grandTotal.toLocaleString()}
          </div>

          <button
            type="button"
            className="checkout-primary-button"
            onClick={() => {
              clearCart();
              router.push("/menu");
            }}
          >
            Return to Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      {/* =========================
          Breadcrumb
      ========================= */}

      <div className="checkout-breadcrumb">
        <Link href="/cart">Account</Link>

        <span>/</span>

        <strong>
          Delivery &amp; Checkout
        </strong>
      </div>

      {/* =========================
          Checkout Progress
      ========================= */}

      <div
        className="checkout-progress"
        aria-label="Checkout progress"
      >
        <div className="checkout-progress-step complete">
          <span>✓</span>

          <small>STEP 1</small>

          <strong>Review Order</strong>
        </div>

        <div className="checkout-progress-line active" />

        <div className="checkout-progress-step active">
          <span>2</span>

          <small>STEP 2</small>

          <strong>
            Delivery &amp; Payment
          </strong>
        </div>

        <div className="checkout-progress-line" />

        <div className="checkout-progress-step">
          <span>3</span>

          <small>STEP 3</small>

          <strong>Confirmation</strong>
        </div>
      </div>

      {/* =========================
          Delivery Mode
      ========================= */}

      <div className="checkout-mode-switch">
        <button
          className="mode-active"
          type="button"
        >
          ⌂ Prompt Delivery across Addis
        </button>

        <button type="button">
          ▣ Dine-in / Pickup (Bole)
        </button>
      </div>

      {/* =========================
          Checkout Form
      ========================= */}

      <form
        className="checkout-layout"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="checkout-main-column">

          {/* =========================
              Contact Details
          ========================= */}

          <section className="checkout-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-number">
                  1.
                </span>{" "}
                Contact &amp; Guest Details
              </div>

              <span className="panel-note">
                Habesha Hospitality
              </span>
            </div>

            <div className="form-grid two-columns">

              {/* Full Name */}

              <label>
                Full Name

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />


              </label>

              {/* Phone */}

              <label>
                Phone (Calls &amp; Telebirr SMS)

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="7/9XXXXXXXX"
                />


              </label>

              {/* Email */}

              <label className="full-span">
                Email for Digital Receipt

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />


              </label>
            </div>
          </section>

          {/* =========================
              Delivery Location
          ========================= */}

          <section className="checkout-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-number">
                  2.
                </span>{" "}
                Delivery Location in Addis Ababa
              </div>

              <span className="panel-note green">
                In-Israel Mesob Circle
              </span>
            </div>

            <div className="address-grid">

              {/* City */}

              <label>
                Sub-City / Neighborhood

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Bole"
                />


              </label>

              {/* Address */}

              <label>
                Street, Building, Plat No.

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, building, house number..."
                />

 
              </label>

              {/* Landmark */}

              <label className="full-span">
                Specific Landmark / Gate Instructions

                <input
                  type="text"
                  name="landmark"
                  value={form.landmark}
                  onChange={handleChange}
                  placeholder="Nearby landmark or gate instructions"
                />


              </label>
            </div>

            {/* =========================
                Delivery Options
            ========================= */}

            <div className="delivery-options">

              <button
                type="button"
                className={
                  deliveryMode === "immediate"
                    ? "delivery-option selected"
                    : "delivery-option"
                }
                onClick={() =>
                  setDeliveryMode("immediate")
                }
              >
                <span>◉</span>

                <strong>
                  Immediate Dispatch
                </strong>

                <small>
                  Fresh &amp; hot off the stove
                  (~35–45 min)
                </small>
              </button>

              <button
                type="button"
                className={
                  deliveryMode === "scheduled"
                    ? "delivery-option selected"
                    : "delivery-option"
                }
                onClick={() =>
                  setDeliveryMode("scheduled")
                }
              >
                <span>○</span>

                <strong>
                  Schedule for Dinner
                </strong>

                <small>
                  Set for evening feast
                  (e.g. 7:30 PM)
                </small>
              </button>
            </div>

            {/* Route Note */}

            <div className="route-note">
              <span>➤</span>

              <div>
                <strong>
                  Direct Kitchen-to-Door Route
                </strong>

                <small>
                  Dispatch with heated earthenware
                  containers
                </small>
              </div>

              <b>
                Bole Zone Priority
              </b>
            </div>
          </section>

          {/* =========================
              Payment
          ========================= */}

          <section className="checkout-panel payment-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-number">
                  3.
                </span>{" "}
                Payment Method
              </div>

              <span className="panel-note">
                Encrypted &amp; Direct
              </span>
            </div>

            {/* Telebirr */}

            <button
              type="button"
              className={
                paymentMethod === "telebirr"
                  ? "payment-option selected"
                  : "payment-option"
              }
              onClick={() =>
                setPaymentMethod("telebirr")
              }
            >
              <span className="radio">
                {paymentMethod === "telebirr"
                  ? "●"
                  : "○"}
              </span>

              <span className="payment-icon">
                T
              </span>

              <span className="payment-copy">
                <strong>
                  Telebirr{" "}
                  <em>Popular</em>
                </strong>

                <small>
                  Instant SuperApp QR prompt or
                  USSD confirmation
                </small>
              </span>

              <span>⌘</span>
            </button>

            {paymentMethod === "telebirr" && (
              <div className="telebirr-box">
                <div className="fake-qr">
                  ▦
                </div>

                <div>
                  <strong>
                    Telebirr Quick Merchant Pay
                  </strong>

                  <small>
                    Merchant ID: MESOB-7781.
                    Enter your Telebirr
                    registered phone to
                    authorize instant debit.
                  </small>

                  <div className="verify-row">
                    <input
                      type="tel"
                      placeholder="9XXXXXXXX"
                      aria-label="Telebirr verification phone"
                    />

                    <button type="button">
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CBE */}

            <button
              type="button"
              className={
                paymentMethod === "cbe"
                  ? "payment-option selected"
                  : "payment-option"
              }
              onClick={() =>
                setPaymentMethod("cbe")
              }
            >
              <span className="radio">
                {paymentMethod === "cbe"
                  ? "●"
                  : "○"}
              </span>

              <span className="payment-icon">
                CBE
              </span>

              <span className="payment-copy">
                <strong>
                  CBE Birr / CBE Mobile Banking
                </strong>

                <small>
                  Direct settlement via
                  Commercial Bank of Ethiopia
                </small>
              </span>

              <span>⌂</span>
            </button>

            {/* Cash */}

            <button
              type="button"
              className={
                paymentMethod === "cash"
                  ? "payment-option selected"
                  : "payment-option"
              }
              onClick={() =>
                setPaymentMethod("cash")
              }
            >
              <span className="radio">
                {paymentMethod === "cash"
                  ? "●"
                  : "○"}
              </span>

              <span className="payment-icon">
                POS
              </span>

              <span className="payment-copy">
                <strong>
                  Cash or Card on Delivery
                </strong>

                <small>
                  Rider delivers with wireless
                  POS card terminal + change
                  for cash
                </small>
              </span>

              <span>▣</span>
            </button>

            {/* Awash */}

            <button
              type="button"
              className={
                paymentMethod === "awash"
                  ? "payment-option selected"
                  : "payment-option"
              }
              onClick={() =>
                setPaymentMethod("awash")
              }
            >
              <span className="radio">
                {paymentMethod === "awash"
                  ? "●"
                  : "○"}
              </span>

              <span className="payment-icon">
                AB
              </span>

              <span className="payment-copy">
                <strong>
                  Amole / Awash Birr
                </strong>

                <small>
                  Dashen/Amole wallet or Awash
                  Birr direct integration
                </small>
              </span>

              <span>▤</span>
            </button>
          </section>

          {/* =========================
              Mesob House Promise
          ========================= */}

          <div className="checkout-promise">
            <strong>
              ♨ The Mesob House Promise
            </strong>

            <span>
              Each communal platter arrives with
              warm injera rolls of authentic 100%
              pure teff injera, warm wet towels,
              and our hand-blended Mitmita spice
              on the side.
            </span>
          </div>
        </div>

        {/* =========================
            Order Summary
        ========================= */}

        <aside className="order-summary">

          {/* Summary Title */}

          <div className="summary-title">
            <div>
              <small>
                HABESHA FEAST
              </small>

              <h2>
                Order Summary
              </h2>
            </div>

            <Link href="/cart">
              Edit Cart
            </Link>
          </div>

          {/* Cart Items */}

          <div className="summary-items">
            {cartItems.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >
                <div className="summary-thumb">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                    />
                  ) : (
                    <span>🍛</span>
                  )}
                </div>

                <div className="summary-item-copy">
                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    {item.description ||
                      "Freshly prepared Ethiopian specialty."}
                  </small>

                  <em>
                    {item.quantity} × ETB{" "}
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </em>
                </div>

                <b>
                  ETB{" "}
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString()}
                </b>
              </div>
            ))}
          </div>

          {/* Delivery Summary */}

          <div className="summary-delivery">
            <div>
              <small>
                DELIVERING TO
              </small>

              <strong>
                Bole City-side, Edna Mall area
              </strong>

              <span>
                Estimated arrival — 35–45 min
                from oven sealing
              </span>
            </div>

            <span className="active-dot">
              ● Active Corridor
            </span>
          </div>

          {/* Costs */}

          <div className="summary-costs">

            <div>
              <span>
                Items Subtotal
              </span>

              <b>
                ETB{" "}
                {totalPrice.toLocaleString()}
              </b>
            </div>

            <div>
              <span>
                Express Delivery
                (Bole Radius)
              </span>

              <b>
                ETB {DELIVERY_FEE}
              </b>
            </div>

            <div>
              <span>
                Complimentary Injera
                (4 Rolls)
              </span>

              <b className="included">
                INCLUDED
              </b>
            </div>

            <div>
              <span>
                Clay Stew Thermal
                Packaging
              </span>

              <b>
                FREE
              </b>
            </div>
          </div>

          {/* Total */}

          <div className="summary-total">
            <div>
              <small>
                TOTAL AMOUNT DUE
              </small>

              <strong>
                ETB{" "}
                {grandTotal.toLocaleString()}
              </strong>

              <span>
                Grand Total &nbsp; VAT inclusive
              </span>
            </div>
          </div>

          <p className="secure-note">
            🔒 Guaranteed steaming-hot in
            oven-sealed carriers at 100% remade.
          </p>

          {/* Confirm Order */}

          <button
            type="submit"
            className="confirm-order"
          >
            {`◉ Confirm Order & Pay ETB ${grandTotal.toLocaleString()}`}
          </button>

          {/* Return Cart */}

          <Link
            href="/cart"
            className="return-cart"
          >
            ← Return to Cart&nbsp;&nbsp;·&nbsp;&nbsp;
            Add More Dishes
          </Link>

          {/* Phone Support */}

          <div className="phone-support">
            <span>?</span>

            <div>
              <strong>
                Need Phone Support?
              </strong>

              <small>
                Direct kitchen desk:
                +251 904 204 944
              </small>
            </div>

            <button type="button">
              Call Now
            </button>
          </div>
        </aside>
      </form>
    </section>
  );
}

export default CheckoutPage;