import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function Dish({ id, name, price, spicy, currency, dispatch }) {
  const [count, setCount] = useState(0);

  return (
    <article className="dish-card">
      <h3>
  <Link to={`/menu/${id}`}>{name}</Link>
</h3>

      <p>
        {price} {currency}
      </p>

      {spicy && <span>🌶️ Spicy</span>}

      <p>Added: {count}</p>

      <button
        onClick={() => {
          setCount(count + 1);

          dispatch({
            type: "ADD",
            dish: {
              id: id,
              name: name,
              price: price,
            },
          });
        }}
      >
        Add
      </button>
    </article>
  );
}

Dish.defaultProps = {
  currency: "ETB",
};

Dish.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default Dish;