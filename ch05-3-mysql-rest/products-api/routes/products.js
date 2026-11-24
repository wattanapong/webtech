// CH5-3 · routes/products.js – Express 5 + mysql2/promise + prepared statements
// Express 5 sends rejected promises to the error handler, so no try/catch is needed.
const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET /api/products?q=pen
router.get("/", async (req, res) => {
  const q = `%${req.query.q ?? ""}%`;
  const [rows] = await pool.execute("SELECT * FROM products WHERE name LIKE ? ORDER BY id", [q]);
  res.json(rows);
});

// GET /api/products/7
router.get("/:id", async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

function validate(b) {
  if (!b.name || typeof b.price !== "number" || b.price < 0) {
    return "name and price (number >= 0) are required";
  }
}

// POST /api/products   body: { name, price, stock, categoryId }
router.post("/", async (req, res) => {
  const msg = validate(req.body);
  if (msg) return res.status(400).json({ error: msg });
  const { name, price, stock = 0, categoryId = null } = req.body;
  const [r] = await pool.execute(
    "INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)",
    [name, price, stock, categoryId]
  );
  res.status(201).json({ id: r.insertId, name, price, stock, categoryId });
});

// PUT /api/products/7   (send ALL fields)
router.put("/:id", async (req, res) => {
  const msg = validate(req.body);
  if (msg) return res.status(400).json({ error: msg });
  const { name, price, stock = 0, categoryId = null } = req.body;
  const [r] = await pool.execute(
    "UPDATE products SET name = ?, price = ?, stock = ?, category_id = ? WHERE id = ?",
    [name, price, stock, categoryId, req.params.id]
  );
  if (!r.affectedRows) return res.status(404).json({ error: "Not found" });
  res.json({ id: Number(req.params.id), name, price, stock, categoryId });
});

// PATCH /api/products/7   body: { "stock": 5 }
router.patch("/:id", async (req, res) => {
  const allowed = ["name", "price", "stock"]; // whitelist: column names never come from the user
  const keys = Object.keys(req.body).filter((k) => allowed.includes(k));
  if (!keys.length) return res.status(400).json({ error: "No fields" });
  const set = keys.map((k) => `${k} = ?`).join(", "); // "stock = ?"
  const values = [...keys.map((k) => req.body[k]), req.params.id];
  const [r] = await pool.execute(`UPDATE products SET ${set} WHERE id = ?`, values);
  if (!r.affectedRows) return res.status(404).json({ error: "Not found" });
  const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
});

// DELETE /api/products/7
router.delete("/:id", async (req, res) => {
  const [r] = await pool.execute("DELETE FROM products WHERE id = ?", [req.params.id]);
  if (!r.affectedRows) return res.status(404).json({ error: "Not found" });
  res.sendStatus(204);
});

module.exports = router;
