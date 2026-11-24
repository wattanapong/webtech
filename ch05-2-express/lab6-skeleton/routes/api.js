// JSON API – grows into /api/<table> in CH5-3
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date() });
});

module.exports = router;
