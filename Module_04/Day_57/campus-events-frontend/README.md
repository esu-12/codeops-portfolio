# CampusConnect – Campus Events Application

## Live Demo

- **Frontend:** https://campus-events-frontend-one.vercel.app/
- **Backend API:** https://campus-events-api.vercel.app/api
- **Events Endpoint:** https://campus-events-api.vercel.app/api/events

The frontend is deployed on Vercel and communicates with the production NestJS REST API.

## Project Overview

CampusConnect is a responsive campus events management application built with Next.js and TypeScript. It allows students and campus community members to discover events, explore event sessions, and create new events.

The frontend communicates with a NestJS REST API using the native Fetch API.

## Technologies Used

- Next.js 16
- React
- TypeScript
- CSS
- Native Fetch API
- NestJS REST API

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
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

Create a `.env.local` file in the project root.

For local development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

For production, the frontend uses:

```env
NEXT_PUBLIC_API_BASE_URL=https://campus-events-api.vercel.app/api
```

Make sure the NestJS backend is running on port 3001 during local development.

## Running the Application

Start the development server:

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

## API Integration

The frontend uses the native Fetch API to communicate with the Campus Events backend.

Available endpoints:

| Method | Endpoint                              | Purpose             |
| ------ | ------------------------------------- | ------------------- |
| GET    | `/api/events`                         | Get all events      |
| GET    | `/api/events/upcoming`                | Get upcoming events |
| GET    | `/api/events/:id`                     | Get event details   |
| GET    | `/api/events/:id/sessions`            | Get event sessions  |
| GET    | `/api/events/:id/sessions/:sessionId` | Get session details |
| POST   | `/api/events`                         | Create an event     |

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

## Backend Project

CampusConnect frontend connects to the NestJS Campus Events API developed in Module 4, Day 56.

**Production API:** https://campus-events-api.vercel.app/api

## Author

Esayas Nigussie
