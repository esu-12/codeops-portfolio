# Addis Eats Server / Client Boundaries

## Purpose

This document identifies where Addis Eats code runs and explains why each component belongs on the server or client.

## Server Components

### `app/layout.js`

The root layout is a Server Component because it does not need browser APIs, React state, or event handlers. It renders the shared application layout and wraps page content with the client-side providers.

### `app/page.js`

The home page is a Server Component unless it explicitly declares `"use client"`. Its final rendering strategy must be confirmed by the production build.

### `app/(pages)/menu/page.jsx`

The menu page is a Server Component. It fetches menu data, maps dish information and image paths, reads the selected category where supported by its route configuration, and renders the filtered menu.

Server rendering keeps data fetching out of the browser when possible.

### `app/(components)/(DishList)/DishList.jsx`

The dish list is a Server Component because it renders supplied dish data without requiring React state or browser APIs. `next/image` and `next/link` can be used in Server Components.

### `app/(pages)/menu/[id]/page.js`

The dynamic dish page runs on the server. It reads the route parameter, retrieves the requested dish, and uses `notFound()` when the dish does not exist.

### `app/(components)/FilterShell/FilterShell.jsx`

This component is a Client Component because it hosts interactive filtering. The server-rendered menu content can be passed through `children`, keeping the menu data-fetching logic on the server.

### `app/actions.js`

This file contains Server Actions and declares `"use server"`. It validates order data, creates orders, checks the session and order ownership during cancellation, and revalidates relevant paths.

Server Actions must enforce authorization and validation on the server; hiding a button in the UI is not a security boundary.

### API route handlers

These handlers run on the server:

- `app/api/dishes/route.js` — returns the dish collection.
- `app/api/dishes/[id]/route.js` — returns one dish or a `404` response.
- `app/api/orders/route.js` — validates order submissions and returns a `422` response for invalid input or `201` after creating an order.

## Client Components

### `app/(components)/(Header)/Header.jsx`

The Header is a Client Component because it uses client-side navigation information to identify the active navigation item.

### `app/(components)/CategoryBar/CategoryBar.jsx`

The CategoryBar is a Client Component because it reads URL search parameters and provides interactive category navigation.

### `app/providers.jsx`

The cart provider is a Client Component because it uses React context and state. It manages cart items, quantities, item removal, clearing the cart, item count, and total price.

### `app/(components)/AddToCartButton/AddToCartButton.jsx`

This is a Client Component because it handles button clicks, reads `localStorage`, navigates guests to login, and calls the cart provider to add a dish.

The local-storage login flag is a client-side UI check, not secure server-side authentication.

### `app/(components)/CancelOrderButton/CancelOrderButton.jsx`

This is a Client Component because it uses React state, `useTransition`, `window.confirm()`, and client-side navigation refresh. It calls the server action `cancelOrder()` to request cancellation.

### `app/(pages)/(auth)/login/page.jsx`

The login page is a Client Component because it manages form state, reads browser storage, validates user input, and navigates after login.

### `app/(pages)/(auth)/register/page.jsx`

The registration page is a Client Component because it manages form state and client-side navigation.

### `app/(pages)/cart/page.jsx`

The cart page uses client-side cart state. Confirm its directive and imports against the actual file.

### `app/(pages)/checkout/page.jsx`

The checkout page is a Client Component because it uses cart state, form interactions, and client-side navigation.

### Error boundary

`app/(pages)/error.jsx` is a Client Component because Next.js error boundaries require a Client Component.

## Composition Pattern

The menu keeps data fetching and dish rendering on the server while interactive filtering runs on the client.

```text
Menu Page (Server)
    |
    v
FilterShell (Client)
    |
    +-- CategoryBar (Client)
    |
    +-- children
          |
          +-- DishList (Server)
```

The server-rendered dish list is passed through `children`; the client filter shell does not import the server component directly.

## Security Notes

- Validate submitted data on the server.
- Check authorization inside Server Actions and API handlers.
- Do not treat `localStorage` flags as proof of authentication.
- Test invalid requests and unauthorized actions against the production server.

## Verification

Compare this document with the actual source files and the production build. Update any inaccurate component classification or missing route before submission.
