// CH4-2 · Selecting elements
const out = document.querySelector("#out");
const log = (...a) => (out.textContent += a.join(" ") + "\n");

const title = document.querySelector("#title");           // first match or null
const firstCard = document.querySelector(".card");
const email = document.querySelector("[name=email]");
log("title:", title.textContent, "| first card:", firstCard.textContent, "| email:", email.value);

const cards = document.querySelectorAll(".card");          // static NodeList
cards.forEach((card) => card.classList.add("shadow"));
const visible = [...cards].filter((c) => !c.hidden);       // real array → filter/map
log("cards:", cards.length, "visible:", visible.length);

document.querySelector("#promo")?.remove();                // safe if missing

// older methods (still in legacy code)
log("getElementById:", document.getElementById("title").tagName);
log("getElementsByClassName (live):", document.getElementsByClassName("card").length);
log("getElementsByName:", document.getElementsByName("email")[0].value);
