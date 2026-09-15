import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../cart/CartProvider.jsx";

function Cart() {
  const { items, total, dispatch } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <section>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>

        <Link to="/menu">Browse Menu</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <p className="cart-eyebrow">COMMUNAL FEASTING</p>
        <h2>Your Gursha Basket</h2>
        <p>Review your selected dishes before checkout.</p>
      </div>

      <div className="checkout-steps">
        <div className="step active">
          <span>1</span>
          <p>Review Basket</p>
        </div>

        <div className="step">
          <span>2</span>
          <p>Delivery Details</p>
        </div>

        <div className="step">
          <span>3</span>
          <p>Confirmation</p>
        </div>
      </div>

      <div className="cart-items">
        {items.map((item, index) => (
          <article
            className="cart-item"
            key={`${item.id}-${index}`}
          >
            <div className="cart-item-info">
              <h3>{item.name}</h3>

              <p>{item.price} ETB each</p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE",
                      id: item.id,
                    })
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE",
                      id: item.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <p>
                Subtotal: {item.price * item.quantity} ETB
              </p>
            </div>

            <button
              className="remove-button"
              onClick={() =>
                dispatch({
                  type: "REMOVE",
                  id: item.id,
                })
              }
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <p>Items Subtotal</p>
          <strong>{total} ETB</strong>
        </div>

        <div className="cart-total">
          <p>Grand Total</p>
          <strong>{total} ETB</strong>
        </div>

        <Link to="/menu" className="continue-shopping">
          Add More Dishes
        </Link>

        <Link to="/checkout" className="checkout-button">
          Proceed to Delivery Checkout
        </Link>

        <button
          className="clear-cart"
          onClick={() =>
            dispatch({
              type: "CLEAR",
            })
          }
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}

export default Cart;