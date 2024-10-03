const currencyListEndpoint =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

const inputCurrencyRef = document.querySelectorAll(".currencySelect");
const inputCurrencyValueRef = document.querySelector(".amountBox");

const currency1 = document.querySelector("#currencySelect");
const currency2 = document.querySelector("#currencySelectConverted");
const outputBox = document.querySelector(".amountBoxConvertTo");

let amount;
let selectedCurrency1, selectedCurrency2;
let output;
// Add event listener for the input box to capture the amount entered
inputCurrencyValueRef.addEventListener("keyup", async (event) => {
  amount = event.target.value;
  const data = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency1}.json`
  );

  const data_json = await data.json();

  console.log(data_json);
  convert(data_json);
});

const convert = (data_json) => {
  output = data_json[selectedCurrency1][selectedCurrency2] * amount;
  console.log(output);
  outputBox.value = output;
};

// This variable will store the fetched currency list
let currencyList_json = null;

// Function to fetch and populate the currency list (only once)
async function fetchAndPopulateCurrencyList() {
  if (!currencyList_json) {
    try {
      const currencyList = await fetch(currencyListEndpoint);
      currencyList_json = await currencyList.json();

      // Populate all .currencySelect dropdowns
      inputCurrencyRef.forEach((ref) => {
        for (const [key] of Object.entries(currencyList_json)) {
          const optionElement = document.createElement("option");
          optionElement.value = key;
          optionElement.textContent = key;
          ref.appendChild(optionElement);
        }
      });
    } catch (err) {
      console.error("Error fetching currency list:", err);
    }
  }
}

// Add a click event listener to the select element
inputCurrencyRef.forEach((ref) => {
  ref.addEventListener("click", async () => {
    await fetchAndPopulateCurrencyList();
  });
});

currency1.addEventListener("change", (event) => {
  selectedCurrency1 = event.target.value;
  console.log(selectedCurrency1);
});

currency2.addEventListener("change", (event) => {
  selectedCurrency2 = event.target.value;
  console.log(selectedCurrency2);
});
