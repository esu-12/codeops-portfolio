async function getUsdToEtbRate() {
    const response = await fetch(
        "https://open.er-api.com/v6/latest/USD"
    );

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data.rates.ETB;
}

getUsdToEtbRate()
    .then(rate => {
        console.log(`1 USD = ${rate} ETB`);
    })
    .catch(error => {
        console.error("Could not get exchange rate:", error.message);
    });