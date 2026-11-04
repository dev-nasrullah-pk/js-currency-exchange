let pkr_btn = document.querySelector(".pkr-btn");
let inr_btn = document.querySelector(".inr-btn");
let sar_btn = document.querySelector(".sar-btn");
let dataText = document.querySelector("h2");
let selectedCurrency = "PKR"
async function ShowCurrnecyRate(countryName) {
    try {
        let url = 'https://open.er-api.com/v6/latest/USD'
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
        🇺🇸 ${inputAmount} USD to ${countryName}
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
function setActiveButton(activeBtn) {
    pkr_btn.classList.remove("active")
    inr_btn.classList.remove("active")
    sar_btn.classList.remove("active")

    activeBtn.classList.add("active")
}

pkr_btn.addEventListener("click", async function () {
    setActiveButton(pkr_btn);
    selectedCurrency = "PKR";
    console.log("Selected: PKR");
})
inr_btn.addEventListener("click", async function () {
    setActiveButton(inr_btn);
    selectedCurrency = "INR";
    console.log("Selected: INR");
})
sar_btn.addEventListener("click", async function () {
    setActiveButton(sar_btn);
    selectedCurrency = "SAR";
    console.log("Selected: SAR")
})
let mainCurencyBtn = document.querySelector(".convert-btn button");
mainCurencyBtn.addEventListener("click", async () => {
    dataText.innerText = "Loading Please Wait.....";
    await ShowCurrnecyRate(selectedCurrency)
})