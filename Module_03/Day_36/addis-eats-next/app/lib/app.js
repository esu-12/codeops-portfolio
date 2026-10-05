const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMenu() {
  const response = await fetch(`${API_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  return response.json();
}

export async function getDish(id) {
  const response = await fetch(`${API_URL}/menu/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}