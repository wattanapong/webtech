// CH5-1 · SSR: build HTML on the server  (npm run ssr)
// Right-click → View page source: the list is already in the HTML.
const http = require("node:http");

const items = [
  { name: "Pen", price: 15 },
  { name: "Book", price: 250 },
];

function page(list) {
  const rows = list.map((p) => `<li>${p.name} – ${p.price} THB</li>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Items</title></head>
<body><h1>Items (${list.length})</h1><ul>${rows}</ul></body></html>`;
}

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(page(items));
  })
  .listen(3000, () => console.log("http://localhost:3000"));
