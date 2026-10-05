// app/(pages)/menu/page.jsx

import DishList from "../../(components)/(DishList)/DishList";
import CategoryBar from "../../(components)/CategoryBar/CategoryBar";
import FilterShell from "../../(components)/FilterShell/FilterShell";

export const revalidate = 60;

const API_URL = "https://addis-eats-backend.onrender.com";

export default async function MenuPage() {
  const response = await fetch(`${API_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();

  const dishes = result.data;

  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <p>Choose from our Ethiopian dishes.</p>

      <FilterShell>
        <CategoryBar />

        <h2>Today's Dishes</h2>

        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}