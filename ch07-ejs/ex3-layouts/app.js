// CH7 · Ex3 – Layouts with express-ejs-layouts (alternative to partials)
// One views/layout.ejs with <%- body %>; pages contain only their content.
const express = require('express');
const path = require('node:path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);           // must be app.use()d
app.set('layout', 'layout');       // views/layout.ejs is the default

app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/main', (req, res) => res.render('main', { title: 'Main', menu: ['Your Order', 'Product Order', 'Profile'] }));

app.listen(3000, () => console.log('http://localhost:3000'));
