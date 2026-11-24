// public/js/app.js – small client-side enhancements (CH4-2 / CH9). Every feature checks that its element exists.

// mobile menu
const menu = document.querySelector('#menu');
document.querySelector('#menu-btn')?.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

// dark mode saved in localStorage (UI preference only)
document.querySelector('#themeBtn')?.addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

// confirm before delete (event delegation)
document.addEventListener('submit', (e) => {
  if (e.target.matches('.confirm-delete') && !confirm('Delete this item?')) e.preventDefault();
});

// live search with fetch (debounced) on /items
const search = document.querySelector('#search');
const list = document.querySelector('#items');
const status = document.querySelector('#status');
let timer;
search?.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    status.textContent = 'Loading…';
    try {
      const res = await fetch(`/api/items?q=${encodeURIComponent(search.value.trim())}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { rows, total } = await res.json();
      list.replaceChildren(...rows.map((it) => {
        const card = document.createElement('article');
        card.className = 'card';
        const h2 = document.createElement('h2');
        h2.className = 'font-semibold';
        h2.textContent = it.name; // textContent – never innerHTML with data
        const p = document.createElement('p');
        p.className = 'text-sm text-slate-500';
        p.textContent = `${Number(it.price).toFixed(2)} ฿`;
        const a = document.createElement('a');
        a.href = `/items/${it.id}/edit`;
        a.className = 'mt-3 inline-block text-sm text-brand-600';
        a.textContent = 'Edit';
        card.append(h2, p, a);
        return card;
      }));
      status.textContent = `${total} item(s)`;
    } catch (err) {
      status.textContent = `Error: ${err.message}`;
    }
  }, 300);
});
