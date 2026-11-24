// routes/api.js – JSON for fetch (CH5-3 / CH9)
const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/health', (req, res) => res.json({ ok: true }));

// GET /api/items?q=&page= → { page, limit, total, rows }   (only the logged-in user's items)
router.get('/items', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Login required' });
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = 10;
  const q = `%${req.query.q ?? ''}%`;
  const uid = req.session.user.id;
  const [rows] = await pool.query(
    'SELECT id, name, price FROM items WHERE user_id = ? AND name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
    [uid, q, limit, (page - 1) * limit]);
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM items WHERE user_id = ? AND name LIKE ?', [uid, q]);
  res.json({ page, limit, total, rows });
});

module.exports = router;
