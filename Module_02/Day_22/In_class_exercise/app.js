// ==========================================
// DOM ELEMENTS
// ==========================================

const statusEl = document.querySelector("#status");
const form = document.querySelector("#convertForm");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const resultEl = document.querySelector("#result");
const watchlistEl = document.querySelector("#watchlist");
const emptyWatchlistEl = document.querySelector("#emptyWatchlist");
const STORAGE_KEY = "birrwatch";


// ==========================================
// API
// ==========================================

const API_URL = "https://open.er-api.com/v6/latest/ETB";


// ==========================================
// APPLICATION STATE
// ==========================================

const state = {
    base: "ETB",
    rates: {},
    currencies: [],
    currency: "USD",
    amount: 100,
    watchlist: [],
    result: null,
    status: "idle"
};


// ==========================================
// LOCAL STORAGE
// ==========================================

function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return;
    }

    try {
        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = data.watchlist;
        }

        if (typeof data.currency === "string") {
            state.currency = data.currency;
        }

        if (typeof data.amount === "number") {
            state.amount = data.amount;
        }

    } catch (error) {
        console.error("Could not load saved state:", error);

        state.watchlist = [];
        state.currency = "";
        state.amount = 0;
    }
}


function saveToStorage() {
    const savedState = {
        watchlist: state.watchlist,
        currency: state.currency,
        amount: state.amount
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedState)
    );
}


// ==========================================
// STATUS RENDERING
// ==========================================

function renderStatus() {
    if (state.status === "idle") {
        statusEl.textContent = "Ready.";
    }

    if (state.status === "loading") {
        statusEl.textContent = "Loading exchange rates...";
    }

    if (state.status === "success") {
        statusEl.textContent =
            "Exchange rates loaded successfully.";
    }

    if (state.status === "error") {
        statusEl.textContent =
            "Unable to load exchange rates. Please try again.";
    }
}


// ==========================================
// CURRENCY DROPDOWN
// ==========================================

function renderCurrencies() {
    currencySelect.innerHTML = "";

    const defaultOption = document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = "Select currency";

    currencySelect.appendChild(defaultOption);

    state.currencies.forEach(currency => {
        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        if (currency === state.currency) {
            option.selected = true;
        }

        currencySelect.appendChild(option);
    });
}


// ==========================================
// WATCHLIST RENDERING
// ==========================================

function renderWatchlist() {
    watchlistEl.innerHTML = "";

    if (state.watchlist.length === 0) {
        emptyWatchlistEl.hidden = false;
        return;
    }

    emptyWatchlistEl.hidden = true;

    state.watchlist.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${item.currency}:
                ${item.convertedAmount.toFixed(2)}
            </span>

            <button
                type="button"
                data-remove="${item.currency}"
            >
                Remove
            </button>
        `;

        watchlistEl.appendChild(li);
    });
}


// ==========================================
// CENTRAL RENDER
// ==========================================

function render() {
    renderStatus();
    renderCurrencies();
    renderWatchlist();
}

// ==========================================
// FETCH EXCHANGE RATES
// ==========================================

async function loadRates() {
    state.status = "loading";
    render();

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error(
                `HTTP error: ${res.status}`
            );
        }

        const data = await res.json();

        if (!data.rates) {
            throw new Error("API response does not contain rates.");
        }

        // Store rates in state
        state.rates = data.rates;

        // Get currency names
        state.currencies = Object.keys(state.rates)
            .filter(currency => currency !== "ETB")
            .sort();

        state.status = "success";

        render();

    } catch (error) {
        console.error("Failed to load rates:", error);

        state.status = "error";

        render();
    }
}


// ==========================================
// CURRENCY CONVERSION
// ==========================================

function convertCurrency() {
    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    // Validate amount
    if (Number.isNaN(amount) || amount <= 0) {
        resultEl.textContent =
            "Please enter a valid amount greater than 0.";
        return;
    }

    // Validate currency
    if (!currency) {
        resultEl.textContent =
            "Please select a currency.";
        return;
    }

    // Find exchange rate
    const rate = state.rates[currency];

    if (!rate) {
        resultEl.textContent =
            "Exchange rate is not available.";
        return;
    }

    // Update state
    state.amount = amount;
    state.currency = currency;

    // Calculate conversion
    const convertedAmount = amount * rate;

    state.result = convertedAmount;

    // Display result
    resultEl.textContent =
        `${amount.toFixed(2)} ETB = ` +
        `${convertedAmount.toFixed(2)} ${currency}`;

    // ==========================================
    // AUTOMATICALLY ADD TO WATCHLIST
    // ==========================================

    const alreadyExists = state.watchlist.some(item =>
        item.currency === currency &&
        item.amount === amount
    );

    if (!alreadyExists) {
        state.watchlist.push({
            currency: currency,
            amount: amount,
            convertedAmount: convertedAmount
        });
    }

    // Save everything
    saveToStorage();

    // Update watchlist
    render();
}


// ==========================================
// REMOVE FROM WATCHLIST
// ==========================================

function removeFromWatchlist(currency) {
    state.watchlist = state.watchlist.filter(
        item => item.currency !== currency
    );

    saveToStorage();

    render();
}

// ==========================================
// FORM EVENT
// ==========================================

form.addEventListener("submit", event => {
    event.preventDefault();

    convertCurrency();
});


// ==========================================
// CURRENCY SELECT EVENT
// ==========================================

currencySelect.addEventListener("change", event => {
    state.currency = event.target.value;

    saveToStorage();
    render();
});

// ==========================================
// WATCHLIST EVENT DELEGATION
// ==========================================

watchlistEl.addEventListener("click", event => {

    // Check whether a Remove button was clicked
    if (!event.target.matches("[data-remove]")) {
        return;
    }

    // Get currency from data-remove
    const currency = event.target.dataset.remove;

    removeFromWatchlist(currency);
});


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

function init() {
    // Load saved information first
    loadFromStorage();

    // Put saved amount back into input
    if (state.amount > 0) {
        amountInput.value = state.amount;
    }

    // Show initial status
    render();

    // Load live exchange rates
    loadRates();
}


// ==========================================
// START APP
// ==========================================

init();