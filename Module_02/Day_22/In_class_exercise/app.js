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


// ==========================================
// API
// ==========================================

const API_URL = "https://open.er-api.com/v6/latest/ETB";


// ==========================================
// APPLICATION STATE
// ==========================================

const state = {
    rates: {},
    currencies: [],
    selectedCurrency: "",
    amount: 0,
    result: null,
    watchlist: [],
    status: "idle"
};


// ==========================================
// LOCAL STORAGE
// ==========================================

function loadFromStorage() {
    const savedWatchlist = localStorage.getItem("currencyWatchlist");
    const savedCurrency = localStorage.getItem("selectedCurrency");
    const savedAmount = localStorage.getItem("amount");

    if (savedWatchlist) {
        try {
            state.watchlist = JSON.parse(savedWatchlist);
        } catch (error) {
            console.error("Could not load watchlist:", error);
            state.watchlist = [];
        }
    }

    if (savedCurrency) {
        state.selectedCurrency = savedCurrency;
    }

    if (savedAmount) {
        state.amount = Number(savedAmount);
    }
}


function saveToStorage() {
    localStorage.setItem(
        "currencyWatchlist",
        JSON.stringify(state.watchlist)
    );

    localStorage.setItem(
        "selectedCurrency",
        state.selectedCurrency
    );

    localStorage.setItem(
        "amount",
        String(state.amount)
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

        if (currency === state.selectedCurrency) {
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
                ${item.amount.toFixed(2)} ETB =
                ${item.convertedAmount.toFixed(2)} ${item.currency}
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
// FETCH EXCHANGE RATES
// ==========================================

async function loadRates() {
    state.status = "loading";
    renderStatus();

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

        renderCurrencies();
        renderStatus();

    } catch (error) {
        console.error("Failed to load rates:", error);

        state.status = "error";

        renderStatus();
    }
}


// ==========================================
// CURRENCY CONVERSION
// ==========================================

function convertCurrency() {
    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    // Validate amount
    if (!amount || amount <= 0) {
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
    state.selectedCurrency = currency;

    // Calculate conversion
    const convertedAmount = amount * rate;

    state.result = convertedAmount;

    // Save user's choices
    saveToStorage();

    // Display result
    resultEl.textContent =
        `${amount.toFixed(2)} ETB = ` +
        `${convertedAmount.toFixed(2)} ${currency}`;
}


// ==========================================
// ADD TO WATCHLIST
// ==========================================

function addToWatchlist() {
    const currency = state.selectedCurrency;

    if (!currency) {
        resultEl.textContent =
            "Please select a currency first.";
        return;
    }

    if (state.result === null) {
        resultEl.textContent =
            "Please convert an amount first.";
        return;
    }

    // Prevent duplicate currencies
    const alreadyExists = state.watchlist.some(
        item => item.currency === currency
    );

    if (alreadyExists) {
        resultEl.textContent =
            `${currency} is already in your watchlist.`;
        return;
    }

    // Add the conversion to the watchlist
    state.watchlist.push({
        currency: currency,
        amount: state.amount,
        convertedAmount: state.result
    });

    // Save
    saveToStorage();

    // Render
    renderWatchlist();

    resultEl.textContent =
        `${currency} added to your watchlist.`;
}


// ==========================================
// REMOVE FROM WATCHLIST
// ==========================================

function removeFromWatchlist(currency) {
    state.watchlist = state.watchlist.filter(
        item => item.currency !== currency
    );

    saveToStorage();

    renderWatchlist();
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
    state.selectedCurrency = event.target.value;

    saveToStorage();
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

    // Render existing watchlist
    renderWatchlist();

    // Show initial status
    renderStatus();

    // Load live exchange rates
    loadRates();
}


// ==========================================
// START APP
// ==========================================

init();