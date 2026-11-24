# 226297 Web Programming Technology (2/2569)

Example code and lab model answers for the Web Programming Technology course, Computer Engineering, School of ICT, University of Phayao.
Every folder matches one lecture slide deck (slides are shared by the lecturer, not stored in this repo).

**Course stack:** Node.js 24 · Express 5 · EJS · TailwindCSS 4 · MySQL/MariaDB. No other language or JS framework.

➡ **First time? Read [SETUP.md](SETUP.md).** It covers installing the tools, cloning the repo and the `my-work/` rule.

## Course map

| Week | Date | Chapter | Folder | Lab |
|------|------|---------|--------|-----|
| 1 | 4 Nov 2026 | CH1 Introduction to Web Technology | [`ch01-intro`](ch01-intro) | Lab 1 · Toolchain & HTTP inspection |
| 2 | 11 Nov | CH2 HTML | [`ch02-html`](ch02-html) | Lab 2 · Static mockup pages |
| 3 | 18 Nov | CH3 CSS & TailwindCSS | [`ch03-css-tailwind`](ch03-css-tailwind) | Lab 3 · Style the mockup with Tailwind |
| 4 | 25 Nov | CH4-1 JavaScript Basic · CH4-2 Client Side | [`ch04-1-js-basic`](ch04-1-js-basic) · [`ch04-2-js-client`](ch04-2-js-client) | E1–E6 · Lab 4-2 Interactive pages |
| 5 | 2 Dec | CH5-1 Node.js & Web Server (SSR) | [`ch05-1-node-http`](ch05-1-node-http) | Lab 5 · Tiny web server |
| 6 | 9 Dec | CH5-2 Express.js | [`ch05-2-express`](ch05-2-express) | Lab 6 · Project skeleton with Express |
| 7 | 16 Dec | CH5-3 Database & RESTful API | [`ch05-3-mysql-rest`](ch05-3-mysql-rest) | Lab 7 · Schema + CRUD API |
| 8 | 30 Dec | Project topic due (online) | | Design report PDF |
| 9 | 6 Jan 2027 | CH6 Git & GitHub · CH7 EJS | [`ch06-git`](ch06-git) · [`ch07-ejs`](ch07-ejs) | Lab 9A Group repo + PR · Lab 9B Pages → EJS |
| 10 | 13 Jan | CH8 Authentication, Authorization & PDPA | [`ch08-auth-pdpa`](ch08-auth-pdpa) | Lab 10 · Login system + admin role |
| 11 | 20 Jan | CH9 Asynchronous Programming & AJAX | [`ch09-async-ajax`](ch09-async-ajax) | Lab 11 · AJAX + localStorage |
| 12–13 | 27 Jan, 3 Feb | Review | [`project-starter`](project-starter) | |
| 14 | 10 Feb | Project submission | | |
| 15 | 17 Feb | Project exam (no AI tools) | | |

## Other folders

| Folder | What |
|--------|------|
| [`project-starter/`](project-starter) | A full-stack skeleton (Express 5 + EJS + Tailwind CLI + MySQL + login/admin + PDPA) to start your group project from |
| [`database/`](database) | `classicmodels.sql` sample DB + optional Docker MySQL |
| `archive/` | The 2025 examples (Express 4, Mustache, Bootstrap). Kept for reference only; don't use them for the project |

## How each example works

```bash
cd <folder>
npm install                # Node.js examples only
cp .env.example .env       # only when the folder has .env.example
npm run dev                # node --watch --env-file=.env …
```
Each chapter folder has a `README.md` with the slide mapping, run steps, the lab and a **self-check list**.

## Group members (for your own project repo)

- 6602xxxx fname sname
- 6602xxxx fname sname
