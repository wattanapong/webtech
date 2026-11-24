// CH4-2 · createElement → append / prepend, remove()
const list = document.querySelector("#todo");
function addItem(text) {
  const li = document.createElement("li");
  li.className = "flex justify-between rounded border bg-white p-2";
  li.textContent = text; // safe text
  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "text-red-600";
  del.addEventListener("click", () => li.remove());
  li.append(del);   // child at end
  list.prepend(li); // newest on top
}
addItem("Design ER diagram");

const form = document.querySelector("#todo-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addItem(form.elements.task.value.trim());
  form.reset();
});

// Render a list from data (template + textContent)
const products = [
  { name: "Pen", price: 15 },
  { name: "Book", price: 250 },
  { name: "Bag", price: 590 },
];
const tpl = document.querySelector("#row");
const ul = document.querySelector("#products");
ul.replaceChildren(
  ...products.map((p) => {
    const li = tpl.content.cloneNode(true);
    li.querySelector("h3").textContent = p.name;
    li.querySelector("p").textContent = `${p.price} THB`;
    return li;
  })
);
