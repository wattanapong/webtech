// CH5-2 · Router modules – keep index.js small  (npm run router)
const express = require("express");
const products = require("./routes/products");
const app = express();

app.use(express.json());
app.use("/api/products", products); // every route in products.js starts with /api/products

app.get("/", (req, res) => res.send('<a href="/api/products">/api/products</a> · <a href="/api/products/5">/api/products/5</a>'));

app.listen(3000, () => console.log("http://localhost:3000"));
