# Campus Events API — Day 61

A RESTful Campus Events API built with NestJS and TypeScript. Day61 extends the Day59 backend with JWT authentication, user registration and login, password hashing, and role-based authorization while preserving the existing request lifecycle enhancements.

## Project Overview

Day61 is a separate enhancement of the Day59 project. The original Day56 and Day59 projects remain unchanged.

**Local API:** `http://localhost:3002/api`

**Existing production API:** https://campus-events-api.vercel.app

> The production URL refers to the existing deployed API. Day61 has been tested locally and is not represented as a production deployment.

## Features

### Core Events API

- List all campus events.
- Retrieve upcoming events.
- Retrieve an event by ID.
- Retrieve all sessions for an event.
- Retrieve a specific session.
- Create campus events.
- Filter events by category, location, and publication status.
- Sort events by title or event date.
- Paginate event results.

### Authentication and Authorization

- User registration through `POST /api/auth/register`.
- User login through `POST /api/auth/login`.
- Password hashing using bcrypt.
- JWT access-token generation and verification.
- Protected user profile endpoint.
- Role-based authorization using NestJS guards and decorators.
- Admin-only user role management.
- Registration assigns the default `STUDENT` role.
- Users cannot assign themselves elevated roles during registration.

### User Roles

| Role | Permissions |
|---|---|
| STUDENT | Register, log in, view events and sessions |
| ORGANIZER | Student permissions plus event creation |
| ADMIN | Organizer permissions plus user role management |

### Preserved Day59 Enhancements

- **Logger Middleware:** Logs incoming HTTP methods and request URLs.
- **API Key Guard:** Protects trusted server-to-server event imports.
- **Timing Interceptor:** Logs request start and execution timing.
- **ParseIntPipe:** Validates integer pagination parameters.
- **ValidationPipe:** Validates DTOs and rejects unexpected properties.
- **HTTP Error Handling:** Returns appropriate HTTP error responses.

## Technologies

- NestJS
- TypeScript
- Node.js
- JWT (`@nestjs/jwt`)
- Passport (`@nestjs/passport`, `passport-jwt`)
- bcrypt
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
PORT=3002
JWT_SECRET=your_long_random_jwt_secret
JWT_EXPIRES_IN=1d
CLASSROOM_API_KEY=your_secret_api_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
```

Use your own strong secret values. Do not commit `.env`, JWT secrets, API keys, passwords, or access tokens.

The application uses:
- `JWT_SECRET` to sign and verify JWTs.
- `CLASSROOM_API_KEY` to authorize trusted event imports.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` to create the initial administrator account.

The initial administrator password is hashed using bcrypt before being stored.

## Run the Application

Start the development server:

```bash
npm run start:dev
```

The local API runs at:

`http://localhost:3002/api`

Build the application:

```bash
npm run build
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Public |
| POST | `/api/auth/login` | Authenticate and receive JWT | Public |
| GET | `/api/auth/profile` | Retrieve authenticated user profile | JWT |

### Events

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/events` | List events | Public |
| GET | `/api/events/upcoming` | Retrieve upcoming events | Public |
| GET | `/api/events/:id` | Retrieve one event | Public |
| GET | `/api/events/:id/sessions` | Retrieve event sessions | Public |
| GET | `/api/events/:id/sessions/:sessionId` | Retrieve one session | Public |
| POST | `/api/events` | Create an event | ORGANIZER, ADMIN |
| POST | `/api/events/import` | Import an event | API key |

### User Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| PATCH | `/api/users/:id/role` | Update a user's role | ADMIN |

Protected JWT endpoints require:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The event import endpoint requires:

```http
x-api-key: YOUR_CLASSROOM_API_KEY
```

## Registration

Example request:

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "StudentPass123"
}
```

New registrations receive the `STUDENT` role by default. The registration DTO does not accept a user-supplied role.

## Login

Example request:

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "student@example.com",
  "password": "StudentPass123"
}
```

A successful login returns an access token, token type, and safe user information.

Example response structure:

```json
{
  "access_token": "YOUR_JWT_ACCESS_TOKEN",
  "token_type": "Bearer",
  "user": {
    "id": "USER_ID",
    "name": "Test Student",
    "email": "student@example.com",
    "role": "STUDENT"
  }
}
```

Never share or commit real access tokens.

## Role Management

Only administrators can change user roles.

Example request:

```http
PATCH /api/users/USER_ID/role
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

```json
{
  "role": "ORGANIZER"
}
```

Supported roles are `STUDENT`, `ORGANIZER`, and `ADMIN`.

The endpoint is protected by `JwtAuthGuard` and `RolesGuard`, with the `ADMIN` role required.

## Creating an Event

Event creation requires a valid JWT belonging to an `ORGANIZER` or `ADMIN`.

Example request body:

```json
{
  "title": "Campus Technology Expo",
  "description": "A showcase of student technology projects.",
  "location": "Main Campus",
  "eventDate": "2026-12-20T09:00:00.000Z",
  "category": "Technology",
  "isPublished": true
}
```

Example curl request:

```bash
curl -i -X POST http://localhost:3002/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ORGANIZER_TOKEN" \
  -d '{"title":"Campus Technology Expo","description":"A showcase of student technology projects.","location":"Main Campus","eventDate":"2026-12-20T09:00:00.000Z","category":"Technology","isPublished":true}'
```

A successful request returns `201 Created`.

A request without a valid JWT returns `401 Unauthorized`. An authenticated user without the required role receives `403 Forbidden`.

## API-Key Event Import

The Day59 API-key functionality is preserved through a separate import endpoint.

```http
POST /api/events/import
Content-Type: application/json
x-api-key: YOUR_CLASSROOM_API_KEY
```

A successful request returns `201 Created`. Missing or invalid API keys return `401 Unauthorized`.

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

## Request Lifecycle

The application follows the NestJS request lifecycle:

1. **Middleware:** Logs the incoming HTTP method and URL.
2. **Guards:** Checks JWT authentication, user roles, or API-key authorization.
3. **Interceptors:** Measures request execution timing.
4. **Pipes:** Parses and validates incoming parameters and request data.
5. **Controller:** Handles the request and calls the appropriate service.
6. **Service:** Executes application logic and accesses event or user data.
7. **Response:** Returns the result or an appropriate HTTP error.

## Validation

The application uses DTOs with class-validator decorators.

Examples include:

- `@IsString()`
- `@IsNotEmpty()`
- `@IsEmail()`
- `@MinLength()`
- `@MaxLength()`
- `@IsDateString()`
- `@IsBoolean()`
- `@IsEnum()`

The global ValidationPipe is configured with:

```typescript
new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});
```

This configuration validates incoming request properties, transforms data into DTO instances, and rejects unexpected properties.

## Security

- Passwords are hashed with bcrypt.
- JWTs are signed using an environment-based secret.
- Protected routes use JWT authentication guards.
- Role restrictions are enforced through a roles decorator and guard.
- Registration does not allow users to select elevated roles.
- Administrator credentials are loaded from environment variables.
- API keys and JWT secrets are not hardcoded into source files.

## Testing

The Day61 implementation was manually tested using curl.

| Test | Expected Result | Result |
|---|---|---|
| User registration | 201 Created | Passed |
| Admin login | 201 Created | Passed |
| Student login | 201 Created | Passed |
| JWT profile endpoint | 200 OK | Passed |
| Admin updates user role | 200 OK | Passed |
| Student creates event | 403 Forbidden | Passed |
| Organizer creates event | 201 Created | Passed |
| API-key event import | 201 Created | Passed |
| Invalid user ID for role update | 404 Not Found | Passed |
| Production build | Successful build | Passed |

## Data Storage

The project currently uses in-memory arrays for events, sessions, and users.

- Event and user data is reset when the server restarts.
- Seeded event data is loaded again when the application starts.
- The initial administrator is recreated from the configured environment credentials.
- Newly registered users and newly created events are not persisted across restarts.

The project does not currently use a persistent database. Database integration is required for persistent production data storage.

## Project Structure

```text
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── common/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── api-key.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   └── timing.interceptor.ts
│   └── middleware/
│       └── logger.middleware.ts
├── events/
│   ├── data/
│   ├── dto/
│   ├── types/
│   ├── events.controller.ts
│   ├── events.module.ts
│   └── events.service.ts
├── users/
│   ├── dto/
│   │   └── update-role.dto.ts
│   ├── types/
│   │   ├── user-role.enum.ts
│   │   └── user.interface.ts
│   ├── admin-seed.service.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Build

```bash
npm run build
```

## Author

Esayas Nigussie