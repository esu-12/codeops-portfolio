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
  image,
}) {
  const [count, setCount] = useState(0);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const handleAdd = () => {
    setCount(
      (previousCount) => previousCount + 1
    );

    addToCart({
      id,
      name,
      price: Number(price),
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

          {/* Price */}
          <span className="dish-card__price">
            {Number(price).toLocaleString()} ETB
          </span>

          {/* Add Button */}
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
  spicy: false,
};

Dish.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
};

export default Dish;