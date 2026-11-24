// CH5-3 · Original example (classicmodels customers), updated to async/await + REST
// Import database/classicmodels.sql first (see the root README).
const express = require("express");
const path = require("node:path");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Read: list (pool.query is fine when there is no user input)
app.get("/api/customers", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT customerNumber, customerName, phone, city, country FROM customers ORDER BY customerNumber LIMIT 20"
  );
  res.json(rows);
});

// Read: one – user input → ? placeholder (prepared statement)
app.get("/api/customers/:id", async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM customers WHERE customerNumber = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// Update: PUT /api/customers/:id  (2026: not POST /customers/update)
app.put("/api/customers/:id", async (req, res) => {
  const { customerName, phone, city } = req.body;
  if (!customerName || !phone || !city) return res.status(400).json({ error: "customerName, phone, city required" });
  const [r] = await pool.execute(
    "UPDATE customers SET customerName = ?, phone = ?, city = ? WHERE customerNumber = ?",
    [customerName, phone, city, req.params.id]
  );
  if (!r.affectedRows) return res.status(404).json({ error: "Not found" });
  res.json({ customerNumber: Number(req.params.id), customerName, phone, city });
});

// Delete: DELETE /api/customers/:id  (2026: never delete with GET)
// classicmodels has FKs (orders, payments) → most customers cannot be deleted: 409
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const [r] = await pool.execute("DELETE FROM customers WHERE customerNumber = ?", [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: "Not found" });
    res.sendStatus(204);
  } catch (err) {
    if (err.code === "ER_ROW_IS_REFERENCED_2") return res.status(409).json({ error: "Customer has orders/payments" });
    throw err;
  }
});

// ---------------- SQL injection demo (local practice only) ----------------
// Try:  /demo/unsafe?city=Paris     then   /demo/unsafe?city=' OR '1'='1
//       /demo/safe?city=' OR '1'='1   → 0 rows: the value is data, never code
app.get("/demo/unsafe", async (req, res) => {
  const sql = "SELECT customerName, city FROM customers WHERE city = '" + req.query.city + "'"; // ❌ NEVER do this
  const [rows] = await pool.query(sql);
  res.json({ sql, count: rows.length, rows: rows.slice(0, 5) });
});
app.get("/demo/safe", async (req, res) => {
  const [rows] = await pool.execute("SELECT customerName, city FROM customers WHERE city = ?", [req.query.city ?? ""]); // ✅
  res.json({ count: rows.length, rows: rows.slice(0, 5) });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
