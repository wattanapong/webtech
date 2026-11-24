// CH7 · Ex1 – Set up EJS in Express 5, EJS tags, passing data, loops & conditionals
const express = require('express');
const path = require('node:path');
const app = express();

app.set('view engine', 'ejs');                   // no require('ejs') needed
app.set('views', path.join(__dirname, 'views')); // res.render('index') → views/index.ejs
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    user: { name: 'John', isAdmin: true },
    note: '<b>Hi</b>', // compare <%= note %> and <%- note %> in the page
  });
});

app.get('/products', (req, res) => {
  const products = [
    { name: 'Notebook', price: 35 },
    { name: 'Pen', price: 12.5 },
  ];
  res.render('products', { title: 'Products', products });
});

app.get('/empty', (req, res) => res.render('products', { title: 'No products', products: [] }));

app.listen(3000, () => console.log('http://localhost:3000'));
