const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { error } = require("console");

const app = express();
const port = 3000;

app.set("views", `${__dirname}/static`);
app.set("view engine", "ejs");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, "static");

app.use(express.static(root_path));

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/promise", (req, res) => {
  const promise = new Promise(function (resolve, reject) {
    let flag = true;
    if (flag) {
      resolve("OK");
    } else {
      reject("Error");
    }
  });

  let msg = '';

  promise.then(
    result => {
      msg += `Then ${result}<br>`;
    }
  ).catch(
    error => {
    msg += `Catch ${error}`;
  }).finally(
    () => {
      msg += `Finally`;
      res.end(`<h1>${msg}</h1>`);
    }
  );  
});

app.get('/promise_ex1', (req, res) =>{
  res.render('promise')
})

app.get("/time", (req, res) => {
  let d = new Date();

  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();

  time =
    String(h).padStart(2) +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0");

  res.send(time);
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
