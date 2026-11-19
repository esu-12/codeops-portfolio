# Campus Events API — Day 59

A RESTful Campus Events API built with NestJS and TypeScript. This Day59 version extends the original Campus Events API with request logging middleware, API key authentication guards, response timing interceptors, parameter parsing pipes, and DTO validation.

## Live API

- **Production API:** https://campus-events-api.vercel.app
- **Events Endpoint:** https://campus-events-api.vercel.app/api/events

> The production URL refers to the existing deployed API. The Day59 enhancements are currently configured and tested locally.

## Features

### Core API Features

- List all campus events.
- Retrieve upcoming events.
- Retrieve an event by ID.
- Retrieve all sessions for an event.
- Retrieve a specific session.
- Create new campus events.
- Filter events by category, location, and publication status.
- Sort events by title or event date.
- Paginate event results.

### NestJS Enhancements

- **Logging Middleware:** Logs incoming HTTP methods and request URLs.
- **API Key Guard:** Protects event creation using the `x-api-key` request header.
- **Timing Interceptor:** Logs request start and successful completion times.
- **ParseIntPipe:** Validates integer pagination parameters.
- **ValidationPipe:** Validates incoming DTOs, transforms values, and rejects unexpected properties.
- **HTTP Error Handling:** Returns appropriate HTTP error responses.

## Technologies

- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer
- @nestjs/config
- RxJS

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root:

```env
CLASSROOM_API_KEY=your_secret_api_key
```

Replace `your_secret_api_key` with your own secret value.

The API key is required for creating events. Never commit `.env` or expose the key in frontend code.

## Run the Application

Start the development server:

```bash
npm run start:dev
```

The local API runs at:

`http://localhost:3000/api`

Build the application:

```bash
npm run build
```

## API Endpoints

| Method | Endpoint                              | Description                        |
| ------ | ------------------------------------- | ---------------------------------- |
| GET    | `/api/events`                         | List events                        |
| GET    | `/api/events/upcoming`                | Retrieve upcoming events           |
| GET    | `/api/events/:id`                     | Retrieve one event                 |
| GET    | `/api/events/:id/sessions`            | Retrieve event sessions            |
| GET    | `/api/events/:id/sessions/:sessionId` | Retrieve one session               |
| POST   | `/api/events`                         | Create an event (API key required) |

## Query Parameters

The `GET /api/events` endpoint supports:

- `category`
- `location`
- `isPublished`
- `sortBy` (`eventDate` or `title`)
- `order` (`asc` or `desc`)
- `page` (integer)
- `limit` (integer)

Example:

```text
/api/events?category=technology&sortBy=title&order=asc&page=1&limit=5
```

Invalid pagination values, such as `page=abc`, return `400 Bad Request`.

## Creating an Event

Example request body:

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

Example request using curl:

```bash
API_KEY=$(sed -n 's/^CLASSROOM_API_KEY=//p' .env)

curl -i -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"title":"Campus Technology Expo","description":"A showcase of student technology projects.","location":"Main Campus","eventDate":"2026-12-20T09:00:00.000Z","category":"technology","isPublished":true}'

unset API_KEY
```

A successful request returns `201 Created`.

Requests without a valid API key return `401 Unauthorized`.

## Request Lifecycle

The application follows the NestJS request lifecycle:

1. **Middleware:** Logs the incoming HTTP method and URL.
2. **Guard:** Checks whether the request is authorized to access the protected route.
3. **Interceptor:** Logs request start time and measures execution duration.
4. **Pipe:** Parses and validates incoming parameters and request data.
5. **Controller:** Handles the incoming request and calls the appropriate service method.
6. **Service:** Executes the application logic and accesses event data.
7. **Response:** Returns the result or an appropriate HTTP error.

## Validation

The application uses `CreateEventDto` with class-validator decorators, including:

- `@IsString()`
- `@IsNotEmpty()`
- `@IsDateString()`
- `@IsBoolean()`

The global ValidationPipe is configured with:

```typescript
new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});
```

This configuration:

- Validates incoming request properties.
- Transforms incoming data into DTO instances.
- Rejects unexpected properties.
- Returns `400 Bad Request` for invalid input.

## Middleware, Guard, and Interceptor

### LoggerMiddleware

Located in:

`src/common/middleware/logger.middleware.ts`

Logs incoming request methods and original URLs for all routes.

### ApiKeyGuard

Located in:

`src/common/guards/api-key.guard.ts`

Checks the `x-api-key` header against `CLASSROOM_API_KEY` from the environment. It protects the event creation endpoint.

### TimingInterceptor

Located in:

`src/common/interceptors/timing.interceptor.ts`

Uses RxJS `tap()` to log request start and successful completion times.

### ParseIntPipe

Used on the `page` and `limit` query parameters in the events controller. Invalid integer values produce a `400 Bad Request` response.

## Testing

HTTP requests are documented in `requests.http`.

The Day59 implementation was manually tested using curl.

| Test                       | Expected Result       | Result |
| -------------------------- | --------------------- | ------ |
| GET all events             | 200 OK                | Passed |
| Invalid page parameter     | 400 Bad Request       | Passed |
| POST without API key       | 401 Unauthorized      | Passed |
| POST with valid API key    | 201 Created           | Passed |
| Invalid boolean DTO value  | 400 Bad Request       | Passed |
| Unexpected DTO property    | 400 Bad Request       | Passed |
| Middleware request logging | Request logged        | Passed |
| Timing interceptor         | Execution time logged | Passed |
| Production build           | Successful build      | Passed |

## Data Storage

The project uses in-memory arrays for events and sessions. Data is reset when the server restarts. This project does not currently use a persistent database.

## Project Structure

```text
src/
├── common/
│   ├── middleware/
│   │   └── logger.middleware.ts
│   ├── guards/
│   │   └── api-key.guard.ts
│   └── interceptors/
│       └── timing.interceptor.ts
├── events/
│   ├── dto/
│   │   └── create-event.dto.ts
│   ├── events.controller.ts
│   ├── events.service.ts
│   └── events.module.ts
├── app.module.ts
└── main.ts
```

## Build

```bash
npm run build
```

## Author

Esayas Nigussie
