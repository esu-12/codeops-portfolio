// app/(components)/(DishList)/DishList.jsx

import Link from "next/link";
import "./DishList.css";

export default function DishList({ dishes }) {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li className="dish-card" key={dish.id}>
          <div className="dish-card-content">
            <h3>{dish.nameEn}</h3>

            <p className="dish-name-am">
              {dish.nameAm}
            </p>

            <p className="dish-description">
              {dish.description}
            </p>

            <div className="dish-info">
              <p>
                <strong>Category:</strong> {dish.category}
              </p>

              <p className="dish-price">
                {dish.priceETB} ETB
              </p>

              <p>
                <strong>Spice:</strong> {dish.spiceLevel}
              </p>

              <p>
                <strong>Servings:</strong> {dish.servings}
              </p>
            </div>

            <Link
              className="view-dish"
              href={`/menu/dish/${dish.id}`}
            >
              View Dish →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}