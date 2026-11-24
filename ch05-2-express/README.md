# CH5-2 · Express.js (Week 6)

Slides: `slides/CH5-2 - ExpressJS.pptx`

## `examples/`

```bash
cd ch05-2-express/examples
npm install
npm run hello        # or: methods | params | middleware | static | router
```
Send test requests from `examples.http` (VS Code **REST Client** extension) or with `curl`.

| File | Slide topic |
|------|-------------|
| `01_hello.js` | Express 5 starter, `res.send` vs `res.json` |
| `02_methods.js` | GET / POST / PUT / PATCH / DELETE, `app.route()`, `redirect` |
| `03_params.js` | `req.params` vs `req.query`, route order, `{/:name}`, `/*splat` |
| `04_middleware.js` | `express.json()`, `urlencoded`, a custom logger, per-route middleware, server-side validation (400) |
| `05_static_404_error.js` | `express.static` from `public/`, `sendFile`, 404 page, error handler, async errors (Express 5) |
| `06_router.js` + `routes/products.js` | Router modules |

## `lab6-skeleton/`: Lab 6 model answer

This is the recommended project structure (`routes/`, `views/`, `public/`, `.env.example`) serving the CH4-2 pages. See its README.

## Self-check

- [ ] I can explain `req.params` vs `req.query` vs `req.body`
- [ ] I know why `/products/new` must come before `/products/:id`
- [ ] My 404 middleware and error handler come **after** all routes
- [ ] `.env` is in `.gitignore`, and `.env.example` is committed
