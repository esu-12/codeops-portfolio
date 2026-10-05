import DishList from "../../(components)/(DishList)/DishList";
import CategoryBar from "../../(components)/CategoryBar/CategoryBar";
import FilterShell from "../../(components)/FilterShell/FilterShell";

import "./menu.css";

export const revalidate = 60;

const API_URL = "https://addis-eats-backend.onrender.com";


/* =========================
   Image Mapping
========================= */

const imageMap = {

  "Classic Doro Wat":
    "/images/doro-wat.jpg",

  "Prime Siga Wat (Beef Stew)":
    "/images/Prime Siga Wat (Beef Stew).jpg",

  "Beg Alicha Wat (Mild Lamb Stew)":
    "/images/Beg Alicha Wat (Mild Lamb Stew).jpg",

  "Highland Red Misir Wat":
    "/images/Highland Red Misir Wat.jpg",

  "Golden Kik Alicha":
    "/images/Golden Kik Alicha.jpg",

  "Braised Ye'abesha Gomen":
    "/images/Braised Ye'abesha Gomen.jpg",

  "Shiro Bozena (Beef Enriched Shiro)":
    "/images/Shiro Bozena (Beef Enriched Shiro).jpg",

  "Clay-Pot Shiro Tegamino":
    "/images/Clay-Pot Shiro Tegamino.jpg",

  "Crisp Siga Derek Tibs":
    "/images/Crisp Siga Derek Tibs.jpg",

  "Awaze Lamb Tibs":
    "/images/Awaze Lamb Tibs.jpg",

  "Addis Style Dulet":
    "/images/Addis Style Dulet.jpg",

  "Lake Tana Crispy Fish Tibs":
    "/images/Lake Tana Crispy Fish Tibs.jpg",

  "Prime Beef Kitfo":
    "/images/Prime Beef Kitfo.jpg",

  "Highland Gored Gored":
    "/images/Highland Gored Gored.jpg",

  "Fresh Timatim Fitfit":
    "/images/Fresh Timatim Fitfit.jpg",

  "Spicy Quanta Firfir":
    "/images/Spicy Quanta Firfir.jpg",

  "Traditional Jebena Coffee":
    "/images/Traditional Jebena Coffee.jpg",

  "Highland Spiced Shai":
    "/images/Highland Spiced Shai.jpg",

  "House Fermented Tej (500ml Carafe)":
    "/images/House Fermented Tej (500ml Carafe).jpg",
};


/* =========================
   Menu Page
========================= */

export default async function MenuPage({ searchParams }) {

  const response = await fetch(`${API_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();

  const dishes = result.data || [];


  /* =========================
     Add Local Images
  ========================= */

  const dishesWithImages = dishes.map((dish) => ({
    ...dish,
    image: imageMap[dish.nameEn],
  }));


  /* =========================
     Read Category
  ========================= */

  const params = await searchParams;

  const selectedCategory =
    params?.category || "All";


  /* =========================
     Filter Dishes
  ========================= */

  const filteredDishes =
    selectedCategory === "All"
      ? dishesWithImages
      : dishesWithImages.filter(
          (dish) =>
            dish.category === selectedCategory
        );


  return (
    <main className="menu-page">

      {/* =========================
          Hero
      ========================= */}

      <section className="menu-hero">

        <span className="menu-label">
          AUTHENTIC ETHIOPIAN CUISINE
        </span>

        <h1>
          Addis Eats Menu
        </h1>

        <p>
          Discover authentic Ethiopian flavors,
          from traditional wat to sizzling tibs
          and delicious vegan dishes.
        </p>

      </section>


      {/* =========================
          Menu Content
      ========================= */}

      <FilterShell>

        <CategoryBar />


        <div className="menu-dishes">

          <div className="menu-heading">

            <span>
              OUR MENU
            </span>

            <h2>
              {selectedCategory === "All"
                ? "Today's Dishes"
                : selectedCategory}
            </h2>

            <p>
              Freshly prepared Ethiopian favorites
              made with traditional ingredients.
            </p>

          </div>


          {/* =========================
              Dish List
          ========================= */}

          {filteredDishes.length > 0 ? (

            <DishList
              dishes={filteredDishes}
            />

          ) : (

            <p className="no-dishes">
              No dishes found in this category.
            </p>

          )}

        </div>

      </FilterShell>

    </main>
  );
}