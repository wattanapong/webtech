const express = require('express');
const path = require('path')
const mustacheExpress = require('mustache-express');
// 
const app = express();
const port = process.env.PORT || 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

// require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    res.send(value)
  }, error => {
    console.log(' catch exception ' + error)
    res.send('catch exception ' + error)
  }
  )
})

const calculator = (a, b, operator) => {

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
  let cal = req.params['cal'].split(operRegex)

  let a = cal[0]
  let b = cal[1]

  let operator = req.params['cal'].replace(a, '').replace(b, '')
  let msg = ''
  var txt = ''

  const promise = new Promise((resolve, reject) => {
    if (b == '0' && operator == 'r') {
      reject('divide by zero')
    }
    else {
      let c = calculator(a, b, operator)
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

  let h = d.getHours()
  let m = d.getMinutes()
  let s = d.getSeconds()

  let time = String(h).padStart(2) + ":" +
  String(m).padStart(2,'0') + ":" +
  String(s).padStart(2,'0');

  res.send(time)
})

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

