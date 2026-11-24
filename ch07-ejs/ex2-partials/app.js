// CH7 · Ex2 – Partials with include(): header / nav / footer + TailwindCSS
const express = require('express');
const path = require('node:path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// pretend user (CH8 replaces this with a real session)
const user = { name: 'Somchai' };

app.get('/', (req, res) => res.render('index', { title: 'Home', user }));
app.get('/about', (req, res) => res.render('about'));          // no user → "Login" link in nav
app.get('/items', (req, res) => res.render('items', { title: 'Items', user, items: ['Notebook', 'Pen', 'Bag'] }));

app.use((req, res) => res.status(404).render('404', { title: 'Not found' }));

app.listen(3000, () => console.log('http://localhost:3000'));
