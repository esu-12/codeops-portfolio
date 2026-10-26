# Addis Eats

Addis Eats is a Next.js application for browsing Ethiopian dishes, managing a cart, placing orders, and viewing order status. It also includes authentication, order history, a staff dashboard, and order-related API routes.

## Features

- Browse the menu and view individual dishes.
- Search and filter menu items.
- Add dishes to the cart and proceed to checkout.
- Validate customer and delivery details.
- View order history and order status.
- Staff dashboard with order and revenue views.
- Real-time order status updates using Server-Sent Events (SSE).
- Accessible keyboard navigation, visible focus indicators, and checkout submission feedback.
- Menu metadata, Open Graph images, sitemap, and robots configuration.

## Tech Stack

- Next.js App Router
- React
- JavaScript
- CSS
- Leaflet / React Leaflet for maps
- Server Actions and API routes

## Requirements

- Node.js version compatible with the project's Next.js version
- npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>/Module_03/Day_46/addis-eats-next
```

Replace the placeholders with your actual repository URL and folder path.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

On Windows, you can also create `.env.local` manually by copying `.env.example`.

Configure these variables in `.env.local`:

| Variable               | Purpose                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `SESSION_SECRET`       | Secret used to sign application sessions. Generate a strong, private random value. |
| `NEXT_PUBLIC_API_URL`  | Backend API URL used by the application.                                           |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the application, including metadata.                                  |

For local development, use the values from `.env.example`. Never commit `.env.local` or expose the real session secret.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Create a production build

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to test the production build locally.

## Important Routes

| Route               | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `/`                 | Home page                                       |
| `/menu`             | Browse menu                                     |
| `/menu/[id]`        | Individual dish                                 |
| `/cart`             | Shopping cart                                   |
| `/checkout`         | Checkout                                        |
| `/orders`           | Order history                                   |
| `/orders/[id]`      | Order details and status                        |
| `/track/[id]`       | Order tracking, if enabled in the current build |
| `/dashboard`        | Staff dashboard                                 |
| `/dashboard/orders` | Staff order management                          |
| `/login`            | Sign in                                         |
| `/register`         | Register                                        |

Routes that require authentication or staff access may redirect or deny access depending on the current session and role.

## Deployment

This project can be deployed to [Vercel](https://vercel.com/).

1. Import the repository into Vercel.
2. Set the project root directory to `Module_03/Day_46/addis-eats-next` if importing the repository root.
3. Configure the required environment variables in Vercel's project settings.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual deployed URL.
5. Set `NEXT_PUBLIC_API_URL` to the backend API URL.
6. Set `SESSION_SECRET` to a strong, unique production secret. Do not reuse a secret shared in chat or committed to a file.
7. Deploy and verify the home page, menu, checkout validation, authentication, order routes, and dashboard access.

**Live URL:** To be added after successful deployment.

## Data Storage Note

The current mock order store keeps orders in server memory. Orders may not persist across server restarts or server instances. Use a persistent database and appropriate server-side duplicate-order protection before relying on this application for real customer orders.

## Accessibility and Testing

Before release:

- Navigate interactive elements with `Tab` and `Shift + Tab`.
- Confirm focused elements have visible focus indicators.
- Verify interactive targets are at least 44 × 44 CSS pixels.
- Confirm checkout shows a loading state and prevents repeated clicks while submitting.
- Verify invalid or missing checkout details produce clear errors.
- Run:

```bash
npm run build
```

## Useful Resources

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel documentation](https://vercel.com/docs)
