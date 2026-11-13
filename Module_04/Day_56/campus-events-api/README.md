# Campus Events API

A RESTful Campus Events API built with NestJS and TypeScript.

## Features

- List all campus events.
- Retrieve upcoming events.
- Retrieve an event by ID.
- Retrieve all sessions for an event.
- Retrieve a specific session.
- Create new campus events.
- Filter events by category, location, and publication status.
- Sort events by title or event date.
- Paginate event results.
- Validate incoming event data.
- Return appropriate HTTP error responses.

## Technologies

- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer

## Installation

```bash
npm install
```

## Run the application

```bash
npm run start:dev
```

The API runs at:

http://localhost:3000/api

## API Endpoints

| Method | Endpoint                            | Description        |
| ------ | ----------------------------------- | ------------------ |
| GET    | /api/events                         | List events        |
| GET    | /api/events/upcoming                | Upcoming events    |
| GET    | /api/events/:id                     | Get one event      |
| GET    | /api/events/:id/sessions            | Get event sessions |
| GET    | /api/events/:id/sessions/:sessionId | Get one session    |
| POST   | /api/events                         | Create an event    |

## Query Parameters

The GET /api/events endpoint supports:

- category
- location
- isPublished
- sortBy (eventDate or title)
- order (asc or desc)
- page
- limit

Example:

/api/events?category=technology&sortBy=title&order=asc&page=1&limit=5

## Example POST Request

```json
{
  "title": "Campus Technology Expo",
  "description": "A showcase of student technology projects.",
  "location": "Main Campus",
  "eventDate": "2026-12-20T09:00:00.000Z",
  "category": "technology",
  "isPublished": true
}
```

## Testing

HTTP requests are documented in `requests.http`.

Tests cover:

- Listing and filtering events.
- Upcoming events.
- Sorting and pagination.
- Retrieving events and sessions.
- Creating events.
- Validation errors.
- Not-found errors.

## Data Storage

The project uses in-memory arrays for events and sessions. Data is reset when the server restarts.

## Build

```bash
npm run build
```
