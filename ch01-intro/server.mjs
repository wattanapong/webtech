// CH1 · First Node.js Web Server (no packages)
// Run:  node --watch server.mjs   then open http://localhost:3000
import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.end("<h1>Hello, Web Programming 2026!</h1>");
});

server.listen(3000, () => {
  console.log("Open http://localhost:3000");
});
