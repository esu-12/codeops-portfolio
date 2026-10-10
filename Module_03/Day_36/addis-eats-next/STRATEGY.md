# Addis Eats Rendering Strategy

## Purpose

This document records the rendering strategy for each Addis Eats route. The table below is based on the successful production build output.

## Route Strategy Table

| Route              | Build indicator | Strategy                 | Reason                                                                      |
| ------------------ | --------------- | ------------------------ | --------------------------------------------------------------------------- |
| `/`                | `○`             | Static                   | The home page is pre-rendered.                                              |
| `/_not-found`      | `○`             | Static                   | The not-found page is pre-rendered.                                         |
| `/api/dishes`      | `ƒ`             | Dynamic API              | The API handler responds to requests for the dish collection.               |
| `/api/dishes/[id]` | `ƒ`             | Dynamic API              | The API handler looks up a dish using the requested ID.                     |
| `/api/orders`      | `ƒ`             | Dynamic API              | The API handler validates and processes order submissions.                  |
| `/cart`            | `○`             | Static                   | The page shell is pre-rendered; cart interactions run on the client.        |
| `/checkout`        | `○`             | Static                   | The page is pre-rendered; checkout interactions run on the client.          |
| `/login`           | `○`             | Static                   | The login page is pre-rendered; form interactions run on the client.        |
| `/menu`            | `ƒ`             | Dynamic server rendering | Menu data is fetched on the server when the route is requested.             |
| `/menu/[id]`       | `ƒ`             | Dynamic server rendering | The requested dish is resolved on the server.                               |
| `/order`           | `ƒ`             | Dynamic server rendering | The order route is rendered on demand.                                      |
| `/register`        | `○`             | Static                   | The registration page is pre-rendered; form interactions run on the client. |

## Build Verification

The production build completed successfully using `npm run build`.

Next.js reported:

- `○` — Static, prerendered as static content.
- `ƒ` — Dynamic, server-rendered on demand.

The route table above matches the build output.

## Endpoint Verification

The API endpoints must also be tested against the running production server with `curl`. A successful build does not by itself prove that API responses, validation, or error handling work correctly.

## Final Verification

After endpoint and failure testing, update `README.md` with the final build output, endpoint status codes, and verification commands.
