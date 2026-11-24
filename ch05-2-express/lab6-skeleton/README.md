# Lab 6 · Group project skeleton with Express (model answer)

Express serves the CH4-2 pages from `public/`, plus a pages router, an API router, a 404 page and an error handler.

```
lab6-skeleton/
├── index.js          create app, middleware, routers, 404, error handler
├── routes/pages.js   HTML routes (GET /about, POST /register)
├── routes/api.js     GET /api/health → { ok: true }
├── views/            EJS templates (CH7)
├── public/           static files: *.html, js/app.js, img/
├── .env.example      variable names, no secrets → copy to .env
└── .gitignore        node_modules/  .env
```

## Run

```bash
cd ch05-2-express/lab6-skeleton
npm install
cp .env.example .env      # Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

`--env-file=.env` stops with an error if `.env` does not exist, so do the copy step first.

## Check

- [ ] `npm install` + `npm run dev` works on a fresh clone
- [ ] `/`, `/login`, `/list`, `/about` and `/api/health` work; `/xyz` shows the 404 page
- [ ] `.env` is **not** in Git; `.env.example` is
