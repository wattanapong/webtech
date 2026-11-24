const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Type', 'text/plain');
  res.write('<h1>Hello Web Programming Technology</h1>')
  var params = url.parse(req.url, true).query;
  res.end('Hello, World!\n' + params.name);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 

