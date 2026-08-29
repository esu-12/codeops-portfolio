import { useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";

function Menu({ dishes }) {
  const [category, setCategory] = useState("All");

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
