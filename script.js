let from_currency = document.getElementById("fromCurrency")
let to_currency = document.getElementById("toCurrency")
let dataText = document.querySelector("h2");
let selectedCurrency = "PKR";
  let fromVol = from_currency.value;
  let toVol = to_currency.value;
async function ShowCurrnecyRate(countryName) {
    try {
        let url = `https://open.er-api.com/v6/latest/${fromVol}`
        let response = await fetch(url);
        let currencyRate = await response.json()
        console.log(currencyRate);
        let ratesData = currencyRate.rates[countryName];
        let inputAmount = document.querySelector(".amount-input").value
        let finalAmount = inputAmount * ratesData;
        let roundedFinalAmount = finalAmount.toFixed(2);
        let symbol = countryName + "";
        if (countryName === "PKR") symbol = "Rs. "
        if (inputAmount === "" || inputAmount <= 0) {
            dataText.innerHTML = `<span style="color: #dc3545; font-weight: bold;">Please enter a valid amount! ⚠️</span>`;
            return;
        }
        dataText.innerHTML = `
        <div style="margin-top: 15px; background-color: #f8f9fa; border-left: 5px solid #28a775; display: inline-block; border-radius: 8px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <span style="font-size: 16px; color: #6c757d; font-weight: bold; display: block; margin-bottom: 5px;">
        🇺🇸 ${inputAmount} ${fromVol} to ${countryName}
        </span>
        <span style="font-size: 28px; font-weight: bold; color: #28a745;">
        ${symbol}${roundedFinalAmount}
        </span>
        </div>
        `
    }
    catch (error) {
        dataText.innerText = "Internet, Connection Failed!❌ Please Check Your Network."
    }
}
from_currency.addEventListener("change", function () {
    fromVol = from_currency.value   
    console.log("From  Currency", fromVol)
})

to_currency.addEventListener("change", function () {
    toVol = to_currency.value;
    console.log("To currency", toVol)
})
let mainCurencyBtn = document.querySelector(".convert-btn button");
mainCurencyBtn.addEventListener("click", async () => {
    dataText.innerText = "Loading Please Wait.....";
    await ShowCurrnecyRate(toVol)
})