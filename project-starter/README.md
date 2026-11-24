# Project starter: Node.js + Express 5 + EJS + TailwindCSS 4 + MySQL

A working skeleton built only from the course stack. It contains every pattern from CH5–CH9 in one place:

| Feature | Chapter | Files |
|---------|---------|-------|
| Express 5 structure, 404/500, `.env` | CH5-2 | `index.js`, `.env.example` |
| `mysql2/promise` pool, prepared statements | CH5-3 | `db.js` |
| EJS partials, SSR CRUD with PRG | CH7 | `views/`, `routes/items.js` |
| bcrypt, sessions in MySQL, `requireLogin` / `requireRole`, admin page | CH8 | `lib/`, `routes/member.js` |
| Privacy notice + consent checkbox (PDPA) | CH8 | `views/privacy.ejs`, `views/member/register.ejs` |
| JSON API + `fetch` live search, dark mode in `localStorage` | CH9 | `routes/api.js`, `public/js/app.js` |
| Tailwind CLI build (no CDN) | CH3 | `src/input.css` → `public/css/style.css` |

Each member only sees and edits their **own** items (`WHERE user_id = ?`): authorization at the data level.

## Getting started

```bash
cp -r project-starter ../my-group-project     # start your group repo from a copy
cd ../my-group-project
npm install
mysql -u root -p < database/schema.sql       # or HeidiSQL → Run SQL file
cp .env.example .env                         # set DB_PASSWORD and SESSION_SECRET
npm run css                                  # terminal 1: Tailwind watch
npm run dev                                  # terminal 2: server → http://localhost:3000
```
Test admin: **admin / admin12345**. This is fake data; change it before you demo.

## Make it yours

1. Replace `items` in `database/schema.sql` with your own ER design (≥ 5 tables, PK/FK).
2. Copy `routes/items.js` + `views/items/` for each table you need.
3. Change the title, logo, `@theme` colours (`src/input.css`) and the privacy notice text.
4. Write the README for your repo from `ch06-git/templates/README-group.md`.
