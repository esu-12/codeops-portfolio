// TODO: Hold items in an array (this is your single source of truth)
let items = [];


// TODO: Select necessary DOM elements
const form = document.querySelector("#itemForm");
const input = document.querySelector("#itemInput");
const list = document.querySelector("#list");
const count = document.querySelector("#count");


// TODO: Write a render() function to rebuild the list from the array
function render() {

    // 1. Clear the current list
    list.innerHTML = "";

    // 2. Loop through the items array
    items.forEach(item => {

        // 3. Create the row
        const li = document.createElement("li");

        // Use data-id on each row
        li.dataset.id = item.id;

        // Add .done class if item has been bought
        if (item.done) {
            li.classList.add("done");
        }

        // Create the item text
        const span = document.createElement("span");
        span.textContent = item.name;

        // Create remove button
        const button = document.createElement("button");
        button.textContent = "Remove";
        button.classList.add("del");

        // Put elements inside the li
        li.appendChild(span);
        li.appendChild(button);

        // Add li to the list
        list.appendChild(li);
    });

    // 4. Update the live count
    const remaining = items.filter(item => !item.done).length;

    count.textContent =
        `${remaining} item${remaining !== 1 ? "s" : ""} remaining`;
}


// TODO: Handle form submission
form.addEventListener("submit", event => {

    // 1. Stop page reload
    event.preventDefault();

    // 2. Read and validate the input
    const name = input.value.trim();

    if (name === "") {
        return;
    }

    // 3. Push a new object into the array
    items.push({
        id: Date.now(),
        name: name,
        done: false
    });

    // Clear input
    input.value = "";

    // 4. Call render()
    render();
});


// TODO: Set up event delegation on the #list
list.addEventListener("click", event => {

    // 1. Listen for clicks on the parent <ul>

    // 2. Use e.target and closest() to find the clicked row
    const row = event.target.closest("li");

    // If the click wasn't inside an li, stop
    if (!row) {
        return;
    }

    // Get the item's ID from data-id
    const id = Number(row.dataset.id);

    // Find the item in the array
    const item = items.find(item => item.id === id);

    if (!item) {
        return;
    }


    // 3. Determine whether the user is removing the row
    if (event.target.classList.contains("del")) {

        // 4. Remove the item from the array
        items = items.filter(item => item.id !== id);

    } else {

        // Otherwise, toggle bought/done
        item.done = !item.done;
    }


    // 5. Call render()
    render();
});


// Initial render
render();