# MyShop – Group 03 (Section 1)

One sentence: what problem does the system solve?

## Members

| Student ID | Name | Role |
|------------|------|------|
| 68xxxxxx | Somchai J. | Lead, partials (header / nav / footer) |
| 68xxxxxx | | Login, register pages |
| 68xxxxxx | | Member home, profile page |
| 68xxxxxx | | List + detail pages |
| 68xxxxxx | | Create / edit forms, admin page |

## Tech stack

Node.js 24 · Express 5 · EJS · TailwindCSS 4 · MySQL 8 / MariaDB

## Getting started

1. `git clone <repo-url>`, then `npm install`
2. Copy `.env.example` to `.env` and set the DB values
3. Import `database/schema.sql` into MySQL
4. `npm run dev` → http://localhost:3000

## Data we store (PDPA)

| Data | Why | Where |
|------|-----|-------|
| email | log in | `user` table |
| dark-mode preference | UI only | `localStorage` |
