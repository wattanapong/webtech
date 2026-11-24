// CH4-2 · Timers are asynchronous
setTimeout(() => console.log("later"), 0);
console.log("first"); // printed first!

const clock = document.querySelector("#clock");
const tick = () => (clock.textContent = new Date().toLocaleTimeString("th-TH"));
tick();
const clockId = setInterval(tick, 1000); // clearInterval(clockId) to stop

const toast = document.querySelector("#toast");
let toastTimer;
document.querySelector("#showToast").addEventListener("click", () => {
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3000);
});

// Live search with debounce: act only after typing stops for 300 ms
const search = document.querySelector("#search");
const items = document.querySelectorAll("#products li");
let timer;
search.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const q = search.value.trim().toLowerCase();
    items.forEach((li) => li.classList.toggle("hidden", !li.textContent.toLowerCase().includes(q)));
  }, 300);
});
// CH9: replace this filter with fetch('/api/products?q=...')
