# Addis Eats — Live Data Strategy

## 1. Individual order status

- **SWR key:** `/api/orders/${initialOrder.id}`
- **Fetcher:** `lib/fetcher.js`
- **Initial data:** The server-rendered order is passed to the client as
  `fallbackData`.
- **Refresh rule:** `refreshInterval: 5000` polls every five seconds.
- **Focus rule:** `revalidateOnFocus: true` checks again when the browser
  window regains focus.
- **Retry rule:** `shouldRetryOnError: true` allows SWR to retry failed
  requests.
- **Freshness rationale:** SWR does not expose a native `staleTime` option.
  The five-second polling interval controls regular refreshes; cached data
  remains visible while a refresh is in progress or fails. `fallbackData`
  prevents an empty first render while the client request starts.

## 2. Menu search and pagination

- **SWR key when searching:**
  `/api/dishes/search?q=${encodeURIComponent(query)}&page=${page}`
- **SWR key when the search term is empty:** `null`
- **Fetcher:** `lib/fetcher.js`
- **Debounce:** 350 milliseconds after typing stops.
- **Pagination:** The page is included in both the URL query string and
  the SWR key, so each search/page combination has its own cache entry.
- **Previous results:** `keepPreviousData: true` retains the previous result
  set while the next search or page is loading.
- **Focus rule:** `revalidateOnFocus: false` avoids an automatic search
  refresh every time the browser window regains focus.
- **Freshness rationale:** SWR has no native `staleTime` setting. It caches
  responses by key and revalidates according to its revalidation settings.
  No polling is configured for search results because the menu search is
  not expected to change continuously. A new key triggers the corresponding
  request, while previous results remain visible during the transition.

## 3. Existing server-rendered menu

- **Data source:** The external Addis Eats backend `/menu/` endpoint.
- **Refresh rule:** `export const revalidate = 60`.
- **Freshness rationale:** Next.js may reuse the server-fetched menu for
  up to 60 seconds before revalidating it. This is a Next.js data freshness
  rule, not an SWR `staleTime`.

## 4. Existing dish API

- **Endpoint:** `/api/dishes`
- **Behavior:** Returns the mock dish collection from `lib/db.js`.
- **Refresh rule:** No SWR polling is configured for this endpoint.
  It remains available for callers that need the complete mock collection.

## Notes

- SWR cache entries are separated by their keys.
- Empty search terms use a null key and therefore do not trigger a search
  request.
- Search and pagination currently use the mock dishes in `lib/db.js`.
  The main menu continues to use the external backend.
- The mock order store is in memory and is not durable across server
  restarts.
