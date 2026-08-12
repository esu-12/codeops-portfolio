# Addis Market Shopping List

## Project Goal

Build a working single-page app where data leads and the DOM follows using the **state-then-render loop**.

## Requirements

- **State Management:** Hold grocery items in a JavaScript array [1].
- **Rendering:** Use a `render()` function to rebuild the list every time the data changes [1].
- **Form Handling:** Prevent default reloads, validate input, and update the array on submit [1].
- **Live Counter:** Display a running count of items above the list [1].
- **Event Delegation:** Use one listener on the parent `<ul>` to handle toggling and deletions [1].
- **Data Identification:** Use `data-id` attributes on rows to link DOM elements to array objects [1].
- **CSS Toggling:** Use the `.done` class for bought items instead of inline styles [1].

## Self-Check List

- [ ] Does the form add items without reloading the page?
- [ ] Does clicking an item toggle a strikethrough via a CSS class?
- [ ] Does clicking the remove button delete the correct item from the array?
- [ ] Does the counter update immediately after every change?
- [ ] Is the `render()` function the only place where the list DOM is modified?