// CH4-1 · Conditions (if / else if / ternary / switch) and loops
const temp = 26;
const raining = false;
if (raining) {
  console.log("Raining");
} else if (temp >= 25 && temp <= 27) {
  console.log("Good weather");
} else {
  console.log("Check again");
}
const label = raining ? "Raining" : "Dry"; // ternary
console.log(label);

switch (new Date().getDay()) {
  case 0:
  case 6:
    console.log("Weekend");
    break;
  default:
    console.log("Weekday – class on Wednesday!");
}

// loops
for (let i = 0; i <= 12; i++) console.log(`2 x ${i} = ${2 * i}`);
const fruits = ["Apple", "Papaya", "Orange", "Banana"];
for (const fruit of fruits) console.log(fruit);       // values
fruits.forEach((fruit, i) => console.log(i, fruit));  // + index
let k = 3;
while (k > 0) {
  console.log(k);
  k--;
}

// looping over an object
const fruitObj = { 0: "Apple", 1: "Papaya", 2: "Orange" };
for (const [key, value] of Object.entries(fruitObj)) console.log(`fruits[${key}] = ${value}`);
for (const key in fruitObj) console.log(key);
console.log(Object.keys(fruitObj), Object.values(fruitObj));
