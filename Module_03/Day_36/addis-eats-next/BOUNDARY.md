# Addis Eats — Server and Client Component Boundaries

## Server Components

### MenuPage
**Location:** `app/(pages)/menu/page.jsx`

**Side:** Server

**Why:** Fetches the menu data from the backend and passes the data to `DishList`.

It uses an async Server Component:

```jsx
export default async function MenuPage()