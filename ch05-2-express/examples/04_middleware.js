// CH5-2 · Middleware: built-in parsers, custom logger, per-route middleware  (npm run middleware)
const express = require("express");
const app = express();

// custom middleware: runs for every request
function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(req.method, req.originalUrl, res.statusCode, `${Date.now() - start}ms`);
  });
  next(); // forget next() → the request hangs
}
app.use(logger);
app.use(express.json());                         // JSON body → req.body
app.use(express.urlencoded({ extended: true })); // HTML form body → req.body

// server-side validation (never trust the browser)
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid input" });
  }
  res.status(201).json({ email }); // never echo the password
});

// middleware for ONE route only
function onlyJson(req, res, next) {
  if (req.is("application/json")) return next();
  res.status(415).json({ error: "Send JSON" });
}
app.post("/api/items", onlyJson, (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000, () => console.log("http://localhost:3000 – send requests from examples.http"));
