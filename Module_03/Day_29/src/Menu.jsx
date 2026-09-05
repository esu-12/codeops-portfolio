import { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import { loadDishes } from "./api.js";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    loadDishes(controller.signal)
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [category]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <>
      <CategoryBar
        category={category}
        onSelect={setCategory}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </>
  );
}

export default Menu;