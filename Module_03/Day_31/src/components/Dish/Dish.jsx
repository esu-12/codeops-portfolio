import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

import "./Dish.css";

function Dish({
  id,
  name,
  price,
  spicy,
  currency,
  image,
}) {
  const [count, setCount] = useState(0);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const handleAdd = () => {
    setCount((previousCount) => previousCount + 1);

    addToCart({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <article className="dish-card">

      {/* Food Image */}
      <div className="dish-card__image">
        <img
          src={image}
          alt={name}
        />

        {spicy && (
          <span className="dish-card__spicy">
            🌶️ Spicy
          </span>
        )}
      </div>

      {/* Food Information */}
      <div className="dish-card__content">

        <h3>
          <Link to={`/menu/${id}`}>
            {name}
          </Link>
        </h3>

        <p className="dish-card__description">
          Traditional Ethiopian dish prepared
          with authentic spices and fresh
          ingredients.
        </p>

        <div className="dish-card__footer">

          <span className="dish-card__price">
            {currency} {price}
          </span>

          <button
            type="button"
            onClick={handleAdd}
            className="dish-card__add"
          >
            + Add
          </button>

        </div>

        {count > 0 && (
          <p className="dish-card__added">
            Added: {count}
          </p>
        )}

      </div>
    </article>
  );
}

Dish.defaultProps = {
  currency: "ETB",
  spicy: false,
};

Dish.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  image: PropTypes.string,
};

export default Dish;