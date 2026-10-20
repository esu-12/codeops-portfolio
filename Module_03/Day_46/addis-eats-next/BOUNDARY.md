# Addis Eats Server / Client Boundaries

## Purpose

This document describes where the Addis Eats App Router code executes and why components belong on the server or client. Classifications are based on the source directives and the current application structure.

## Server Components

### `app/layout.js`

The root layout is a Server Component. It defines document metadata and renders the shared header, providers, page content, and footer. It can render a Client Component such as `Providers` without becoming a Client Component itself.

### `app/page.js`

The home page is a Server Component because it does not declare `"use client"`.

### `app/(pages)/menu/page.jsx`

The menu page is an async Server Component. It fetches menu data on the server, maps dish data and image paths, applies route search parameters, and renders the menu. Its fetch uses a 60-second revalidation setting.

### `app/(pages)/menu/layout.jsx`

The menu layout is a Server Component. It adds the menu heading and wraps the nested route content.

### `app/(components)/(DishList)/DishList.jsx`

The dish list is a Server Component because its source does not declare `"use client"`. It renders the dish data supplied by its parent.

### `app/(components)/FilterShell/FilterShell.jsx`

FilterShell is a Server Component. It wraps its `children` in a section and does not declare `"use client"` or use client-only hooks.

### `app/(pages)/menu/[id]/page.js`

The individual dish page is an async Server Component. It resolves the route parameters and retrieves the requested dish on the server. It can use `notFound()` when a dish does not exist.

### Order pages

- `app/(pages)/orders/(history)/page.jsx` is a Server Component that reads the session and renders order history.
- `app/orders/[id]/page.js` is a Server Component that reads the session and resolves an individual order.
- `app/orders/[id]/OrderStatusClient.jsx` is a Client Component for interactive order-status behavior.

### `app/actions.js`

This file declares `"use server"` and exports Server Actions. The actions use server-side helpers for user verification, session management, order operations, and path revalidation. Authorization and input validation must be enforced by the action itself, not just by the user interface.

### API route handlers

These route handlers execute on the server:

- `app/api/dishes/route.js` — dish collection.
- `app/api/dishes/[id]/route.js` — individual dish lookup.
- `app/api/dishes/search/route.js` — dish search.
- `app/api/menu/route.js` — menu response.
- `app/api/orders/route.js` — order submission.
- `app/api/orders/[id]/route.js` — individual order lookup.
- `app/api/time/route.js` — time endpoint.

Their authentication, validation, status codes, and ownership checks must be verified against their implementation and with production requests.

### Other server-rendered files

- `app/robots.js` generates crawler rules.
- `app/sitemap.js` generates the sitemap.
- `app/opengraph-image.jsx` generates the site's Open Graph image.
- `app/(pages)/menu/[id]/opengraph-image.js` generates an individual dish Open Graph image.
- `app/not-found.js` defines the not-found UI.

## Client Components

### `app/(components)/(Header)/Header.jsx`

The header declares `"use client"` and supports client-side navigation behavior.

### `app/(components)/CategoryBar/CategoryBar.jsx`

The category bar declares `"use client"` for interactive category navigation.

### `app/(components)/SearchBar/SearchBar.jsx`

Verify the current source directive before assigning its boundary. The separate `app/(pages)/menu/SearchBox.jsx` explicitly declares `"use client"`.

### `app/providers.jsx`

The providers file declares `"use client"` and manages the cart context and related client-side state.

### `app/(components)/AddToCartButton/AddToCartButton.jsx`

This Client Component handles button clicks, reads browser storage, redirects guests to login, and invokes the cart provider. A local-storage login flag is not secure authentication.

### `app/(components)/CancelOrderButton/CancelOrderButton.jsx`

This Client Component handles interactive cancellation UI and calls a Server Action. The Server Action must independently validate the session and order ownership.

### `app/(components)/RequireAuth/RequireAuth.jsx`

This component declares `"use client"` and handles client-side access behavior. It is not a substitute for server-side authorization.

### Authentication pages

- `app/(pages)/(auth)/login/page.jsx` is a Client Component.
- `app/(pages)/(auth)/register/page.jsx` is a Client Component.

Both use client-side form behavior.

### Cart and checkout

- `app/(pages)/cart/page.jsx` is a Client Component that uses cart state.
- `app/(pages)/checkout/page.jsx` is a Client Component that manages checkout interactions.

### Error boundaries

- `app/(pages)/error.jsx` is a Client Component for route-level error handling.
- `app/error.js` is a Client Component for application-level error handling.

Next.js requires error boundary components to be Client Components.

## Composition Pattern

The menu route keeps data fetching and dish rendering on the server. `FilterShell` is a server-side wrapper, not a client-side filter boundary. Interactive child components, such as the category bar and search box, declare their own client boundaries.

```text
Menu Page (Server)
    |
    v
FilterShell (Server)
    |
    +-- SideBar (verify source directive)
    |
    +-- DishList (Server)
    |
    +-- Interactive child components (Client where declared)
```

A Server Component may render Client Components as children. The absence of `"use client"` in `FilterShell.jsx` means the wrapper itself does not create a client boundary.

## Security Notes

- Validate submitted data on the server.
- Enforce authentication and authorization inside Server Actions and API handlers.
- Check order ownership before allowing a user to access or cancel an order.
- Do not treat `localStorage` flags as proof of authentication.
- Test both valid and invalid requests against the production server.
- An unauthenticated request returning `401` does not prove that authenticated input validation or authorization works correctly.

## Verification

Compare this document with the current source code and the latest successful production build. Update it whenever component directives, route handlers, or authentication behavior change. Do not mark a security or failure check as passed until its result has been observed.