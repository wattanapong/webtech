// CH4-2 · Lab 4-2 model answer – one app.js for every page.
// ?. makes each feature safe on pages that do not have that element.
// Rules: no inline onclick, no var, user data → textContent.

// 1) Mobile menu toggle (classList)
const menu = document.querySelector("#menu");
document.querySelector("#menu-btn")?.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

// 2) Register: password ≥ 8 (HTML), confirm must match (JS), red messages
const form = document.querySelector("#register");
function checkConfirm() {
  const { password, confirm } = form.elements;
  const same = password.value === confirm.value;
  confirm.setCustomValidity(same ? "" : "Passwords differ");
  const err = document.querySelector("#confirm-err");
  err.textContent = same ? "" : "Passwords do not match";
  err.classList.toggle("hidden", same);
}
// re-check while typing, otherwise the old custom error blocks the next submit
form?.elements.password.addEventListener("input", checkConfirm);
form?.elements.confirm.addEventListener("input", checkConfirm);
form?.addEventListener("submit", (e) => {
  checkConfirm();
  e.preventDefault(); // no backend yet – remove this in CH5 when Express handles POST
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  console.log("would send", data.email); // never log real passwords
  document.querySelector("#ok").showModal();
});

// 3) Live search on the list page (debounce 300 ms)
const search = document.querySelector("#search");
const items = document.querySelectorAll("#items .item");
let timer;
search?.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    items.forEach((item) => {
      const match = item.textContent.toLowerCase().includes(q);
      item.classList.toggle("hidden", !match);
      if (match) shown++;
    });
    document.querySelector("#no-result").classList.toggle("hidden", shown > 0);
  }, 300);
});

// 4) Delete confirm with <dialog> + toast with setTimeout (detail page)
const dlg = document.querySelector("#confirm");
document.querySelector("#deleteBtn")?.addEventListener("click", () => dlg.showModal());
dlg?.addEventListener("close", () => {
  if (dlg.returnValue !== "ok") return;
  const toast = document.querySelector("#toast");
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
});
