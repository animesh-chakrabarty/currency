const currencyListEndpoint =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

const inputCurrencyRef = document.querySelectorAll(".currencySelect");
const inputCurrencyValueRef = document.querySelector(".amountBox");

inputCurrencyValueRef.addEventListener("keyup", (event) => {
  let amount = event.target.value;

  console.log(amount);
});

inputCurrencyRef.forEach((ref) => {
  ref.addEventListener("click", async () => {
    try {
      const currencyList = await fetch(currencyListEndpoint);
      const currencyList_json = await currencyList.json();

      for (const [key, pair] of Object.entries(currencyList_json)) {
        optionElement = document.createElement("option");

        optionElement.value = key;
        optionElement.textContent = key;

        optionElement.addEventListener("click", () => {
          console.log("clicked");
        });
        ref.appendChild(optionElement);
      }
    } catch (err) {
      console.error(err);
    }
  });
});
