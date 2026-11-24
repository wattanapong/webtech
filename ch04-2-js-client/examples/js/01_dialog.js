// CH4-2 · showModal() = accessible modal, Esc closes, <form method="dialog"> closes it without JS
const box = document.querySelector("#box");
document.querySelector("#open").addEventListener("click", () => box.showModal());
document.querySelector("#old").addEventListener("click", () => alert("This blocks the whole page"));
