// CH4-1 · ES Modules: export
export const PI = 3.14159;
export function area(r) {
  return PI * r ** 2;
}
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
