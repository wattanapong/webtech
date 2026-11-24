// CH5-1 · Lab 5 model answer: a node:http server (no Express yet)
//   GET /            → public/index.html
//   GET /about       → public/about.html
//   GET /api/items   → JSON array
//   GET /items       → the same array as an HTML list (SSR)
//   GET /items?max=100 → filter by price
//   anything else    → 404 page
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const items = [
  { id: 42, title: "Broken fan", room: "305", cost: 350 },
  { id: 43, title: "Leaking tap", room: "112", cost: 80 },
  { id: 44, title: "Light does not work", room: "208", cost: 60 },
  { id: 45, title: "Door lock stuck", room: "410", cost: 150 },
  { id: 46, title: "Air-con not cold", room: "301", cost: 900 },
];

const HTML = { "Content-Type": "text/html; charset=utf-8" };
const PUBLIC = path.join(__dirname, "public");

async function sendFile(res, name, status = 200) {
  const html = await fs.readFile(path.join(PUBLIC, name), "utf8");
  res.writeHead(status, HTML);
  res.end(html);
}

// escape text before putting it into HTML (XSS – see CH7/CH8)
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function itemsPage(list, max) {
  const rows = list.map((i) => `<li>#${i.id} ${esc(i.title)} – room ${esc(i.room)} – ${i.cost} THB</li>`).join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Requests</title></head>
<body>
  <h1>Repair requests (${list.length})${max ? ` – cost ≤ ${max}` : ""}</h1>
  <ul>${rows}</ul>
  <p><a href="/items?max=100">cost ≤ 100</a> · <a href="/items">all</a> · <a href="/">home</a></p>
</body></html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(req.method, url.pathname + url.search);
    if (req.method !== "GET") {
      res.writeHead(405, { "Content-Type": "text/plain" });
      return res.end("Method Not Allowed");
    }
    const max = Number(url.searchParams.get("max")) || null;
    const list = max ? items.filter((i) => i.cost <= max) : items;

    switch (url.pathname) {
      case "/":
        return await sendFile(res, "index.html");
      case "/about":
        return await sendFile(res, "about.html");
      case "/api/items":
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(list));
      case "/items":
        res.writeHead(200, HTML);
        return res.end(itemsPage(list, max));
      default:
        return await sendFile(res, "404.html", 404);
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Internal Server Error");
  }
});

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
