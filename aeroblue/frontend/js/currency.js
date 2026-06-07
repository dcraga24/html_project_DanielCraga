async function convertCurrency() {

    const amount =
        Number(document.getElementById("amount").value);

    const from =
        document.getElementById("fromCurrency").value;

    const to =
        document.getElementById("toCurrency").value;

    const result =
        document.getElementById("currencyResult");

    try {

        const response =
            await fetch(
                `https://open.er-api.com/v6/latest/${from}`
            );

        const data =
            await response.json();

        const rate =
            data.rates[to];

        const converted =
            amount * rate;

        result.innerHTML = `
            <div class="currency-result-card">

                <div class="currency-rate">
                    ${amount} ${from}
                </div>

                <h3>=</h3>

                <div class="currency-rate">
                    ${converted.toFixed(2)} ${to}
                </div>

            </div>
        `;

    }
    catch(error) {

        console.error(error);

        result.innerHTML = `
            <div class="currency-error">
                Unable to retrieve exchange rates.
            </div>
        `;
    }
}