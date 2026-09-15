export const API_URL =
  "https://addis-eats-backend.onrender.com";

export async function loadDishes(signal) {
  const response = await fetch(`${API_URL}/menu/`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();

  return result.data;
}