const express = require("express");
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/lab01_html')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Application started and Listening on port ${PORT}");
});

app.get('/test', (req, res) =>{
  res.send('<h1>Test Page</h1>')
});
