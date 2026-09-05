

export async function loadDishes(signal) {
  const response = await fetch("/dishes.json", {
    signal
  });

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  return response.json();
}