// CH5-1 · Reading URL & query  (npm run request)
// try: http://localhost:3000/hello?name=Tony
const http = require("node:http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(req.method, url.pathname, req.headers["user-agent"]);
  const name = url.searchParams.get("name") ?? "guest";
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(`Hello, ${name}!`);
});
server.listen(3000, () => console.log("http://localhost:3000/hello?name=Tony"));
