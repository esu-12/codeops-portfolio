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
        <h2>Your Cart</h2>
        <p>Review your selected dishes before checkout.</p>
      </div>

      <div className="cart-items">
        {items.map((item, index) => (
          <article
            className="cart-item"
            key={`${item.id}-${index}`}
          >
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB each</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Subtotal: {item.price * item.quantity} ETB
              </p>
            </div>

            <button
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
        <h3>Total: {total} ETB</h3>

        <button
          onClick={() =>
            dispatch({
              type: "CLEAR",
            })
          }
        >
          Clear Cart
        </button>

        <Link to="/checkout">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;