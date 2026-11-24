// CH5-3 · Full CRUD API /api/products + a CSR page that uses it with fetch
const express = require("express");
const path = require("node:path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use("/api/products", require("./routes/products"));

app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.use((err, req, res, next) => {
  // after all routes
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}/products  ·  API: /api/products`));
