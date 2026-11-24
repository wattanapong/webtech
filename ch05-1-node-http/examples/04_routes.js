// CH5-1 · Simple routing with req.method & URL  (npm run routes)
const http = require("node:http");
const HTML = { "Content-Type": "text/html; charset=utf-8" };

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");
    if (req.method === "GET" && pathname === "/") {
      res.writeHead(200, HTML);
      res.end("<h1>Home</h1><a href='/about'>About</a>");
    } else if (req.method === "GET" && pathname === "/about") {
      res.writeHead(200, HTML);
      res.end("<h1>About us</h1><a href='/'>Home</a>");
    } else {
      res.writeHead(404, HTML);
      res.end("<h1>404 Not Found</h1>");
    }
  })
  .listen(3000, () => console.log("http://localhost:3000"));
