const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const swapBtn = document.getElementById("swapBtn");

// Load all currencies automatically
async function loadCurrencies() {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = option2.value = currency;
        option1.text = option2.text = currency;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "INR";
}

loadCurrencies();

// Convert function
async function convert() {

    let amount = document.getElementById("amount").value;
    let from = fromSelect.value;
    let to = toSelect.value;

    if (amount === "" || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    document.getElementById("loading").innerText = "Loading...";

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        let data = await response.json();

        let rate = data.rates[to];
        let result = amount * rate;

        document.getElementById("loading").innerText = "";
        document.getElementById("result").innerText =
            `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    }
    catch {
        document.getElementById("loading").innerText = "Error fetching data.";
    }
}

// Swap currencies
swapBtn.addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
});
