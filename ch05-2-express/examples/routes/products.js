// CH5-2 · routes/products.js – a Router module
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Pen" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: Number(req.params.id) }); // GET /api/products/5 → { "id": 5 }
});

module.exports = router;
