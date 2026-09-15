import { useMemo, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { CartContext } from "./cart/CartProvider.jsx";
import { API_URL } from "./api.js";


function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

  const { data: result, loading, error } = useFetch(`${API_URL}/menu/`);
  const dishes = result?.data || [];

  const { dispatch } = useContext(CartContext);

  const filteredDishes = useMemo(() => {
    if (!dishes) {
      return [];
    }

    return category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);
  }, [dishes, category]);

  function handleCategoryChange(newCategory) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  }

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
        onSelect={handleCategoryChange}
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