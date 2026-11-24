// router/member.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../lib/mysqlpool');
const { requireLogin } = require('../lib/auth');
const router = express.Router();

// ---------- register ----------
router.get('/register', (req, res) => {
  res.render('member/register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  const { username = '', password = '', confirmPassword = '' } = req.body;
  const back = (status, msg) => res.status(status).render('member/register', { title: 'Register', username, msg });

  // validate on the server too – the browser can be bypassed
  if (!username.trim() || password.length < 8 || password !== confirmPassword) {
    return back(400, 'Passwords must match and have 8+ characters');
  }
  if (req.body.consent !== 'yes') {
    return back(400, 'Please accept the Privacy Notice');
  }
  const hash = await bcrypt.hash(password, 12); // salted, slow hash
  try {
    await pool.execute(
      'INSERT INTO user (username, password, consent_at) VALUES (?, ?, NOW())',
      [username.trim(), hash]);
  } catch (err) {
    if (err.code !== 'ER_DUP_ENTRY') throw err;
    return back(409, 'Username already taken');
  }
  res.redirect('/member/login?msg=Register%20Success');
});

// ---------- login ----------
router.get('/login', (req, res) => {
  res.render('member/login', { title: 'Login', msg: req.query.msg });
});

router.post('/verify', async (req, res, next) => {
  const { username, password } = req.body;
  const [rows] = await pool.execute(
    `SELECT u.id, u.password, u.active, p.value AS role
       FROM user u JOIN privilege p ON p.id = u.privilege_id
      WHERE u.username = ?`, [username]);
  const user = rows[0];
  const ok = user && user.active && (await bcrypt.compare(password ?? '', user.password));
  if (!ok) {
    // same message for a wrong user and a wrong password
    return res.status(401).render('member/login', { title: 'Login', username, msg: 'Wrong Username or Password' });
  }
  req.session.regenerate((err) => {
    // new session id → prevents session fixation
    if (err) return next(err);
    req.session.user = { id: user.id, username, role: user.role }; // store only what you need
    res.redirect('/member/member');
  });
});

// ---------- member page (protected) ----------
router.get('/member', requireLogin, (req, res) => {
  res.render('member/member', { title: 'Member' }); // uses res.locals.user
});

// ---------- logout: POST + destroy the session ----------
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/member/login');
  });
});

module.exports = router;
