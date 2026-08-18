# Birr Watch

## JavaScript Project — Data-Driven Currency Converter

Birr Watch is a data-driven JavaScript web application that retrieves live exchange rates, converts Ethiopian Birr (ETB) into selected currencies, and maintains a persistent currency watchlist.

The project demonstrates practical frontend development concepts including **Fetch API, async/await, DOM manipulation, application state, event handling, event delegation, form validation, and localStorage**.

---

## Project Goal

The goal of this project is to build a functional currency conversion application that:

- Loads live exchange-rate data from a public API.
- Uses Ethiopian Birr (ETB) as the base currency.
- Allows users to enter an amount in ETB.
- Allows users to select a target currency.
- Calculates the converted amount using the current exchange rate.
- Automatically adds successful conversions to a watchlist.
- Prevents duplicate watchlist entries for the same currency and amount.
- Allows users to remove currencies from the watchlist.
- Persists application data using browser `localStorage`.
- Provides loading, success, and error states.
- Restores saved user choices after a page reload.

---

## Features

### Live Exchange Rates

The application retrieves live exchange-rate data from a public API using:

- `fetch()`
- `async/await`
- JSON

The API uses Ethiopian Birr (ETB) as the base currency.

---

### Currency Converter

Users can:

1. Enter an amount in ETB.
2. Select a target currency.
3. Click the **Convert** button.
4. See the converted amount.

For example:

```text
100 ETB → USD
```
