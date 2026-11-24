// CH5-2 · Static files from public/, 404 page, error handler, async errors  (npm run static)
const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
const app = express();

// __dirname = folder of this file; path.join makes an OS-safe path
const pub = path.join(__dirname, "public");
app.use(express.static(pub, { extensions: ["html"] })); // /about works without .html

app.get("/main", (req, res) => res.sendFile(path.join(pub, "index.html"))); // needs an absolute path
app.get("/test", (req, res) => res.redirect("/main"));

// Express 5: a rejected promise goes to the error handler automatically
app.get("/api/report", async (req, res) => {
  const text = await fs.readFile(path.join(__dirname, "data", "report.json"), "utf8"); // file does not exist → 500
  res.json(JSON.parse(text));
});
app.get("/api/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    const err = new Error("id must be a number");
    err.status = 400;
    err.expose = true;
    throw err;
  }
  res.json({ id });
});

// 404: the last app.use() – Express 5 does NOT allow app.get("*")
app.use((req, res) => {
  res.status(404).sendFile(path.join(pub, "404.html"));
});

// error handler: 4 arguments, registered LAST
app.use((err, req, res, next) => {
  console.error(err.message);
  const msg = err.expose ? err.message : "Server error";
  res.status(err.status ?? 500).json({ error: msg });
});

app.listen(3000, () => console.log("http://localhost:3000"));
