# Day 21 - Practical Exercise

## JavaScript: Local Storage & Form Validation

### Project Goal

Build a signup form that validates user input and saves signup information in the browser using `localStorage`.

The project also includes a theme toggle that remembers the user's choice after refreshing the page.

## Files

- `index.html` - Signup form and page structure
- `styles.css` - Page and dark-theme styling
- `app.js` - Form validation, localStorage, signup data, and theme toggle

## Requirements

### 1. Theme Toggle

- Add a theme toggle button.
- Save the selected theme using `localStorage`.
- Restore the saved theme when the page loads.

### 2. Save and Load Helpers

Create:

```javascript
save(key, data)


### Self-Check List
[ ] Theme/language choice survives refresh
[ ] save() uses JSON.stringify()
[ ] load() uses JSON.parse()
[ ] load() handles missing data
[ ] load() handles corrupt JSON with try/catch
[ ] Signup form has name and phone
[ ] Form uses preventDefault()
[ ] Values are trimmed
[ ] Name requires at least 2 characters
[ ] Phone uses Ethiopian regex
[ ] First error is shown with textContent
[ ] Valid signup is saved to localStorage
[ ] Form clears after successful signup
[ ] Counter updates after page load