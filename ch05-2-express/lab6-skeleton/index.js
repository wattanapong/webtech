// CH5-2 · Lab 6 model answer: group project skeleton with Express 5
const express = require("express");
const path = require("node:path");
const pages = require("./routes/pages");
const api = require("./routes/api");

const app = express();

// your own logger middleware
app.use((req, res, next) => {
  res.on("finish", () => console.log(req.method, req.originalUrl, res.statusCode));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use("/", pages);
app.use("/api", api);

// 404 – after all routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// error handler – 4 arguments, last
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send("Server error");
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
