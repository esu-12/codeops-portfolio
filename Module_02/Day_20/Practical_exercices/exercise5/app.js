const status = document.querySelector("#status");
const list = document.querySelector("#list");

async function loadUsers() {

    // Loading state
    status.textContent = "Loading...";
    list.innerHTML = "";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        // Success state
        status.textContent = "Users loaded successfully.";

        users.forEach(user => {

            const li = document.createElement("li");

            li.textContent =
                `${user.name} — ${user.email}`;

            list.appendChild(li);
        });

    } catch (error) {

        // Error state
        status.textContent =
            "Sorry, we couldn't load the users.";
    }
}

loadUsers();