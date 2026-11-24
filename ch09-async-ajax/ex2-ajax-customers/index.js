// CH9 · Ex2 – Customer list with pagination & live search, no page reload (AJAX with fetch)
const express = require('express');
const path = require('node:path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.redirect('/customers'));
app.use('/customers', require('./router/customers'));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}/customers`));
