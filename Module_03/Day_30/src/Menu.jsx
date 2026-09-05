import { useState, useMemo, useContext } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { CartContext } from "./cart/CartProvider.jsx";

function Menu() {
  const [category, setCategory] = useState("All");
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  // console.log("Dishes:", dishes);
  const { dispatch } = useContext(CartContext);

const filteredDishes = useMemo(() => {
  if (!dishes) {
    return [];
  }

  return category === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === category);
}, [dishes, category]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CategoryBar
        category={category}
        onSelect={setCategory}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <DishList
  dishes={filteredDishes}
  dispatch={dispatch}
/>
      )}
    </>
  );
}

export default Menu;