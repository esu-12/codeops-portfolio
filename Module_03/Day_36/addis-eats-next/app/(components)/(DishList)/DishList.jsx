// app/(components)/(DishList)/DishList.jsx

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import "./DishList.css";

export default function DishList({ dishes }) {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li className="dish-card" key={dish.id}>

          {dish.image ? (
            <div className="dish-image-wrapper">
              <Image
                className="dish-image"
                src={dish.image}
                alt={dish.nameEn}
                width={500}
                height={300}
              />
            </div>
          ) : (
            <div className="dish-image-placeholder">
              No image available
            </div>
          )}

          <div className="dish-card-content">

            <h3>{dish.nameEn}</h3>

            {dish.nameAm && (
              <p className="dish-name-am">
                {dish.nameAm}
              </p>
            )}

            {dish.description && (
              <p className="dish-description">
                {dish.description}
              </p>
            )}

            <div className="dish-info">

              <p>
                <strong>Category:</strong>{" "}
                {dish.category}
              </p>

              <p className="dish-price">
                {dish.priceETB} ETB
              </p>

              {dish.spiceLevel && (
                <p>
                  <strong>Spice:</strong>{" "}
                  {dish.spiceLevel}
                </p>
              )}

              {dish.servings && (
                <p>
                  <strong>Servings:</strong>{" "}
                  {dish.servings}
                </p>
              )}

            </div>

            <Link
              className="view-dish"
              href={`/menu/${dish.id}`}
            >
              View Dish →
            </Link>

            <AddToCartButton dish={dish} />

          </div>
        </li>
      ))}
    </ul>
  );
}