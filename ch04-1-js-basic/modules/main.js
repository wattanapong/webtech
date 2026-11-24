// CH4-1 · ES Modules: import  (run: node main.js – package.json has "type": "module")
import Calculator, { PI, area } from "./math.js";

console.log(PI, area(2));
const calc = new Calculator();
console.log(calc.add(2, 3));
