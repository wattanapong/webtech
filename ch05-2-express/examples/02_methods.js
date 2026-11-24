// CH5-2 · Route methods & response helpers  (npm run methods)
// Test with examples.http (VS Code REST Client) or curl.
const express = require("express");
const app = express();
app.use(express.json());

app.get("/products", (req, res) => res.send("list"));
app.post("/products", (req, res) => res.status(201).send("created"));
app.put("/products/:id", (req, res) => res.send(`replaced ${req.params.id}`));
app.patch("/products/:id", (req, res) => res.send(`updated ${req.params.id}`));
app.delete("/products/:id", (req, res) => res.sendStatus(204));

// several methods on one path
app
  .route("/cart")
  .get((req, res) => res.json([]))
  .post((req, res) => res.status(201).json({ ok: true }));

// other helpers
app.get("/old-page", (req, res) => res.redirect("/products")); // 302
app.get("/missing", (req, res) => res.status(404).json({ error: "Not found" }));

app.listen(3000, () => console.log("http://localhost:3000/products"));
