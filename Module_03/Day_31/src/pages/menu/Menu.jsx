import { useMemo, useState } from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  useCartTotalItems,
  useCartTotalPrice,
} from "../../store/cartStore";

import CategoryBar from "../../components/CategoryBar/CategoryBar.jsx";
import DishList from "../../components/DishList/DishList.jsx";

import useFetch from "../../hooks/useFetch.js";

import { API_URL } from "../../api.js";

import "./Menu.css";

function Menu() {
  /* =====================================================
     URL CATEGORY
  ===================================================== */

  const [searchParams, setSearchParams] =
    useSearchParams();

  /* =====================================================
     SEARCH
  ===================================================== */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* =====================================================
     CART
  ===================================================== */

  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();

  /* =====================================================
     CURRENT CATEGORY
  ===================================================== */

  const category =
    searchParams.get("category") || "All";

  /* =====================================================
     LOAD MENU
  ===================================================== */

  const {
    data: result,
    loading,
    error,
  } = useFetch(`${API_URL}/menu/`);

  const dishes = result?.data || [];

  /* =====================================================
     FILTER DISHES
  ===================================================== */

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {

      const matchesCategory =
        category === "All" ||
        dish.category === category;

      const matchesSearch =
        String(dish.nameEn || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    dishes,
    category,
    searchTerm,
  ]);

  /* =====================================================
     CATEGORY CHANGE
  ===================================================== */

  function handleCategoryChange(
    newCategory
  ) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: newCategory,
      });
    }
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="menu-page">
        <div className="menu-loading">
          Loading menu...
        </div>
      </main>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <main className="menu-page">
        <div className="menu-empty">

          <h2>
            Unable to load the menu
          </h2>

          <p>
            Error: {error}
          </p>

        </div>
      </main>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="menu-page">

      {/* =================================================
          INTRO
      ================================================= */}

      <section className="menu-intro">

        <p className="menu-eyebrow">
          HANDCRAFTED ETHIOPIAN FLAVORS
        </p>

        <h1>
          Our Complete Culinary Heritage
        </h1>

        <p className="menu-description">
          Explore traditional Ethiopian dishes
          prepared with authentic spices, fresh
          ingredients, and 100% pure teff injera.
        </p>


        {/* SEARCH */}

        <div className="menu-search-box">

          <span
            className="menu-search-icon"
            aria-hidden="true"
          >
            🔍
          </span>

          <input
            className="menu-search"
            type="search"
            placeholder="Search dishes by name..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            aria-label="Search dishes"
          />

        </div>


        {/* FEATURE BADGES */}

        <div className="menu-badges">

          <span>
            100% Pure Teff Injera
          </span>

          <span>
            Fasting / Tsom Friendly
          </span>

          <span>
            Berbere Spiced
          </span>

        </div>

      </section>


      {/* =================================================
          CATEGORY BAR
      ================================================= */}

      <CategoryBar
        category={category}
        onSelect={handleCategoryChange}
      />


      {/* =================================================
          DISHES / FEATURED FOODS
      ================================================= */}

      <section
        id="featured"
        className="menu-dishes-section"
      >

        {filteredDishes.length === 0 ? (

          <div className="menu-empty">

            <h2>
              No dishes found
            </h2>

            <p>
              Try another search or choose
              a different category.
            </p>

          </div>

        ) : (

          <DishList
            dishes={filteredDishes}
          />

        )}

      </section>


      {/* =================================================
          COMMUNITY MESSAGE
      ================================================= */}

      <section className="menu-community">

        <div>

          <strong>
            Experience Communal Dining Around the Mesob
          </strong>

          <p>
            All platters are served with traditional
            Ethiopian hospitality and fresh house-made
            injera.
          </p>

        </div>

        <button type="button">
          Reserve a Group Mesob Table
        </button>

      </section>


      {/* =================================================
          CART BAR
      ================================================= */}

      {totalItems > 0 && (

        <div className="menu-cart-bar">

          <div className="menu-cart-bar__left">

            <div className="menu-cart-bar__icon">
              🛍️
              <span>
                {totalItems}
              </span>
            </div>


            <div className="menu-cart-bar__info">

              <div className="menu-cart-bar__summary">

                Selected: {totalItems}{" "}

                {totalItems === 1
                  ? "Item"
                  : "Items"}

                <strong>
                  {" "}• ETB{" "}
                  {totalPrice.toLocaleString()}
                </strong>

              </div>

              <p>
                Communal injera included •
                Ready for banquet checkout
              </p>

            </div>

          </div>


          <Link
            to="/cart"
            className="menu-cart-bar__button"
          >
            Proceed to Cart →
          </Link>

        </div>

      )}

    </main>
  );
}

export default Menu;