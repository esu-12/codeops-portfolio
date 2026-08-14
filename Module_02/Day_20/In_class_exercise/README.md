# Fetch & Display Live Data

## API

This exercise uses **TheMealDB** public API:

https://www.themealdb.com/api/json/v1/1/search.php?s=

## Requirements

- [x] Show **Loading…** while fetching
- [x] Use `async` / `await`
- [x] Check `res.ok`
- [x] Throw an error if the request fails
- [x] Parse JSON with `await res.json()`
- [x] Render each item into `<ul id="list">`
- [x] Show a friendly error message on failure
- [x] Clear the loading state with `finally`
- [x] Bonus: **Refresh** button reloads the data

## Self-check

- Does the page show dishes when online?
- Does **Loading…** appear briefly before the data loads?
- If the API URL is changed to something invalid, do you see the friendly error message?
- Does the **Refresh** button fetch the data again without reloading the page?
