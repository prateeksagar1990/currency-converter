async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter valid amount");
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const rate = data.rates[toCurrency];
    const result = amount * rate;

    document.getElementById("result").innerText =
        `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}
