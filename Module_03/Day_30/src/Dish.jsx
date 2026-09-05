import PropTypes from "prop-types";
import { useState } from "react";

function Dish({ id, name, price, spicy, currency, image, dispatch }) {
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

      <button
  onClick={() => {
    setCount(count + 1);

    dispatch({
      type: "ADD",
      dish: {
        id: id,
        name: name,
        price: price
      }
    });
  }}
>
  Add
</button>
    </article>
  );
}

Dish.defaultProps = {
  currency: "ETB"
};

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

export default Dish;