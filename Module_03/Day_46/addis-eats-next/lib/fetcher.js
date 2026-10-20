export async function fetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}
