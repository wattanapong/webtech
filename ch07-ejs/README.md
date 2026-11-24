# CH7 · EJS Template Engine (Week 9)

Slides: **CH7 - EJS Template Engine** (from the lecturer; not in this repo)

Run any example the same way:

```bash
cd ch07-ejs/<example>
npm install
cp .env.example .env     # only ex4 and ex5 (they use MySQL)
npm run dev
```

| Folder | Slide topic | MySQL? |
|--------|-------------|--------|
| `ex1-tags-loops/` | Set up EJS in Express 5, `<%= %>` vs `<%- %>` vs `<% %>` vs `<%# %>`, loops and conditionals | no |
| `ex2-partials/` | Partials with `include()`: header / nav / footer, Tailwind in EJS, `locals.user` | no |
| `ex3-layouts/` | `express-ejs-layouts` with one `layout.ejs` + `<%- body %>` (alternative) | no |
| `ex4-classicmodels/` | Sub-routers, `mysql2/promise`, customers → orders → order details | `database/classicmodels.sql` |
| `ex5-items-crud/` | Forms & basic CRUD, **PRG pattern**, validation with 400, 404/500 pages, **XSS demo** (`/xss`) | `database/schema.sql` |

> All examples use `DB_PASSWORD` in `.env`, the same name as CH5-3 and CH8. (One CH7 slide says `DB_PASS`. Pick one name and use it everywhere.)

## Homework (classicmodels, `ex4`)

1. On `/orders/:orderNumber`, show the total quantity and total price of the order (see the `<%# Homework 1 %>` comment).
2. Add an "order products" menu that can create a new order.
3. Add a product search page that lists the orders containing that product.

## Lab 9B · Static pages → EJS + MySQL list

1. Pull `main`, then `git switch -c feature/ejs-<page>`.
2. `npm i express ejs mysql2`, and add the `dev` script with `--watch --env-file=.env`.
3. Rename your `.html` pages to `views/*.ejs` and add a route for each one.
4. The lead makes the header / nav / footer partials, and everyone uses `include()`.
5. Add Tailwind and link all pages (login → member page).
6. Create 1 table from your ER design and render a list page with `forEach`.
7. Commit, push and open a PR. A teammate reviews and merges it.

## Self-check

- [ ] All my pages come from Express, with shared partials and no copy-pasted header
- [ ] After a successful POST, I `res.redirect()` (PRG), never `res.render()`
- [ ] Data from users or the database is always shown with `<%= %>`
- [ ] I tried the `/xss` demo and can explain why `<%- %>` is dangerous
