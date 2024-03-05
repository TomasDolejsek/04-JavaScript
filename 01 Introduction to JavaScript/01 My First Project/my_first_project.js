const input = require('sync-input');

let total = 0.0;
console.log("Earned amount:");
console.log("Bubblegum: $202");
total += 202;
console.log("Toffee: $118");
total += 118;
console.log("Ice cream: $2250");
total += 2250;
console.log("Milk chocolate: $1680");
total += 1680;
console.log("Doughnut: $1075");
total += 1075;
console.log("Pancake: $80");
total += 80;
console.log("\nIncome: $" + total);

staff_expences = Number(input("Staff expenses: "))
other_expences = Number(input("Other expenses: "))

let net = total - (staff_expences + other_expences)

console.log("Net income: $" + net)
