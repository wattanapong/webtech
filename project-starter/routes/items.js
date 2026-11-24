// routes/items.js – SSR CRUD (CH7) for the logged-in user's own items. Replace with your own tables.
const express = require('express');
const pool = require('../db');
const { requireLogin } = require('../lib/auth');
const router = express.Router();

router.use(requireLogin); // every route below needs a login

function check(body) {
  const name = body.name?.trim();
  const price = Number(body.price);
  if (!name || body.price === '' || Number.isNaN(price) || price < 0) return { error: 'Please enter a name and a valid price' };
  return { name, price };
}

router.get('/', async (req, res) => {
  const [items] = await pool.execute('SELECT * FROM items WHERE user_id = ? ORDER BY id DESC', [req.session.user.id]);
  res.render('items/index', { title: 'My items', items });
});

router.get('/new', (req, res) => res.render('items/form', { title: 'New item', action: '/items' }));

router.post('/', async (req, res) => {
  const v = check(req.body);
  if (v.error) return res.status(400).render('items/form', { title: 'New item', action: '/items', item: req.body, error: v.error });
  await pool.execute('INSERT INTO items (user_id, name, price) VALUES (?, ?, ?)', [req.session.user.id, v.name, v.price]);
  res.redirect('/items'); // PRG
});

router.get('/:id/edit', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM items WHERE id = ? AND user_id = ?', [req.params.id, req.session.user.id]);
  if (!rows.length) return res.status(404).render('404', { title: 'Not found' });
  res.render('items/form', { title: 'Edit item', action: `/items/${rows[0].id}/edit`, item: rows[0] });
});

router.post('/:id/edit', async (req, res) => {
  const v = check(req.body);
  if (v.error) return res.status(400).render('items/form', { title: 'Edit item', action: `/items/${req.params.id}/edit`, item: req.body, error: v.error });
  // AND user_id = ? → a member can only change their own rows (authorization)
  await pool.execute('UPDATE items SET name = ?, price = ? WHERE id = ? AND user_id = ?', [v.name, v.price, req.params.id, req.session.user.id]);
  res.redirect('/items');
});

router.post('/:id/delete', async (req, res) => {
  await pool.execute('DELETE FROM items WHERE id = ? AND user_id = ?', [req.params.id, req.session.user.id]);
  res.redirect('/items');
});

module.exports = router;
