// CH4-2 · Calculator – one click listener (delegation) + keyboard support
const display = document.querySelector("#display");
let expr = "";

// Safe evaluation of + - * / without eval(): numbers and operators only
function calculate(text) {
  const tokens = text.match(/\d*\.?\d+|[-+*/]/g) ?? [];
  const nums = [];
  const ops = [];
  const prec = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const apply = () => {
    const b = nums.pop(), a = nums.pop(), op = ops.pop();
    nums.push(op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b);
  };
  for (const t of tokens) {
    if (t in prec) {
      while (ops.length && prec[ops.at(-1)] >= prec[t]) apply();
      ops.push(t);
    } else nums.push(Number(t));
  }
  while (ops.length) apply();
  const result = nums[0];
  if (!Number.isFinite(result)) throw new Error("Math error");
  return String(Math.round(result * 1e10) / 1e10);
}

function press(key) {
  if (key === "C") expr = "";
  else if (key === "back") expr = expr.slice(0, -1);
  else if (key === "=") {
    try {
      expr = calculate(expr);
    } catch {
      expr = "";
      display.textContent = "Error";
      return;
    }
  } else expr += key;
  display.textContent = expr || "0";
}

document.querySelector("#keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-key]");
  if (btn) press(btn.dataset.key);
});
document.addEventListener("keydown", (e) => {
  if (/^[0-9.+\-*/]$/.test(e.key)) press(e.key);
  else if (e.key === "Enter" || e.key === "=") press("=");
  else if (e.key === "Backspace") press("back");
  else if (e.key === "Escape") press("C");
});
