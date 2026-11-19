# CampusConnect – Campus Events Application

## Live Demo

- **Frontend:** https://campus-events-frontend-one.vercel.app/
- **Production Backend API:** https://campus-events-api.vercel.app/api
- **Events Endpoint:** https://campus-events-api.vercel.app/api/events

The frontend is deployed on Vercel and communicates with the production NestJS REST API.

**Note:** The Day57 frontend has also been integrated and tested locally with the enhanced Day59 NestJS backend. The current production links still refer to the existing Day56 deployment.

## Project Overview

CampusConnect is a responsive campus events management application built with Next.js and TypeScript. It allows students and campus community members to discover events, explore event sessions, and create new events.

The frontend communicates with a NestJS REST API using the native Fetch API. It also uses a secure Next.js API route to forward event creation requests to the Day59 backend with server-side API key authentication.

## Technologies Used

- Next.js 16
- React
- TypeScript
- CSS
- Native Fetch API
- NestJS REST API
- Server-side API routes
- API key authentication
- DTO validation

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── api/
│   │   └── events/
│   │       └── route.ts
│   ├── events/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── sessions/
│   │           └── [sessionId]/
│   │               └── page.tsx
│   └── create-event/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── EventCard.tsx
│   ├── SearchBar.tsx
│   ├── EventFilters.tsx
│   ├── Pagination.tsx
│   └── Loading.tsx
├── services/
│   └── eventService.ts
└── types/
    └── event.ts
```

## Installation

Clone the repository and navigate to the frontend directory.

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env.local` file in the frontend project root.

For local development with the Day59 backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
CLASSROOM_API_KEY=your_day59_api_key
```

Replace `your_day59_api_key` with the same secret configured in the Day59 backend `.env` file.

**Security:**
- Never expose the API key using a `NEXT_PUBLIC_` variable.
- Never commit `.env.local` or the actual API key.
- Keep the API key on the server side.
- Restart the Next.js development server after changing environment variables.

The Day59 backend should be running on port 3001.

## Running the Application

Start the Day59 backend in its own terminal:

```bash
npm run start:dev
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open:

http://localhost:3000

## Available Features

### Home Page

- Welcome section
- Upcoming events
- Event cards
- Navigation to all events

### All Events

- Browse campus events
- Search by event title
- Filter by category
- Filter by location
- Filter by publication status
- Sort by event date or title
- Ascending and descending order
- Pagination

### Event Details

- View full event information
- View related sessions

### Session Details

- View session title
- View start and end times
- View room information
- Navigate to the related event

### Create Event

- Create new campus events
- Enter event information
- Select category
- Choose publication status
- Submit data to the NestJS API
- Display success and error messages
- Secure server-side API key authentication

## API Integration

The frontend uses the native Fetch API to communicate with the Campus Events backend.

Available backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/upcoming` | Get upcoming events |
| GET | `/api/events/:id` | Get event details |
| GET | `/api/events/:id/sessions` | Get event sessions |
| GET | `/api/events/:id/sessions/:sessionId` | Get session details |
| POST | `/api/events` | Create an event |

### Secure Event Creation

The Day57 frontend uses a Next.js API route:

```text
POST /api/events
```

The route forwards the request to the Day59 backend and includes the private `x-api-key` header.

The API key is read from the server-side environment variable:

```env
CLASSROOM_API_KEY=your_day59_api_key
```

This prevents the secret key from being exposed in browser-side JavaScript.

## Day59 Backend Integration

The frontend was integrated locally with the enhanced Day59 NestJS backend.

The integration was tested successfully:

- Retrieving events from the Day59 API.
- Creating a new event through the frontend.
- Displaying the newly created event in the event listing.
- API key authentication for event creation.
- Receiving HTTP 400 for missing required title.
- Receiving HTTP 400 for an invalid event date.
- Receiving HTTP 400 for an invalid `isPublished` value.

The Day59 backend includes:

- Request logging middleware.
- API key authentication guard.
- Request timing interceptor.
- ParseIntPipe for integer query parameters.
- DTO validation using class-validator.
- Global ValidationPipe.

## Testing

Run ESLint:

```bash
npm run lint
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

Create a production build:

```bash
npm run build
```

## Backend Projects

The CampusConnect frontend was originally integrated with the Day56 NestJS Campus Events API.

It has also been integrated locally with the enhanced Day59 NestJS API.

The Day56 project remains unchanged.

**Production API:** https://campus-events-api.vercel.app/api

## Author

Esayas Nigussie