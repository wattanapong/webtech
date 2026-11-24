// CH8 · Ex1 – Simple login (INSECURE ON PURPOSE – find what is wrong, then see ex2)
const express = require('express');
const path = require('node:path');
const memberRoutes = require('./router/member');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');                   // EJS, not mustache
app.use(express.urlencoded({ extended: true })); // no body-parser
app.use('/member', memberRoutes);
app.get('/', (req, res) => res.redirect('/member/login'));

app.listen(port, () => console.log(`http://localhost:${port}`));
