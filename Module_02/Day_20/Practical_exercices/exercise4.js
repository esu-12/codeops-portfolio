async function loadUsersAndPosts() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        const firstTwoUsers = users.slice(0, 2);

        const details = await Promise.all(
            firstTwoUsers.map(async user => {

                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const posts = await response.json();

                return {
                    user: user.name,
                    posts: posts.length
                };
            })
        );

        console.log(details);

    } catch (error) {

        console.error(
            "Failed to load details:",
            error.message
        );
    }
}

loadUsersAndPosts();