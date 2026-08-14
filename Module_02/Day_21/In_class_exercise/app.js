const form = document.getElementById("signupForm");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");

const PHONE_REGEX = /^(0|\+?251)?[79]\d{8}$/;

function getSignups() {
  return JSON.parse(localStorage.getItem("signups")) || [];
}

function updateCount() {
  const signups = getSignups();
  countEl.textContent = `${signups.length} people have signed up.`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  errorEl.textContent = "";

  // Validate name
  if (name.length < 2) {
    errorEl.textContent = "Name must be at least 2 characters long.";
    return;
  }

  // Validate phone
  if (!PHONE_REGEX.test(phone)) {
    errorEl.textContent =
      "Phone must be a valid Ethiopian number (09/0712345678 or +2519/712345678).";
    return;
  }

  const signups = getSignups();

  signups.push({
    name,
    phone
  });

  localStorage.setItem("signups", JSON.stringify(signups));

  form.reset();
  updateCount();

  alert("Signup successful!");
});

updateCount();
