// HTML pages. Static files in public/ are served by express.static;
// add routes here for pages that need server logic (EJS views in CH7).
const express = require("express");
const path = require("node:path");
const router = express.Router();

router.get("/about", (req, res) => {
  res.send(`<h1>About</h1><p>Group 1 · 226297</p><a href="/">Home</a>`);
});

// a form POST handled by the server (replace with MySQL in CH5-3, bcrypt in CH8)
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).send("Invalid input – <a href='/register'>back</a>");
  }
  res.redirect("/member.html");
});

module.exports = router;
