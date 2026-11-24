// CH9 · Ex2 client – fetch + async/await, pagination without reload, live search, safe rendering
const tbody = document.getElementById('tableBody');
const status = document.getElementById('status');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageInfo = document.getElementById('pageInfo');
const limitSel = document.getElementById('limit');
const search = document.getElementById('search');
const pager = document.getElementById('pager');

let page = 1;

// GET JSON with error handling + timeout (fetch rejects only on network errors)
async function getJSON(url, ms = 5000) {
  const res = await fetch(url, { signal: AbortSignal.timeout(ms) });
  if (!res.ok) throw new Error(`Server said ${res.status}`);
  return res.json();
}

function showError(err) {
  status.textContent = err.name === 'TimeoutError' ? 'Too slow – try again' : `Error: ${err.message}`;
}

// Safer renderTable(): textContent, never innerHTML with DB data
function renderTable(customers) {
  tbody.replaceChildren();
  if (customers.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.className = 'p-2';
    td.textContent = 'No customers found';
    tr.append(td);
    tbody.append(tr);
    return;
  }
  for (const c of customers) {
    const tr = document.createElement('tr');
    tr.className = 'border-t dark:border-gray-700';
    for (const v of [c.customerNumber, c.customerName, c.phone, c.city, c.country, c.creditLimit]) {
      const td = document.createElement('td');
      td.className = 'p-2';
      td.textContent = v ?? '';
      tr.append(td);
    }
    tr.lastChild.classList.add('text-right');
    tbody.append(tr);
  }
}

async function loadPage(p) {
  status.textContent = 'Loading…';
  try {
    const limit = Number(limitSel.value);
    const data = await getJSON(`/customers/json?page=${p}&limit=${limit}`); // { page, limit, total, rows }
    page = data.page;
    renderTable(data.rows);
    const pages = Math.ceil(data.total / data.limit);
    pageInfo.textContent = `Page ${page} / ${pages}`;
    prev.disabled = page <= 1;
    next.disabled = page * data.limit >= data.total; // disable Next on the last page
    status.textContent = '';
  } catch (err) {
    showError(err);
  }
}

prev.addEventListener('click', () => loadPage(page - 1));
next.addEventListener('click', () => loadPage(page + 1));
limitSel.addEventListener('change', () => loadPage(1));

// Live search (debounced). An empty box goes back to the paged list.
let timer;
search.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const q = search.value.trim();
    if (!q) {
      pager.hidden = false;
      return loadPage(1);
    }
    pager.hidden = true;
    try {
      const rows = await getJSON(`/customers/search?q=${encodeURIComponent(q)}`);
      renderTable(rows);
      status.textContent = `${rows.length} match(es)`;
    } catch (err) {
      showError(err);
    }
  }, 300);
});

// fetch POST – send JSON
document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  try {
    const res = await fetch('/customers/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
    status.textContent = `Added customer #${body.id}`;
    form.reset();
    document.getElementById('total').textContent = Number(document.getElementById('total').textContent) + 1;
  } catch (err) {
    showError(err);
  }
});
