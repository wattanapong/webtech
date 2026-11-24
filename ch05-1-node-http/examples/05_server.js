// CH5-1 · Serving an HTML file and JSON  (npm run server)
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const items = [{ id: 1, name: "Pen", price: 15 }];

http
  .createServer(async (req, res) => {
    if (req.url === "/api/items") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(items));
    }
    const file = path.join(__dirname, "data", "index.html");
    const html = await fs.readFile(file, "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  })
  .listen(3000, () => console.log("http://localhost:3000  and  /api/items"));
