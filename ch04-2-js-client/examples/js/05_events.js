// CH4-2 · addEventListener & the event object
const btn = document.querySelector("#save");
function handleClick(event) {
  console.log(event.type, event.target, event.currentTarget);
}
btn.addEventListener("click", handleClick);
btn.addEventListener("click", () => console.log("runs only once"), { once: true });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") console.log("Escape pressed");
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    console.log("open search");
  }
});

// Event delegation: listener on the parent, closest() finds the real button
const cart = document.querySelector("#cart");
cart.addEventListener("click", (e) => {
  const del = e.target.closest("button.del");
  if (!del) return; // clicked elsewhere
  console.log("delete item", del.dataset.id);
  del.closest("li").remove();
});
let nextId = 3;
document.querySelector("#addCart").addEventListener("click", () => {
  const li = document.createElement("li");
  li.className = "flex justify-between rounded bg-white p-2";
  li.textContent = `Item ${nextId} `;
  const del = document.createElement("button");
  del.className = "del text-red-600";
  del.dataset.id = nextId++;
  del.textContent = "✕";
  li.append(del);
  cart.append(li);
});

// preventDefault: stop the page reload and handle the form in JS (CSR)
const form = document.querySelector("#search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = form.elements.q.value.trim();
  document.querySelector("#searchOut").textContent = `search for "${q}"`;
});
document.querySelector("a.external").addEventListener("click", (e) => {
  if (!confirm("Leave this site?")) e.preventDefault();
});
