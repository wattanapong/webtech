// Project starter – Node.js 24 + Express 5 + EJS + TailwindCSS 4 + MySQL (course project stack)
const express = require('express');
const path = require('node:path');
const session = require('./lib/session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

// logged-in user available in every view
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', require('./routes/pages'));
app.use('/member', require('./routes/member'));
app.use('/items', require('./routes/items'));
app.use('/api', require('./routes/api'));

app.use((req, res) => res.status(404).render('404', { title: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { title: 'Error' });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
