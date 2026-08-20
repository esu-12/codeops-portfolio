// ========================================
// DOM ELEMENTS
// ========================================

const menuEl = document.querySelector("#menu");
const searchEl = document.querySelector("#search");
const categoryButtons = document.querySelectorAll(".category-btn");

const cartEl = document.querySelector("#cart");
const cartTotalEl = document.querySelector("#cartTotal");

const checkoutForm = document.querySelector("#checkoutForm");
const checkoutMessageEl = document.querySelector("#checkoutMessage");


// ========================================
// STATE
// ========================================

const state = {
  dishes: [],
  cart: [],
  search: "",
  category: "All"
};


// ========================================
// STORAGE
// ========================================

const STORAGE_KEY = "addisEatsCart";


// ========================================
// SAVE CART
// ========================================

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.cart)
  );
}


// ========================================
// LOAD CART
// ========================================

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    state.cart = JSON.parse(saved);
  }
}


// ========================================
// LOAD MENU
// ========================================

async function loadMenu() {

  menuEl.textContent = "Loading menu...";

  try {

    const response = await fetch("data/menu.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    state.dishes = await response.json();

    render();

  } catch (error) {

    console.error("Menu loading error:", error);

    menuEl.textContent =
      "Could not load the menu.";

  }
}


// ========================================
// RENDER EVERYTHING
// ========================================

function render() {

  renderMenu();

  renderCart();

}


// ========================================
// RENDER MENU
// ========================================

function renderMenu() {

  const term = state.search.toLowerCase();

  const shown = state.dishes.filter((dish) => {

    const matchesSearch =
      dish.name.toLowerCase().includes(term);

    const matchesCategory =
      state.category === "All" ||
      dish.category === state.category;

    return matchesSearch && matchesCategory;

  });


  // No results

  if (shown.length === 0) {

    menuEl.innerHTML = `
      <p class="empty-message">
        No dishes found.
      </p>
    `;

    return;
  }


  // Render dishes

  menuEl.innerHTML = shown.map((dish) => {

    const spicyLabel = dish.spicy
      ? `<span>🌶️ Spicy</span>`
      : "";

    return `
      <article class="dish">

        <h3>${dish.name}</h3>

        <p>${dish.category}</p>

        <p class="price">
          ${dish.price} ETB
        </p>

        <p>
          ${spicyLabel}
        </p>

        <button
          type="button"
          data-action="add"
          data-id="${dish.id}"
        >
          Add
        </button>

      </article>
    `;

  }).join("");

}

// total calculation
function cartTotal() {
  return state.cart.reduce(
    (sum, item) => {
      return sum + item.price * item.qty;
    },
    0
  );
}


// ========================================
// RENDER CART
// ========================================

function renderCart() {

  if (state.cart.length === 0) {

    cartEl.innerHTML = `
      <p class="empty-message">
        Your cart is empty.
      </p>
    `;

    cartTotalEl.textContent = "Total: 0 ETB";

    return;
  }


  cartEl.innerHTML = state.cart.map((item) => {

    const itemTotal =
      item.price * item.qty;

    return `
      <article class="cart-item">

        <h3>${item.name}</h3>

        <p>
          ${item.price} ETB × ${item.qty}
        </p>

        <p>
          ${itemTotal} ETB
        </p>

        <div class="cart-controls">

          <button
            type="button"
            data-action="decrease"
            data-id="${item.id}"
            aria-label="Decrease ${item.name} quantity"
          >
            −
          </button>

          <span>${item.qty}</span>

          <button
            type="button"
            data-action="increase"
            data-id="${item.id}"
            aria-label="Increase ${item.name} quantity"
          >
            +
          </button>

          <button
            type="button"
            data-action="remove"
            data-id="${item.id}"
          >
            Remove
          </button>

        </div>

      </article>
    `;

  }).join("");


  cartTotalEl.textContent =
    `Total: ${cartTotal().toLocaleString()} ETB`;

}


// ========================================
// ADD TO CART
// ========================================

function addToCart(id) {

  const dish = state.dishes.find(
    (dish) => dish.id === id
  );

  if (!dish) {
    return;
  }


  const existingItem = state.cart.find(
    (item) => item.id === id
  );


  if (existingItem) {

    existingItem.qty += 1;

  } else {

    state.cart.push({
      ...dish,
      qty: 1
    });

  }


  save();

  render();

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(id) {

  const item = state.cart.find(
    (item) => item.id === id
  );

  if (!item) {
    return;
  }

  item.qty += 1;

  save();

  render();

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(id) {

  const item = state.cart.find(
    (item) => item.id === id
  );

  if (!item) {
    return;
  }


  item.qty -= 1;


  if (item.qty <= 0) {

    state.cart = state.cart.filter(
      (cartItem) => cartItem.id !== id
    );

  }


  save();

  render();

}


// ========================================
// REMOVE FROM CART
// ========================================

function removeFromCart(id) {

  state.cart = state.cart.filter(
    (item) => item.id !== id
  );

  save();

  render();

}


// ========================================
// MENU EVENT DELEGATION
// ========================================

menuEl.addEventListener("click", (event) => {

  const button = event.target.closest("button");

  if (!button) {
    return;
  }


  const action = button.dataset.action;
  const id = Number(button.dataset.id);


  if (action === "add") {
    addToCart(id);
  }

});


// ========================================
// CART EVENT DELEGATION
// ========================================

cartEl.addEventListener("click", (event) => {

  const button = event.target.closest("button");

  if (!button) {
    return;
  }


  const action = button.dataset.action;
  const id = Number(button.dataset.id);


  if (action === "increase") {

    increaseQuantity(id);

  } else if (action === "decrease") {

    decreaseQuantity(id);

  } else if (action === "remove") {

    removeFromCart(id);

  }

});


// ========================================
// SEARCH
// ========================================

searchEl.addEventListener("input", (event) => {

  state.search = event.target.value;

  renderMenu();

});


// ========================================
// CATEGORY FILTER
// ========================================

categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    state.category =
      button.dataset.category;


    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });


    button.classList.add("active");


    renderMenu();

  });

});


// ========================================
// CHECKOUT
// ========================================

checkoutForm.addEventListener("submit", (event) => {

  event.preventDefault();


  if (state.cart.length === 0) {

    checkoutMessageEl.textContent =
      "Your cart is empty.";

    return;
  }


  const formData =
    new FormData(checkoutForm);


  const name =
    formData.get("name").trim();

  const phone =
    formData.get("phone").trim();

  const address =
    formData.get("address").trim();


  if (!name || !phone || !address) {

    checkoutMessageEl.textContent =
      "Please complete all fields.";

    return;
  }


  checkoutMessageEl.textContent =
    `Thank you, ${name}! Your order has been received.`;


  checkoutForm.reset();

});




// ========================================
// START APPLICATION
// ========================================

async function init() {
  load();
  await loadMenu();
}

init();