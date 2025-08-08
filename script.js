const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const result = document.getElementById("result")
const amount = document.getElementById("amount")

const apiKey = "7ff951f6a7f5ed50fb33b19e"
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}` 

// Load currency list
fetch(`${apiURL}/latest/USD`)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.conversion_rates)
    currencies.forEach(currency => {
      let option1 = document.createElement("option")
      option1.value = currency
      option1.text = currency
      fromCurrency.add(option1)

      let option2 = document.createElement("option")
      option2.value = currency
      option2.text = currency
      toCurrency.add(option2)
    })

    fromCurrency.value = "USD"
    toCurrency.value = "INR"
  })

// Convert currency
document.getElementById("convert").addEventListener("click", () => {
  let from = fromCurrency.value
  let to = toCurrency.value
  let amt = amount.value

  if (amt === "" || amt <= 0) {
    result.innerText = "Please enter a valid amount."
    return
  }

  fetch(`${apiURL}/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      let rate = data.conversion_rates[to]
      let converted = (amt * rate).toFixed(2)
      result.innerText = `${amt} ${from} = ${converted} ${to}`
    })
})
