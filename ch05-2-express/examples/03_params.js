// CH5-2 · Path parameters, query strings, route order, Express 5 path syntax  (npm run params)
const express = require("express");
const app = express();

// GET /students/65020001
app.get("/students/:id", (req, res) => {
  res.json({ id: req.params.id }); // always a string: "65020001"
});

// GET /address/Phayao/Mueang
app.get("/address/:province/:district", (req, res) => {
  const { province, district } = req.params;
  res.send(`${district}, ${province}`);
});

// GET /products?q=pen&sort=price&page=2
// first match wins: /products/new must come BEFORE /products/:id
app.get("/products/new", (req, res) => res.send("new form"));
app.get("/products/:id", (req, res) => res.send(`product ${req.params.id}`));
app.get("/products", (req, res) => {
  const { q = "", sort = "name", page = "1" } = req.query;
  res.json({ q, sort, page: Number(page) });
});

// optional segment: /files and /files/a.pdf
app.get("/files{/:name}", (req, res) => {
  res.send(req.params.name ?? "file list");
});

// named wildcard (Express 5: a bare "*" throws an error)
app.get("/assets/*splat", (req, res) => {
  res.json(req.params.splat); // /assets/img/logo.png → ["img", "logo.png"]
});

app.listen(3000, () => console.log("http://localhost:3000/students/65020001"));
