const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mustacheExpress = require('mustache-express');
// const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

// require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.get('/async', (req, res) => {
  // let x = getFrom
  // res.send(' y = ' + y)
  // res.end()

  const promise = new Promise(function (resolve, reject) {
    let x = 1;

    // The producing code (this may take some time)

    if (x == 0) {
      resolve("OK");
    } else {
      reject("Error");
    }
  });

  // promise.then(
  //   function(value) {myDisplayer(value);},
  //   function(error) {myDisplayer(error);}
  // );

  promise.then(value => {
    console.log(value)
  }, error => {
    console.log(' catch exception ' + error)
  }
  )

  promise.catch(error => {
    console.error(error)
  })
})

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

app.get('/cal/:cal', (req, res) => {

  const operRegex = /[+\-*r]/;
  cal = req.params['cal'].split(operRegex)

  a = cal[0]
  b = cal[1]

  operator = req.params['cal'].replace(a, '').replace(b, '')
  let msg = ''
  var txt = ''

  const promise = new Promise((resolve, reject) => {
    if (b == '0' && operator == 'r') {
      reject('divide by zero')
    }
    else {
      c = calculator(a, b, operator)
      operator = operator == 'r' ? '/' : operator
      msg = a + ' ' + operator + ' ' + b + ' = ' + c
      resolve(msg)
    }
  })

  promise.then(
    result => {
      txt = result
      console.log(result)
      res.send(result)
    }, error => {
      txt = 'Found error'
    })

  promise.catch(error => {
    txt += ', Exception:' + error
    console.error(txt)
    res.send(txt)
  })

})

app.get('/time', (req, res) => {
  let d = new Date();

  h = d.getHours()
  m = d.getMinutes()
  s = d.getSeconds()

  time = String(h).padStart(2) + ":" +
  String(m).padStart(2,'0') + ":" +
  String(s).padStart(2,'0');

  res.send(time)
  res.end()
})

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

