import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api.js";

function Home() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSpecials() {
      try {
        const response = await fetch(`${API_URL}/menu/specials`);

        if (!response.ok) {
          throw new Error("Failed to load today's specials");
        }

        const result = await response.json();

        setSpecials(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecials();
  }, []);

  if (loading) {
    return <p>Loading today's specials...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="home-page">
      <div className="home-hero">
        <h2>Today's Specials</h2>
        <p>Discover our chef's selected Ethiopian dishes.</p>
      </div>

      <div className="specials-grid">
        {specials.map((dish) => (
          <article key={dish.id} className="special-card">
            <h3>{dish.nameEn}</h3>

            <p>{dish.nameAm}</p>

            {dish.tagline && (
              <p>{dish.tagline}</p>
            )}

            <p className="category">{dish.category}</p>

            <p className="price">{dish.priceETB} ETB</p>
            <p>{dish.spiceLevel}</p>

            <p>{dish.description}</p>

            {dish.isFasting && (
              <span>Fasting</span>
            )}

            <br />

            <Link to={`/menu/${dish.id}`}>
              View Dish
            </Link>
          </article>
        ))}
      </div>

      <br />

      <Link className="view-menu" to="/menu">
        View Full Menu
      </Link>
    </section>
  );
}

export default Home;