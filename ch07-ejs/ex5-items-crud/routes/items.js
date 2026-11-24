// routes/items.js – CRUD for one resource
//   GET  /items            list            → render items/index
//   GET  /items/new        new form        → render items/new
//   POST /items            create (INSERT) → redirect /items   (PRG)
//   GET  /items/:id/edit   edit form       → render items/edit
//   POST /items/:id/edit   update          → redirect /items
//   POST /items/:id/delete delete          → redirect /items
const express = require('express');
const pool = require('../db');
const router = express.Router();

function check(body) {
  const name = body.name?.trim();
  const price = Number(body.price);
  if (!name || body.price === '' || Number.isNaN(price) || price < 0) {
    return { error: 'Please enter a name and a valid price' };
  }
  return { name, price };
}

router.get('/', async (req, res) => {
  const [items] = await pool.execute('SELECT * FROM items ORDER BY id DESC');
  res.render('items/index', { title: 'Items', items });
});

router.get('/new', (req, res) => {
  res.render('items/new', { title: 'New item' });
});

router.post('/', async (req, res) => {
  const v = check(req.body);
  if (v.error) {
    // invalid → render the form again with the old values + 400
    return res.status(400).render('items/new', { title: 'New item', item: req.body, error: v.error });
  }
  await pool.execute('INSERT INTO items (name, price) VALUES (?, ?)', [v.name, v.price]);
  res.redirect('/items'); // PRG: F5 now repeats the harmless GET
});

router.get('/:id/edit', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).render('404', { title: 'Not found' });
  res.render('items/edit', { title: 'Edit', item: rows[0] });
});

router.post('/:id/edit', async (req, res) => {
  const v = check(req.body);
  if (v.error) {
    return res.status(400).render('items/edit', { title: 'Edit', item: { id: req.params.id, ...req.body }, error: v.error });
  }
  await pool.execute('UPDATE items SET name = ?, price = ? WHERE id = ?', [v.name, v.price, req.params.id]);
  res.redirect('/items');
});

router.post('/:id/delete', async (req, res) => {
  await pool.execute('DELETE FROM items WHERE id = ?', [req.params.id]);
  res.redirect('/items');
});

module.exports = router;
