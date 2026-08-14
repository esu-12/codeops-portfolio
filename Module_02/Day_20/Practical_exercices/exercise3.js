async function testWrongUrl() {

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/does-not-exist-at-all"
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.log("Catch ran:", error.message);
    }
}

testWrongUrl();