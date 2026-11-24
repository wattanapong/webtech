// CH4-2 · Attributes & data-*
const logo = document.querySelector("#logo");
logo.setAttribute("alt", "Shop logo (changed by JS)");
console.log(logo.getAttribute("src"));

const btn = document.querySelector(".buy");
btn.addEventListener("click", () => {
  console.log(btn.dataset.id, btn.dataset.price); // always strings: "42" "199"
  btn.textContent = `Added #${btn.dataset.id} (${Number(btn.dataset.price)} THB)`;
  btn.disabled = true;
});

// classList: style with classes, not el.style
const menu = document.querySelector("#menu");
document.querySelector("#menu-btn").addEventListener("click", () => menu.classList.toggle("hidden"));
const card = document.querySelector(".card");
card.classList.add("ring-2", "ring-orange-500");
card.classList.remove("opacity-50");
card.classList.replace("bg-white", "bg-orange-50");
console.log(card.classList.contains("hidden")); // false

// textContent vs innerHTML: user data → textContent, never innerHTML (XSS)
document.querySelector("#userInput").addEventListener("input", (e) => {
  document.querySelector("#safe").textContent = e.target.value;
  document.querySelector("#unsafe").innerHTML = e.target.value; // try the <img onerror> example!
});
