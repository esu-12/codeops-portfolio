import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency }) {
  return (
    <article>
      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {spicy === true && <span>🌶️ Spicy</span>}
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