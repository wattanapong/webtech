// CH5-3 · fetch: load & render, submit a form as JSON, delete with event delegation
const list = document.querySelector("#list");
const form = document.querySelector("#product-form");
const errorBox = document.querySelector("#error");
const search = document.querySelector("#search");

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.toggle("hidden", !msg);
}

async function load(q = "") {
  const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const products = await res.json();
  list.replaceChildren(
    ...products.map((p) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between rounded border bg-white p-2";
      const span = document.createElement("span");
      span.textContent = `${p.name} – ${Number(p.price)} THB (stock ${p.stock})`; // textContent = safe
      const btn = document.createElement("button");
      btn.dataset.id = p.id;
      btn.className = "rounded px-2 text-red-600 hover:bg-red-50";
      btn.textContent = "Delete";
      li.append(span, btn);
      return li;
    })
  );
}

// Create: FormData → JSON → POST
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.price = Number(data.price); // form values are strings
  data.stock = Number(data.stock);
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // needed for express.json()
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) return showError(body.error); // 400 from the server
  showError("");
  form.reset();
  load(search.value);
});

// Delete: one listener on the list (delegation) + data-id
list.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn || !confirm("Delete this product?")) return;
  const res = await fetch(`/api/products/${btn.dataset.id}`, { method: "DELETE" });
  if (res.status === 204) btn.closest("li").remove();
  else showError(`Delete failed (${res.status})`);
});

// Search on the server (debounce 300 ms)
let timer;
search.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => load(search.value).catch((err) => showError(err.message)), 300);
});

load().catch((err) => showError(err.message));
