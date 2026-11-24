// CH7 · Ex5 – Forms & basic CRUD with EJS (items), PRG pattern, 404/500 pages, XSS demo
const express = require('express');
const path = require('node:path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // HTML forms → req.body

app.get('/', (req, res) => res.redirect('/items'));
app.use('/items', require('./routes/items'));

// XSS demo: /xss?text=<img src=x onerror=alert(document.domain)>
app.get('/xss', (req, res) => {
  res.render('xss', { title: 'XSS demo', text: req.query.text ?? '<b>bold?</b>' });
});

// 404 – no route matched
app.use((req, res) => res.status(404).render('404', { title: 'Not found' }));

// Express 5: async errors land here
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { title: 'Error' });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
