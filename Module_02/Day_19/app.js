// Select the form
const form = document.querySelector("#loginForm");

// Select the inputs
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Select the message
const message = document.querySelector("#message");


// Listen for form submission
form.addEventListener("submit", event => {

    // Stop the page from refreshing
    event.preventDefault();

    // Read the input values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate
    if (email === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        return;
    }

    // Example login check
    if (
        email === "admin@example.com" &&
        password === "123456"
    ) {
        message.textContent = "Login successful!";
    } else {
        message.textContent = "Invalid email or password.";
    }
});