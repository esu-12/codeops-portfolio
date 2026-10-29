# Authentication and Authorization Verification

## Protected Routes

- `/checkout` — redirects unauthenticated users to sign in.
- `/dashboard` — requires an authenticated staff session.
- `/dashboard/orders` — deployment protection remains unverified because the deployed route returned 404.

## Security Tests

### Test 1 — Logged-out checkout

- **Action:** Opened `/checkout` in a private browser window while logged out.
- **Expected:** Redirect to sign in or deny access.
- **Observed:** Redirected to sign in.
- **Status:** PASS

### Test 2 — Logged-out dashboard orders

- **Action:** Opened `/dashboard/orders` in a private browser window while logged out.
- **Expected:** Redirect to sign in or deny access if the route exists.
- **Observed:** The deployed site returned 404.
- **Status:** INCONCLUSIVE
- **Notes:** A 404 does not prove that authentication protection works.

### Test 3 — Invalid session

- **Action:** Replaced the session cookie with an invalid test value and opened `/checkout`.
- **Expected:** Reject the invalid session.
- **Observed:** Redirected to sign in.
- **Status:** PASS

### Test 4 — Order ID tampering

- **Action:** Tested changing an order ID in a private URL.
- **Observed:** Previously tested successfully by the project author.
- **Status:** PASS

## Mobile Registration and Ordering

- **Registration:** PASS
- **Sign-in after registration:** PASS
- **Add menu item to cart:** PASS
- **Checkout flow:** PASS

These mobile checks were confirmed by manual testing on the deployed site.

## Remaining Work

- Investigate why `/dashboard/orders` returns 404 on the deployed site.
- Repeat the dashboard authorization test after the route is available.
