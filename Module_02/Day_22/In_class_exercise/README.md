# Birr Watch

## JavaScript Project — Data-Driven App

### Project Goal

Build a working exchange-rate application that loads live exchange rates,
converts an amount from Ethiopian Birr (ETB) to a selected currency, and
allows users to save currencies to a watchlist.

The watchlist is stored in `localStorage` so it remains available after
refreshing the page.

---

## Features

- Fetch live exchange rates from a public API.
- Display loading, success, and error states.
- Select a currency from a dropdown.
- Enter an amount in ETB.
- Convert ETB to the selected currency.
- Add currencies to a watchlist.
- Prevent duplicate watchlist entries.
- Remove currencies from the watchlist.
- Use event delegation for removing watchlist items.
- Save the watchlist to `localStorage`.
- Restore the watchlist when the page loads.

---

## Files

- `index.html` - Application structure and form
- `styles.css` - Application styling
- `app.js` - State, API requests, conversion, rendering, and watchlist
- `README.md` - Project documentation

---

## API

This project uses the Frankfurter exchange-rate API:

https://api.frankfurter.app/

The application requests exchange rates using USD as the base currency
and uses the returned rates to perform currency conversion.

> Note: The application should verify the API response with `res.ok`
> before attempting to process the JSON response.

---

## Application State

The application keeps its data in a JavaScript state object.

Example:

```javascript
const state = {
  rates: {},
  watchlist: [],
  loading: false,
  error: null,
};
```

## Data Flow

API
↓
fetch()
↓
state.rates
↓
render()
↓
Currency dropdown
↓
User enters ETB amount
↓
Validate input
↓
Calculate conversion
↓
Display result

## Requirements

# API

Fetch exchange rates using fetch().
Use async/await.
Check res.ok.
Parse the response with res.json().
Store rates in application state.

# Loading and Error States

Show Loading... while rates are being fetched.
Show a success message after loading.
Show a friendly error message if the request fails.

# Currency Dropdown

Populate the dropdown from the API rates.
Allow the user to select a currency.

# Conversion

Read the ETB amount from the form.
Convert the input using Number().
Validate the amount.
Check that a valid currency has been selected.
Look up the selected exchange rate.
Display the converted amount.

# Watchlist

Add a currency to the watchlist.
Prevent duplicate currencies.
Render the watchlist from state.
Remove currencies using event delegation.
Update state after removal.
Re-render after changes.

# localStorage

Save the watchlist using JSON.stringify().
Load the watchlist using JSON.parse().
Restore the watchlist when the page loads.
Handle missing localStorage data safely.

## Self-Check List

Does the app load live exchange rates?
Does it show a loading message?
Does it handle API errors?
Does the currency dropdown populate?
Does the conversion form validate the amount?
Does the conversion show the correct result?
Can a currency be added to the watchlist?
Are duplicate currencies prevented?
Can a watchlist currency be removed?
Does event delegation handle removal?
Does the watchlist survive a page refresh?
Is the state the single source of truth?
Is the DOM rendered from state?
