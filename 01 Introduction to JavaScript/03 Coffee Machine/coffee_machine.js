const input = require('sync-input');

function printSuplies() {
  console.log("\nThe coffee machine has:");
  console.log(`${waterSuply} ml of water`);
  console.log(`${milkSuply} ml of milk`);
  console.log(`${beansSuply} g of coffee beans`);
  console.log(`${cupSuply} disposable cups`);
  console.log(`\$${moneySuply} of money\n`);
}

function giveCoffee() {
  const coffee = {
    '1': {
      'name': 'espresso',
      'water': 250,
      'milk': 0,
      'beans': 16,
      'price': 4
    },
    '2': {
      'name': 'latte',
      'water': 350,
      'milk': 75,
      'beans': 20,
      'price': 7
    },
    '3': {
      'name': 'cappuccino',
      'water': 200,
      'milk': 100,
      'beans': 12,
      'price': 6
    }
  };

  console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:, back - to main menu");
  let type = input();
  if (type !== "back" && checkResources(coffee[type]) === true) {
    waterSuply -= coffee[type]['water'];
    milkSuply -= coffee[type]['milk'];
    beansSuply -= coffee[type]['beans'];
    cupSuply -= 1;
    moneySuply += coffee[type]['price'];
  }
}

function fillMachine() {
  console.log("Write how many ml of water you want to add:");
  let water = Number(input());
  console.log("Write how many ml of milk you want to add:");
  let milk = Number(input());
  console.log("Write how many grams of coffee beans you want to add:");
  let beans = Number(input());
  console.log("Write how many disposable cups you want to add:");
  let cups = Number(input());
  waterSuply += water;
  milkSuply += milk;
  beansSuply += beans;
  cupSuply += cups;
}

function takeMoney() {
  console.log(`I gave you \$${moneySuply}`);
  moneySuply = 0;
}

function checkResources(needed) {
  let isEnough = true;
  if (needed['water'] > waterSuply) {
    console.log("Not enough water!");
    isEnough = false;
  }
  if (needed['milk'] > milkSuply) {
    console.log("No enough milk!");
    isEnough = false;
  }
  if (needed['beans'] > beansSuply) {
    console.log("No enough coffee beans!");
    isEnough = false;
  }
  if (cupSuply < 1) {
    console.log("No enough cups!");
    isEnough = false;
  }
  return isEnough;
}

let waterSuply = 400;
let milkSuply = 540;
let beansSuply = 120;
let cupSuply = 9;
let moneySuply = 550;

let user = '';
while (user !== "exit") {
  console.log("Write action (buy, fill, take, remaining, exit):");
  user = input();
  switch (user) {
    case "buy":
      giveCoffee();
      break;
    case "fill":
      fillMachine();
      break;
    case "take":
      takeMoney();
      break;
    case "remaining":
      printSuplies();
      break;
    case "exit":
      console.log("Good buy!");
      break;
    default:
      console.log("Unknown command.");
      break;
  }
}
