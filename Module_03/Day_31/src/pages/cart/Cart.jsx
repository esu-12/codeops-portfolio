import { Link } from "react-router-dom";

import {
  useCartStore,
  useCartItems,
  useCartTotalItems,
  useCartTotalPrice,
} from "../../store/cartStore";

import "./Cart.css";

const DELIVERY_FEE = 158;

function Cart() {
  const cartItems = useCartItems();
  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const grandTotal = totalPrice + DELIVERY_FEE;

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-delivery-banner">
          🚚 <strong>Free Highland Delivery:</strong>{" "}
          Complimentary delivery across Bole,
          Kazanchis, and Sarbet on orders over ETB 1,200.
        </div>

        <div className="cart-heading-row">
          <div>
            <p className="cart-eyebrow">
              COMMUNAL FEASTING
            </p>

            <h1>Your Gursha Basket</h1>

            <p>
              Your basket is waiting for your next
              Ethiopian feast.
            </p>
          </div>
        </div>

        <div className="cart-empty-card">
          <div className="cart-empty-icon">🛒</div>

          <h2>Your basket is empty</h2>

          <p>
            Choose your favorite dishes from our
            traditional Ethiopian menu.
          </p>

          <Link
            to="/menu"
            className="cart-primary-button"
          >
            Browse the Menu →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      {/* =================================================
          DELIVERY BANNER
      ================================================= */}

      <div className="cart-delivery-banner">
        🚚 <strong>Free Highland Delivery:</strong>{" "}
        Complimentary delivery across Bole,
        Kazanchis, and Sarbet on orders over ETB 1,200.
        <span>✓ THRESHOLD UNLOCKED</span>
      </div>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="cart-heading-row">

        <div>
          <p className="cart-eyebrow">
            COMMUNAL FEASTING
          </p>

          <h1>Your Gursha Basket</h1>
        </div>

        <div className="cart-steps">

          <div className="cart-step active">
            <span>1</span>
            Review Basket
          </div>

          <div className="cart-step">
            <span>2</span>
            Delivery Details
          </div>

          <div className="cart-step">
            <span>3</span>
            Confirmation
          </div>

        </div>

      </div>

      {/* =================================================
          MAIN CART LAYOUT
      ================================================= */}

      <div className="cart-layout">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="cart-main">

          <div className="cart-section-heading">
            <h2>
              Clay Pot Stews &amp; Provisions
            </h2>

            <span>
              {totalItems} handcrafted selections
            </span>

            <button
              type="button"
              onClick={clearCart}
              className="cart-clear-table"
            >
              ⟳ Clear Table
            </button>
          </div>

          <div className="cart-items">

            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >

                <div className="cart-item-image-wrap">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  ) : (
                    <div className="cart-item-image-placeholder">
                      🍲
                    </div>
                  )}
                </div>

                <div className="cart-item-details">

                  <div className="cart-item-title-row">
                    <div>
                      <span className="cart-item-badge">
                        HERITAGE FEAST
                      </span>

                      <h3>{item.name}</h3>
                    </div>

                    <strong className="cart-item-price">
                      ETB{" "}
                      {Number(item.price).toLocaleString()}
                    </strong>
                  </div>

                  <p className="cart-item-description">
                    Slow-simmered Ethiopian preparation
                    served with traditional spices and
                    house-made injera.
                  </p>

                  <div className="cart-item-bottom">

                    <div className="quantity-controls">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>

                    </div>

                    <span className="cart-item-subtotal">
                      ETB{" "}
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toLocaleString()}
                    </span>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>

          {/* =================================================
              DINING ETIQUETTE
          ================================================= */}

          <section className="cart-info-card">

            <h3>
              🍴 Gursha Hospitality &amp; Dining Etiquette
            </h3>

            <div className="cart-info-options">

              <label>
                <input type="checkbox" />
                <span>
                  <strong>
                    Include Traditional Hawash Basin
                  </strong>
                  <small>
                    Scented warm towels and hand-rinsing
                    amenities.
                  </small>
                </span>
              </label>

              <label>
                <input type="checkbox" />
                <span>
                  <strong>
                    No Cutlery Needed (True Gursha)
                  </strong>
                  <small>
                    We embrace the communal joy of eating
                    with injera.
                  </small>
                </span>
              </label>

            </div>

            <div className="cart-preference">
              <strong>
                Kitchen Chef Note / Injera Separation Preference
              </strong>

              <span>Optional</span>

              <input
                type="text"
                placeholder="E.g. Please wrap extra Teff injera..."
              />
            </div>

          </section>

          {/* =================================================
              GURSHA INFORMATION
          ================================================= */}

          <section className="gursha-meaning">

            <div className="gursha-icon">
              ♡
            </div>

            <div>
              <h3>
                The Meaning of Gursha
              </h3>

              <p>
                In Abehsa dining culture, placing a savory
                morsel directly into a companion's mouth
                with love represents friendship, trust,
                and shared celebration.
              </p>
            </div>

          </section>

        </div>

        {/* =================================================
            RIGHT - BASKET LEDGER
        ================================================= */}

        <aside className="basket-ledger">

          <div className="ledger-header">
            <h2>Basket Ledger</h2>
            <span>Bir (ETB)</span>
          </div>

          <div className="ledger-row">
            <span>
              Items Subtotal ({totalItems} items)
            </span>

            <strong>
              ETB {totalPrice.toLocaleString()}
            </strong>
          </div>

          <div className="ledger-row">
            <span>
              100% Teff Injera Upgrade
            </span>

            <strong>
              ETB 60
            </strong>
          </div>

          <div className="ledger-row">
            <span>
              Insulated Traditional Clay-Pot
            </span>

            <strong>
              ETB 40
            </strong>
          </div>

          <div className="ledger-row">
            <span>
              Delivery Fee
            </span>

            <strong className="free">
              FREE
            </strong>
          </div>

          <div className="ledger-row">
            <span>
              City VAT &amp; Tourism (5%)
            </span>

            <strong>
              ETB {Math.round(
                totalPrice * 0.05
              ).toLocaleString()}
            </strong>
          </div>

          <div className="ledger-promo">
            🎁 <strong>GURSHAN2025 APPLIED</strong>

            <span>
              − ETB 200
            </span>
          </div>

          <div className="promo-input">
            <input
              type="text"
              placeholder="Have another coupon code?"
            />

            <button type="button">
              Apply
            </button>
          </div>

          <div className="grand-total">

            <div>
              <span>GRAND TOTAL</span>

              <strong>
                ETB{" "}
                {(
                  grandTotal
                ).toLocaleString()}
              </strong>
            </div>

            <small>
              Taxes included
            </small>

          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Delivery Checkout →
          </Link>

          <p className="ledger-note">
            🔒 Explore more dishes from our Menu
          </p>

          <div className="ledger-benefits">

            <p>
              🥬 Piping Warm Delivery in woven Mesob
              packaging.
            </p>

            <p>
              📦 Telebirr, CBE Birr, Cash &amp; Card
              on delivery.
            </p>

            <p>
              🔐 Encrypted checkout &amp; real-time
              dispatch SMS.
            </p>

          </div>

        </aside>

      </div>

      {/* =================================================
          FRESH JEBENA
      ================================================= */}

      <section className="fresh-jebena">

        <div className="fresh-jebena-icon">
          ☕
        </div>

        <div>
          <strong>
            Adding Fresh Jebena Buna?
          </strong>

          <p>
            Complement your feast with our
            4:00 PM freshly roasted coffee beans.
          </p>
        </div>

        <Link to="/menu">
          ADD TO ORDER →
        </Link>

      </section>

    </section>
  );
}

export default Cart;