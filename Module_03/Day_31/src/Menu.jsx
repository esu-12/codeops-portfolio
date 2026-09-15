import { useMemo, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { CartContext } from "./cart/CartProvider.jsx";
import { API_URL } from "./api.js";


function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

  const category = searchParams.get("category") || "All";

  const { data: result, loading, error } = useFetch(`${API_URL}/menu/`);
  const dishes = result?.data || [];

  const { dispatch } = useContext(CartContext);

  const filteredDishes = useMemo(() => {
    if (!dishes) {
      return [];
    }

    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" ||
        dish.category === category;

      const matchesSearch =
        dish.nameEn
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, searchTerm]);

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
    <section className="menu-intro">
      <p className="menu-eyebrow">
        HANDCRAFTED ETHIOPIAN FLAVORS
      </p>

      <h1>Our Complete Culinary Heritage</h1>

      <p className="menu-description">
        Explore traditional Ethiopian dishes prepared with
        authentic spices, fresh ingredients, and 100% pure teff injera.
      </p>

      <input
        className="menu-search"
        type="search"
        placeholder="Search dishes..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="menu-badges">
        <span>100% Pure Teff Injera</span>
        <span>Fasting / Tsom Friendly</span>
        <span>Berbere Spiced</span>
      </div>
    </section>

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