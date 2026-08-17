# Birr Watch

## JavaScript Project — Data-Driven Currency Converter

Birr Watch is a data-driven JavaScript web application that retrieves live exchange rates, converts Ethiopian Birr (ETB) into selected currencies, and maintains a persistent currency watchlist.

The project demonstrates practical frontend development concepts including **Fetch API, async/await, DOM manipulation, application state, event delegation, form validation, and localStorage**.

---

## Project Goal

The goal of this project is to build a functional currency conversion application that:

- Loads live exchange-rate data from a public API.
- Uses Ethiopian Birr (ETB) as the base currency.
- Allows users to enter an amount in ETB.
- Allows users to select a target currency.
- Calculates the converted amount using the current exchange rate.
- Automatically saves conversions to a personal watchlist.
- Prevents duplicate watchlist currencies.
- Allows users to remove currencies from the watchlist.
- Persists the watchlist using browser `localStorage`.
- Provides clear loading, success, and error states.

---

## Features

### Live Exchange Rates

The application retrieves current exchange-rate data from a public API using `fetch()` and `async/await`.

The API uses **ETB as the base currency**, allowing the application to calculate conversions from Ethiopian Birr to other currencies.

### Currency Converter

Users can:

1. Enter an amount in ETB.
2. Select a target currency.
3. Click the **Convert** button.
4. Calculate the converted amount using the current exchange rate.

For example:

```text
300 ETB → ANG
```

The conversion result is calculated dynamically using the rate returned by the API.

### Dynamic Currency Dropdown

The currency dropdown is populated from the currencies returned by the API.

This means the application does not require a manually written list of currencies in the HTML.

### Automatic Watchlist

After a successful conversion, the selected currency and converted value are automatically added to the watchlist.

For example:

```text
Watchlist

ANG: 3.33                 Remove
USD: 5.31                 Remove
EUR: 4.92                 Remove
```

### Duplicate Prevention

The application checks whether a currency is already in the watchlist before adding it.

This prevents duplicate entries such as:

```text
ANG: 3.33
ANG: 3.33
ANG: 3.33
```

### Remove from Watchlist

Each watchlist item contains a **Remove** button.

Users can remove currencies without refreshing the page.

### Event Delegation

The watchlist uses event delegation so that one event listener on the watchlist container can handle dynamically created Remove buttons.

### Local Storage

The watchlist is stored in the browser using `localStorage`.

This allows the watchlist to survive a page refresh.

The application uses:

```javascript
JSON.stringify();
```

when saving data and:

```javascript
JSON.parse();
```

when loading data.

### Loading and Error States

The application provides feedback during API operations.

Possible states include:

```text
Loading exchange rates...
```

```text
Exchange rates loaded successfully.
```

```text
Unable to load exchange rates. Please try again.
```

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- `async/await`
- DOM Manipulation
- Event Listeners
- Event Delegation
- JSON
- Browser `localStorage`

---

## Project Structure

```text
Day_22/
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

### `index.html`

Contains the structure of the application, including:

- Application heading
- API status message
- Currency conversion form
- Amount input
- Currency dropdown
- Convert button
- Conversion result
- Watchlist section

### `styles.css`

Contains the visual design and layout of the application.

### `app.js`

Contains the application logic, including:

- DOM element selection
- Application state
- API requests
- Currency rendering
- Conversion calculations
- Watchlist management
- Event handling
- Local storage
- Application initialization

### `README.md`

Contains the project documentation, requirements, features, and implementation details.

---

## API

Birr Watch uses the **ExchangeRate-API open endpoint** to retrieve exchange-rate data.

API endpoint:

```text
https://open.er-api.com/v6/latest/ETB
```

The API response uses ETB as the base currency.

Example response structure:

```json
{
  "result": "success",
  "base_code": "ETB",
  "rates": {
    "USD": 0.0177,
    "EUR": 0.0164,
    "KES": 2.29,
    "GBP": 0.0139
  }
}
```

The application extracts the `rates` object and stores it in application state.

The API request is checked using `response.ok` before processing the response.

Example:

```javascript
const response = await fetch(API_URL);

if (!response.ok) {
  throw new Error("Failed to fetch exchange rates");
}

const data = await response.json();
```

---

## Application State

The application uses a central JavaScript state object as the main source of application data.

Example:

```javascript
const state = {
  rates: {},
  currencies: [],
  selectedCurrency: "",
  amount: 0,
  result: null,
  watchlist: [],
  status: "idle",
};
```

### State Properties

| Property           | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `rates`            | Stores exchange rates returned by the API |
| `currencies`       | Stores available currency codes           |
| `selectedCurrency` | Stores the currency selected by the user  |
| `amount`           | Stores the entered ETB amount             |
| `result`           | Stores the calculated conversion          |
| `watchlist`        | Stores saved currency conversions         |
| `status`           | Tracks loading, success, and error states |

---

## Data Flow

The application follows a state-driven data flow:

```text
Public API
    ↓
fetch()
    ↓
API response
    ↓
state.rates
    ↓
renderCurrencies()
    ↓
Currency dropdown
    ↓
User enters ETB amount
    ↓
User selects currency
    ↓
Convert
    ↓
Validate input
    ↓
Look up exchange rate
    ↓
Calculate conversion
    ↓
Update state
    ↓
Update watchlist
    ↓
localStorage
    ↓
Render watchlist
```

---

## Implementation Requirements

### API Integration

The application:

- Uses `fetch()` to request exchange-rate data.
- Uses `async/await`.
- Checks `response.ok`.
- Parses JSON using `response.json()`.
- Stores API rates in application state.
- Handles failed requests with `try...catch`.

### Loading and Error States

The application:

- Displays a loading message while rates are being retrieved.
- Displays a success message when rates load successfully.
- Displays a friendly error message when the API request fails.

### Currency Dropdown

The application:

- Retrieves currencies from the API response.
- Stores them in state.
- Dynamically creates dropdown options.
- Allows the user to select a target currency.

### Currency Conversion

The application:

- Reads the ETB amount from the form.
- Converts the input using `Number()`.
- Validates that the amount is greater than zero.
- Validates that a currency has been selected.
- Looks up the selected exchange rate.
- Calculates the converted value.
- Stores the conversion in application state.

### Watchlist

The application:

- Automatically adds a successful conversion to the watchlist.
- Prevents duplicate currency entries.
- Renders watchlist items from state.
- Provides a Remove button for each currency.
- Uses event delegation for dynamically generated Remove buttons.
- Updates state after a currency is removed.
- Re-renders the watchlist after changes.

### Local Storage

The application:

- Saves the watchlist using `JSON.stringify()`.
- Loads saved data using `JSON.parse()`.
- Restores the watchlist when the application starts.
- Safely handles missing or invalid stored data.
- Saves the user's selected currency and amount.

---

## Event Delegation

Instead of adding a separate event listener to every Remove button, the application listens for clicks on the watchlist container.

Example:

```javascript
watchlistEl.addEventListener("click", (event) => {
  if (!event.target.matches("[data-remove]")) {
    return;
  }

  const currency = event.target.dataset.remove;

  removeFromWatchlist(currency);
});
```

This approach works with watchlist items that are created dynamically.

---

## State and Rendering

The application follows a simple state-driven approach:

```text
User Action
     ↓
Update State
     ↓
Save State
     ↓
Render
     ↓
Update DOM
```

The state acts as the **single source of truth** for application data.

The DOM is updated based on the current state rather than being treated as the primary storage for application data.

---

## Validation

The conversion form validates user input before performing a calculation.

The application checks that:

- An amount has been entered.
- The amount is greater than zero.
- A currency has been selected.
- A valid exchange rate exists for the selected currency.

Invalid input is rejected before the conversion is performed.

---

## Running the Project

### Using VS Code Live Server

1. Open the `Day_22` folder in Visual Studio Code.
2. Open `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. The application will open in your browser.

An internet connection is required because exchange rates are loaded from the public API.

---

## Testing

The application should be tested for the following behaviors:

### API

- [ ] Live exchange rates load successfully.
- [ ] Loading status is displayed.
- [ ] Success status is displayed.
- [ ] API errors are handled gracefully.
- [ ] The currency dropdown is populated from API data.

### Conversion

- [ ] The user can enter an ETB amount.
- [ ] The user can select a currency.
- [ ] The application validates the amount.
- [ ] The application validates currency selection.
- [ ] The correct exchange rate is used.
- [ ] The converted value is calculated correctly.

### Watchlist

- [ ] A successful conversion is added to the watchlist.
- [ ] Duplicate currencies are prevented.
- [ ] Watchlist items display the currency and converted value.
- [ ] A currency can be removed.
- [ ] The Remove button works through event delegation.
- [ ] The watchlist updates without a page reload.

### Persistence

- [ ] The watchlist is saved to `localStorage`.
- [ ] The watchlist is restored after refreshing the page.
- [ ] Missing localStorage data is handled safely.
- [ ] Saved user choices are restored when the application loads.

### Application Architecture

- [ ] State is the single source of truth.
- [ ] API data is stored in state.
- [ ] The DOM is rendered from state.
- [ ] User actions update state.
- [ ] Changes are persisted when necessary.

---

## Learning Outcomes

This project demonstrates practical understanding of:

- JavaScript objects and arrays.
- Application state.
- DOM manipulation.
- Event handling.
- Event delegation.
- Form handling.
- Input validation.
- Fetch API.
- Promises.
- `async/await`.
- API integration.
- JSON data.
- Error handling.
- Dynamic rendering.
- Browser `localStorage`.
- `JSON.stringify()`.
- `JSON.parse()`.
- Data-driven user interfaces.

---

## Future Improvements

Possible future improvements include:

- Add currency names alongside currency codes.
- Add a currency search feature.
- Add a Refresh Rates button.
- Add timestamps showing when rates were last updated.
- Add historical exchange-rate charts.
- Add more detailed conversion information.
- Add responsive improvements for mobile devices.
- Add dark mode.
- Add sorting and filtering to the watchlist.
- Allow multiple conversions for the same currency at different amounts.

---

## Project Status

**Status:** Complete

Birr Watch successfully demonstrates a functional data-driven JavaScript application using live API data, currency conversion, dynamic rendering, event delegation, and persistent browser storage.

---

## Author

**Esayas Nigussie**

Module 02 — Day 22
