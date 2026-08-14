async function loadUsers() {

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Failed to load users:", error.message);
    }
}

loadUsers();