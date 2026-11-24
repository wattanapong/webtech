// ⚠ Demo only: what is wrong here?
//   1. passwords are stored and compared in plain text
//   2. no session: /member/member can be opened by anyone
//   3. no roles: no way to build an admin page
//   4. no privacy notice (PDPA)
const express = require('express');
const pool = require('../lib/mysqlpool');
const router = express.Router();

router.get('/login', (req, res) => res.render('member/login', { msg: req.query.msg }));

router.post('/verify', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.execute(
    'SELECT * FROM member_plain WHERE username = ? AND password = ?', [username, password]); // ❌ plain text
  if (!rows.length) return res.render('member/login', { msg: 'Wrong Username or Password' });
  res.render('member/member', { username });
});

// ❌ anyone can open this URL directly – nothing remembers who logged in
router.get('/member', (req, res) => res.render('member/member', { username: 'anyone!' }));

module.exports = router;
