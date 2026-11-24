# CH9 · Asynchronous Programming & AJAX (Week 11)

Slides: **CH9 - Asynchronous Programming and AJAX** (from the lecturer; not in this repo)

## `ex1-promise-async/`: event loop, Promise, async/await

```bash
cd ch09-async-ajax/ex1-promise-async
npm install
npm run loop          # predict the output first!
npm run promise       # then / catch / finally (run it a few times)
npm run callbacks     # callback hell → async/await
npm run combinators   # Promise.all / allSettled / race / any
npm run parallel      # sequential (~3 s) vs parallel (~1 s) await
npm run server        # http://localhost:3000/await.html
```
The server shows the classic bug where `res.end()` runs **before** `then` (`/then-broken`), plus the fix (`/then-ok`, `/then-finally`).

## `ex2-ajax-customers/`: pagination and live search without reload

Uses `database/classicmodels.sql`.

```bash
cd ch09-async-ajax/ex2-ajax-customers
npm install
cp .env.example .env
npm run dev           # http://localhost:3000/customers
```

| Feature | Where |
|---------|-------|
| `GET /customers/json?page=&limit=` → `{ page, limit, total, rows }`, with page/limit clamped and `OFFSET = (page - 1) * limit` | `router/customers.js` |
| `GET /customers/search?q=` declared before `/:customerNumber` | `router/customers.js` |
| `fetch` + `res.ok` check + `AbortSignal.timeout` + Loading / error text | `static/js/customers.js` |
| Safer `renderTable()` using `textContent`; Prev/Next disabled at the ends; debounced live search | `static/js/customers.js` |
| `fetch` POST with JSON (add a customer) | page + `POST /customers/api` |
| Dark mode saved in `localStorage`, read in `<head>` so there's no flash | `views/partials/head.ejs`, `foot.ejs` |
| localStorage vs sessionStorage; a cart stored as JSON with try/catch | `/storage.html` |
| XMLHttpRequest vs fetch | `/xhr.html` |

## Lab 11

**A · AJAX feature (55 min):** add `GET /api/<items>?q=&page=` returning `{ rows, total }` to one list page. Use `fetch` with a `res.ok` check and Loading/error text, render with `textContent`, and add debounced search or Prev/Next. Put a screenshot of the Network tab (Fetch/XHR) in the PR.

**B · Save a preference (35 min):** save dark mode, language, layout or a cart in `localStorage`. Read it in the head partial so the page doesn't flash, and wrap JSON in try/catch. **Store no personal data.** Add one line to the README saying what you store and why.

## Self-check

- [ ] I can predict the output of the event-loop example
- [ ] I know `fetch` does **not** reject on 404/500, so I always check `res.ok`
- [ ] I know when to use `Promise.all` instead of sequential `await`
- [ ] Login state lives in the server session, never in `localStorage`
