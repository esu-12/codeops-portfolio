// src/pages/DishDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../api.js";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await fetch(`${API_URL}/menu/`);

        if (!response.ok) {
          throw new Error("Could not load the dish.");
        }

        const result = await response.json();

        const foundDish = result.data.find(
          (item) => item.id === id
        );

        if (!foundDish) {
          throw new Error("Dish not found.");
        }

        setDish(foundDish);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDish();
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <article className="dish-detail">
      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail-content">
        <div className="dish-detail-image">
          <img
            src={
              dish.nameEn === "Classic Doro Wat"
                ? "/images/doro-wat.jpg"
                : dish.nameEn === "Prime Beef Kitfo"
                ? "/images/Prime Beef Kitfo.jpg"
                : dish.nameEn === "Crisp Siga Derek Tibs"
                ? "/images/Crisp Siga Derek Tibs.jpg"
                : "/images/shiro.jpg"
            }
            alt={dish.nameEn}
          />
        </div>

        <div className="dish-detail-info">
          <p className="dish-label">HOUSE SIGNATURE</p>

          {dish.isFasting && (
            <span className="fasting-badge">
              100% TEFF OPTION
            </span>
          )}

          <h2>{dish.nameEn}</h2>

          <p className="dish-amharic">{dish.nameAm}</p>

          <p className="dish-detail-price">
            {dish.priceETB} ETB
          </p>

          <p className="dish-detail-description">
            {dish.description}
          </p>

          <div className="dish-meta">
            <span>🌶️ {dish.spiceLevel}</span>
            <span>🍽️ Serves {dish.servings}</span>
          </div>

          <p>
            <strong>Category:</strong> {dish.category}
          </p>

          {dish.isFasting && (
            <p className="fasting-text">
              🌱 Fasting friendly
            </p>
          )}

          <h3>Ingredients</h3>

          <ul>
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default DishDetail;