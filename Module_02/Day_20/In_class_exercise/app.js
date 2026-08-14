const list = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const refreshBtn = document.querySelector("#refreshBtn");

// Public API
const API_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function load() {
  // Show loading state
  statusEl.textContent = "Loading…";
  statusEl.className = "status loading";

  // Clear previous results
  list.innerHTML = "";

  try {
    // Fetch data
    const res = await fetch(API_URL);

    // Throw if the HTTP request failed
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // Parse JSON
    const data = await res.json();

    // Render each meal
    data.meals.forEach(meal => {
      const li = document.createElement("li");

      li.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div>
          <h3>${meal.strMeal}</h3>
          <p>${meal.strArea} • ${meal.strCategory}</p>
        </div>
      `;

      list.appendChild(li);
    });

    // Success message
    statusEl.textContent = `Loaded ${data.meals.length} dishes.`;
    statusEl.className = "status success";
  } catch (err) {
    // Friendly error message
    statusEl.textContent =
      "Sorry, we couldn’t load the dishes right now. Please try again.";
    statusEl.className = "status error";

    console.error(err);
  } finally {
    // Remove loading styling if it is still present
    statusEl.classList.remove("loading");
  }
}

// Bonus: refresh button
refreshBtn.addEventListener("click", load);

// Load immediately when the page opens
load();