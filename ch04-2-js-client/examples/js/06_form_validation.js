// CH4-2 · Constraint Validation API
const form = document.querySelector("#register");
const { password, confirm, phone } = form.elements;

confirm.addEventListener("input", () => {
  confirm.setCustomValidity(confirm.value === password.value ? "" : "Passwords do not match");
});

// custom error message with Tailwind classes
const err = document.querySelector("#phone-err");
phone.addEventListener("blur", () => {
  const ok = phone.checkValidity();
  err.textContent = ok ? "" : "Phone must be 10 digits, e.g. 0812345678";
  err.classList.toggle("hidden", ok);
  phone.classList.toggle("border-red-500", !ok);
  phone.setAttribute("aria-invalid", String(!ok));
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // no backend yet (CH5)
  if (!form.checkValidity()) {
    form.reportValidity(); // show the browser messages
    return;
  }
  const data = Object.fromEntries(new FormData(form)); // every named field
  delete data.password; // never log real passwords
  delete data.confirm;
  document.querySelector("#out").textContent = JSON.stringify(data, null, 2);
});
