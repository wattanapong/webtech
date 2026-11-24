// CH8 · Ex3 – Ex2 + roles: requireRole('admin'), admin page, enable/disable members (Lab 10 Part B model answer)
const express = require('express');
const path = require('node:path');
const session = require('./lib/session');
const memberRoutes = require('./router/member');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(session);

// logged-in user available in every EJS view
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/member', memberRoutes);
app.get(['/', '/login'], (req, res) => res.redirect('/member/login'));
app.get('/register', (req, res) => res.redirect('/member/register'));
app.get('/privacy', (req, res) => res.render('privacy', { title: 'Privacy Notice' }));

app.use((req, res) => res.status(404).send('404 Not found'));

// Express 5: rejected promises land here
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => console.log(`http://localhost:${port}`));
