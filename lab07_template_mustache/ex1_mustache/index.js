const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mustacheExpress = require('mustache-express')

const app = express();
const port = 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.get('/simple', (req, res) => {
  a = 2
  b = 3
  operator = '+'
  c = a + b
  res.render('simple', { a, b, operator, c })
});


calculator = (a, b, operator) => {
  a = parseFloat(a)
  b = parseFloat(b)

  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case 'r':
      return a / b
  }
}

app.get('/txt/:cal', (req, res) => {
  cal = req.params['cal'].split(',')
  a = cal[0]
  b = cal[2]
  operator = cal[1]
  c = calculator(a,b,operator)
  operator = operator=='r'?'/':operator
  res.render('simple', { a, b, operator, c })
});

app.get('/cal/:cal', (req, res) => {
  const operRegex = /[+\-*r]/;
  cal = req.params['cal'].split(operRegex)
  
  a = cal[0]
  b = cal[1]
  operator = req.params['cal'].replace(a,'').replace(b,'')
  c = calculator(a,b,operator)
  operator = operator=='r'?'/':operator
  res.render('simple', { a, b, operator, c })
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

