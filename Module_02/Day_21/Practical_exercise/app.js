const form = document.getElementById("signupForm");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");
const themeBtn = document.getElementById("themeBtn");

const PHONE_REGEX = /^(09|07)\d{8}$|^\+251[79]\d{8}$/;


// ===============================
// 1. Theme Toggle
// ===============================

// Restore theme when page loads
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// Save theme when changed
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);
});


// ===============================
// 2. Save and Load Helpers
// ===============================

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Could not load data:", error);

        return [];
    }
}


// ===============================
// 6. Update Signup Counter
// ===============================

function updateCount() {

    const signups = load("signups");

    countEl.textContent =
        `${signups.length} people have signed up.`;
}


// ===============================
// 3, 4, 5, 6. Signup Form
// ===============================

form.addEventListener("submit", (e) => {

    // Prevent page reload
    e.preventDefault();

    // Read and trim values
    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    // Clear previous error
    errorEl.textContent = "";


    // Validate name
    if (name.length < 2) {

        errorEl.textContent =
            "Name must be at least 2 characters long.";

        return;
    }


    // Validate phone
    if (!PHONE_REGEX.test(phone)) {

        errorEl.textContent =
            "Enter a valid Ethiopian phone number.";

        return;
    }


    // Get existing signups
    const signups = load("signups");


    // Add new signup
    signups.push({
        name: name,
        phone: phone
    });


    // Save as JSON
    save("signups", signups);


    // Clear form
    form.reset();


    // Update counter
    updateCount();


    // Success
    alert("Signup successful!");
});


// ===============================
// Run when page loads
// ===============================

updateCount();