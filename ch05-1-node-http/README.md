# CH5-1 · Node.js & Web Server (Week 5)

Slides: `slides/CH5-1 - NodeJS and Web Server (SSR).pptx`

Needs **Node.js 24 LTS** (`node -v`). No packages are installed in this chapter: everything uses Node's built-in modules.

## `examples/`

```bash
cd ch05-1-node-http/examples
npm run loop        # event loop order
npm run files       # node:fs + node:path + require()
npm run request     # http://localhost:3000/hello?name=Tony
npm run routes      # routing with req.method + pathname
npm run server      # serve an HTML file + /api/items JSON
npm run ssr         # build HTML on the server
```

| File | Slide topic |
|------|-------------|
| `01_event_loop.js` | Event loop in action (sync → microtask → timer) |
| `02_files.js`, `math.js`, `math.mjs` | `node:fs/promises`, `node:path`, CommonJS vs ES modules |
| `03_request.js` | Reading the URL and query (`new URL`, `searchParams`) |
| `04_routes.js` | Simple routing and a 404 |
| `05_server.js` | Serving an HTML file and JSON |
| `06_ssr.js` | SSR: build HTML on the server |

## `lab5/`: Lab 5 model answer

```bash
cd ch05-1-node-http/lab5
npm run dev
```
Try `/`, `/about`, `/items`, `/items?max=100`, `/api/items` and `/nothing` (404).

## Self-check

- [ ] I can predict the output order of `01_event_loop.js` before running it
- [ ] `npm run dev` restarts the server when I save (`--watch`, no nodemon)
- [ ] `/items` and `/api/items` show the same data, one as HTML and one as JSON (SSR vs CSR)
- [ ] An unknown URL returns status **404** (check in DevTools → Network)
- [ ] `node_modules/` and `.env` are in `.gitignore`
