// CH7 · Ex4 – EJS + database (classicmodels): customers → orders → order details
const express = require('express');
const path = require('node:path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.redirect('/customers'));
app.use('/customers', require('./routes/customers'));
app.use('/orders', require('./routes/orders'));

app.use((req, res) => res.status(404).render('message', { title: 'Not found', message: '404 – page not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('message', { title: 'Error', message: '500 – server error' });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
