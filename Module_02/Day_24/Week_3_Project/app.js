// ========================================
// DOM ELEMENTS
// ========================================

const menuEl = document.querySelector("#menu");
const searchEl = document.querySelector("#search");
const categoryButtons = document.querySelectorAll(".category-btn");

const cartEl = document.querySelector("#cart");
const cartTotalEl = document.querySelector("#cartTotal");

const checkoutForm = document.querySelector("#checkoutForm");

const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const addressEl = document.querySelector("#address");

const formErrorEl =
  document.querySelector("#form-error");

const confirmationEl =
  document.querySelector("#confirmation");



// ========================================
// ETHIOPIAN PHONE NUMBER VALIDATION
// ========================================

const PHONE = /^(?:0|251|\+251)?(?:9|7)\d{8}$/;


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
// STORAGE & CONSTANTS
// ========================================

const STORAGE_KEY = "addisEatsCart";
const FREE_DELIVERY_OVER = 500;
const DELIVERY_FEE = 30;
const CURRENCY = "ETB";

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

  if (!saved) {
    return;
  }

  try {

    const cart = JSON.parse(saved);

    if (Array.isArray(cart)) {
      state.cart = cart;
    }

  } catch (error) {

    console.error("Could not load cart:", error);

    state.cart = [];

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
          ${dish.price} ${CURRENCY}
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

// ========================================
// CALCULATE CART TOTAL
// ========================================

function cartTotal() {
  return state.cart.reduce(
    (sum, item) => {
      return sum + item.price * item.qty;
    },
    0
  );
}

// delivery calculation function
function deliveryFee() {
  const subtotal = cartTotal();

  if (subtotal === 0) {
    return 0;
  }

  if (subtotal >= FREE_DELIVERY_OVER) {
    return 0;
  }

  return DELIVERY_FEE;
}

// final total
function finalTotal() {
  return cartTotal() + deliveryFee();
}

// ========================================
// RENDER CART TOTAL
// ========================================

function renderTotal() {

  const subtotal = cartTotal();
  const delivery = deliveryFee();
  const total = finalTotal();

  cartTotalEl.textContent =
    `Subtotal: ${subtotal.toLocaleString()} ${CURRENCY}
     | Delivery: ${delivery.toLocaleString()} ${CURRENCY}
     | Total: ${total.toLocaleString()} ${CURRENCY}`;
}

// ========================================
// RENDER CART
// ========================================
function renderCart() {

  // Empty cart guard

  if (state.cart.length === 0) {

    cartEl.innerHTML = `
      <p class="empty-message">
        Your cart is empty.
      </p>
    `;

    renderTotal();

    return;
  }

  // Render cart items
  cartEl.innerHTML = state.cart.map((item) => {

    const itemTotal =
      item.price * item.qty;

    return `
      <article class="cart-item">

        <h3>${item.name}</h3>

        <p>
          ${item.price} ${CURRENCY} × ${item.qty}
        </p>

        <p>
          ${itemTotal} ${CURRENCY}
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

  // Render total separately
  renderTotal();

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

// validate ethiopian phone Number
function validate({ name, phone, address }) {

  if (!name.trim()) {
    return "Please enter your name.";
  }

  if (!PHONE.test(phone.trim())) {
    return "Enter a valid Ethiopian phone.";
  }

  if (!address.trim()) {
    return "Please enter your delivery address.";
  }

  if (state.cart.length === 0) {
    return "Your cart is empty.";
  }

  return "";
}

// placeOrder
function placeOrder(data) {

  const order = {
    ...data,
    items: state.cart,
    subtotal: cartTotal(),
    deliveryFee: deliveryFee(),
    total: finalTotal(),
    placedAt: new Date().toISOString()
  };

  console.log("Order placed:", order);

  state.cart = [];

  save();

  render();

  showConfirmation(order);
}

// confirmation
function showConfirmation(order) {

  confirmationEl.textContent =
    `Order placed successfully — ` +
    `Subtotal: ${order.subtotal.toLocaleString()} ${CURRENCY}, ` +
    `Delivery: ${order.deliveryFee.toLocaleString()} ${CURRENCY}, ` +
    `Total: ${order.total.toLocaleString()} ${CURRENCY}, ` +
    `for delivery to ${order.address}.`;
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

  // Clear old messages
  formErrorEl.textContent = "";
  confirmationEl.textContent = "";

  // Collect form data
  const data = {
    name: nameEl.value,
    phone: phoneEl.value,
    address: addressEl.value
  };

  // Validate
  const message = validate(data);

  formErrorEl.textContent = message;

  // Stop if validation failed
  if (message) {
    return;
  }

  // Place the order
  placeOrder(data);

  // Clear the form
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