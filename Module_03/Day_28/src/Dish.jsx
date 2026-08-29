import PropTypes from "prop-types";
import { useState } from "react";

function Dish({ name, price, spicy, currency, image }) {
  const [count, setCount] = useState(0);
  return (
    <article className="dish-card"> 
      <img src= {image} 
           alt= {name} 
          />
      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {spicy === true && <span>🌶️ Spicy</span>}

      <p>Added: {count} </p>

      <button onClick={() => setCount(count +1)}>
        Add
      </button>
    </article>
  );
}

Dish.defaultProps = {
  currency: "ETB"
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool
};

export default Dish;