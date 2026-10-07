# Addis Eats Server / Client Boundaries

## Server Components

### `app/layout.js`
Runs on the server because the root layout does not need browser APIs,
React state, or event handlers.

It renders the global Header, Providers, page content, and Footer.

### `app/(pages)/menu/page.jsx`
Runs on the server because it fetches menu data from the backend.

It:
- Fetches `/menu/`
- Maps the menu data
- Adds local image paths
- Reads the category from `searchParams`
- Filters the dishes
- Passes the resulting dishes to `DishList`

No `useState`, `useEffect`, or browser APIs are needed.

### `app/(components)/(DishList)/DishList.jsx`
Runs on the server because it only renders the dish data.

It does not use:
- React state
- Effects
- Browser APIs
- Event handlers

It uses `next/image` and `next/link`, which can be used from a server component.

### `app/(pages)/menu/[id]/page.js`
Runs on the server because it fetches the menu data and finds the
requested dish using the dynamic route parameter.

It also uses `notFound()` for missing dishes.

---

## Client Components

### `app/(components)/(Header)/Header.jsx`
Runs on the client because it uses `usePathname()` to determine the
active navigation item.

### `app/(components)/CategoryBar/CategoryBar.jsx`
Runs on the client because it uses `useSearchParams()` to read the
currently selected category.

The category links provide interactive navigation.

### `app/(components)/FilterShell/FilterShell.jsx`
Runs on the client because it contains the interactive `CategoryBar`.

The server-rendered `DishList` is passed into it through `children`
instead of importing the server component into the client component.

This keeps the client boundary as small as possible.

### `app/providers.jsx`
Runs on the client because the cart provider uses React state and
context.

It manages:
- Cart items
- Adding items
- Clearing the cart
- Total item count
- Total price

### `app/(pages)/(auth)/login/page.jsx`
Runs on the client because the login form uses React state and
client-side navigation.

### `app/(pages)/(auth)/register/page.jsx`
Runs on the client because the registration form uses React state and
client-side navigation.

### `app/(pages)/checkout/page.jsx`
Runs on the client because checkout uses form state, cart context,
and client-side navigation.

### `app/(pages)/error.jsx`
Runs on the client because Next.js error boundaries require a client
component.

---

## Composition Pattern

The menu uses a server/client composition pattern:

MenuPage (Server)
    |
    v
FilterShell (Client)
    |
    +-- CategoryBar (Client)
    |
    +-- children
          |
          +-- DishList (Server)

The server `DishList` is passed to the client `FilterShell` through
`children`.

This avoids moving the entire menu page into the client bundle just
because the category filter is interactive.

---

## Summary

The application deliberately keeps data fetching and rendering on the
server whenever possible.

Client components are limited to places that require:
- React state
- React context
- Browser/client navigation APIs
- Search parameters
- Interactive forms
- Next.js error boundaries