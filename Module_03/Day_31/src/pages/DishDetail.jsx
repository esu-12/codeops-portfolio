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
      <Link to="/menu">← Back to Menu</Link>

      <h2>{dish.nameEn}</h2>

      <p>{dish.nameAm}</p>

      <p>{dish.priceETB} ETB</p>

      <p>{dish.description}</p>

      <p>
        <strong>Category:</strong> {dish.category}
      </p>

      <p>
        <strong>Spice Level:</strong> {dish.spiceLevel}
      </p>

      <p>
        <strong>Servings:</strong> {dish.servings}
      </p>

      {dish.isFasting && <p>🌱 Fasting friendly</p>}

      <h3>Ingredients</h3>

      <ul>
        {dish.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </article>
  );
}

export default DishDetail;