// CH4-1 · Declare with const and let  (run: node 01_variables.js)
// const by default; let only when the value changes. Never var.
const name = "everyone";
const PI = 3.14159;
let count = 0;
count += 1;

const user = { name: "Somchai" };
user.name = "Somsak"; // OK: the object itself can change
// user = {};         // TypeError: Assignment to constant variable.

const isLoggedIn = true;
console.log(typeof name, typeof count, typeof isLoggedIn); // string number boolean
console.log(typeof null, typeof undefined, typeof [], typeof (() => {}), typeof 10n);

// var vs let: scope
if (true) {
  var v = "var leaks out of the block";
  let l = "let stays inside the block";
}
console.log(v);
// console.log(l); // ReferenceError: l is not defined
console.log(name, PI, count, user);
