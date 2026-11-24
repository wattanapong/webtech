// CH4-1 · Function declaration, function expression, arrow function, callbacks
function isLeapYear(year) {             // declaration (hoisted)
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
const hello = function (name) {         // expression stored in a const
  return `Hello ${name}`;
};
const greet = (name = "Guest") => `Hello ${name}`; // arrow + default parameter
const add = (a, b) => a + b;                       // implicit return
const square = (x) => x * x;
const sum = (...nums) => nums.reduce((s, n) => s + n, 0); // rest
const makeUser = (name) => ({ name, role: "member" });    // return an object: wrap in ( )

console.log(hello("everyone"));
console.log(`2100 is ${isLeapYear(2100) ? "" : "not "}leap year`);
console.log(add(2, 3), square(4), greet(), sum(1, 2, 3), makeUser("Nida"));

// first-class functions: pass a function as a value (no brackets!)
function run(fn, value) {
  return fn(value);
}
console.log(run(greet, "Somchai"));       // pass greet itself
console.log(run((x) => x * 10, 5));       // pass an arrow function
setTimeout(() => console.log("callback after 500 ms"), 500); // callback
