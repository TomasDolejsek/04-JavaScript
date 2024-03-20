// Welcome to the Currency Converter!
// We have imported the 'sync-input' package for you.
// You will use this in later stages.
// This package allows you to get user input.
// Like so:
// let name = input("Type your name: ");
// let age = Number(input("Type your age: "));
const input = require('sync-input')

const USDRates = {
  USD: 1.0,
  JPY: 113.5,
  EUR: 0.89,
  RUB: 74.36,
  GBP: 0.75
}

function convertCurrency(from, to, amount, rates) {
  return amount * rates[to] / rates[from]
}

console.log("Welcome to Currency Converter!")
for (let key in USDRates) {
  console.log(`1 USD equals ${USDRates[key]} ${key}`)
}

while (true) {
  console.log("What do you want to do?")
  console.log("1-Convert currencies 2-Exit program")
  let user = Number(input())
  if (isNaN(user) || ![1, 2].includes(user)) {
    console.log("Unknown input")
    continue
  } else if (user === 2) {
    console.log("Have a nice day!")
    process.exit()
  }
  console.log("What do you want to convert?")
  const ratesKeys = Object.keys(USDRates)
  const convertFrom = input("From: ").toUpperCase()
  if (!ratesKeys.includes(convertFrom)) {
    console.log("Unknown currency")
    continue
  }
  const convertTo = input("To: ").toUpperCase()
  if (!ratesKeys.includes(convertTo)) {
    console.log("Unknown currency")
    continue
  }
  const amount = Number(input("Amount: "))
  if (isNaN(amount)) {
    console.log("The amount has to be a number")
    continue
  }
  if (amount < 1) {
    console.log("The amount cannot be less than 1")
    continue
  }
  console.log(`Result: ${amount} ${convertFrom} equals ` +
    `${convertCurrency(convertFrom, convertTo, amount, USDRates).toFixed(4)} ${convertTo}`)
}
