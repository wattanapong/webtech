// CH5-2 · Express 5 starter  (npm run hello)
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Express 5</h1>"); // res.send sets Content-Type for you
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello", time: new Date() }); // stringify + header
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
