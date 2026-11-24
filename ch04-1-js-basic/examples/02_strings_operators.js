// CH4-1 · Template literals, conversions, operators, === vs ==
const n = 10, pi = 3.14, gt = "Hello";
console.log("n = " + n + ", pi = " + pi + ", gt = " + gt); // old: concatenation
console.log(`n = ${n}, pi = ${pi}, gt = ${gt}`);           // modern: template literal
console.log(`2 x 3 = ${2 * 3}`);
const item = `<li class="p-2">${gt}</li>`;
console.log(item);

console.log(Number("42"), parseInt("42px"), Number("Hello"), String(3.14), (0.1 + 0.2).toFixed(2));

let x = 2;
x += 2; console.log("x += 2 →", x);
x **= 2; console.log("x **= 2 →", x);
console.log("7 % 3 =", 7 % 3, " 2 ** 3 =", 2 ** 3);

// == converts types (avoid), === compares value AND type (use this)
console.log(0 == "0", 0 == "", null == undefined); // true true true
console.log(0 === "0", 1 === 1, "a" !== "b");      // false true true
console.log(NaN === NaN, Number.isNaN(NaN));       // false true

// truthy / falsy and short-circuit
const input = "";
const displayName = input || "Guest";
console.log(displayName, Boolean("0"), Boolean([]), Boolean(0));
