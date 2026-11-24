// CH8 · Cookies in Express + why a cookie must never decide who you are
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`<h1>Cookie demo</h1>
<p>theme cookie: <b>${req.cookies.theme ?? '(none)'}</b></p>
<p><a href="/theme/dark">set theme=dark</a> · <a href="/theme/clear">clear</a></p>
<p><a href="/bad-login">"Log in" with a username cookie (bad idea)</a> · <a href="/bad-member">bad member page</a></p>`);
});

// Set-Cookie: theme=dark; Max-Age=2592000; Path=/; SameSite=Lax
app.get('/theme/dark', (req, res) => {
  res.cookie('theme', 'dark', { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax', httpOnly: false }); // UI preference – JS may read it
  res.redirect('/');
});
app.get('/theme/clear', (req, res) => {
  res.clearCookie('theme');
  res.redirect('/');
});

// ❌ The old Ex3: the page trusts a username cookie.
// Open DevTools → Application → Cookies, change "username" to "admin" and reload /bad-member.
app.get('/bad-login', (req, res) => {
  res.cookie('username', 'john');
  res.redirect('/bad-member');
});
app.get('/bad-member', (req, res) => {
  if (!req.cookies.username) return res.redirect('/');
  res.send(`<h1>Hello ${req.cookies.username.replace(/[<>&"]/g, '')}</h1><p>The user can edit this cookie → use express-session (ex2).</p>`);
});

app.listen(3000, () => console.log('http://localhost:3000'));
