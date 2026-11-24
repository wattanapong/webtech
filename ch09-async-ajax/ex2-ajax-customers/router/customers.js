// router/customers.js
const express = require('express');
const pool = require('../libs/mysql');
const router = express.Router();

const COLS = 'customerNumber, customerName, phone, city, country, creditLimit';

// clamp page & limit from the query string
function paging(query) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
  return { page, limit, offset: (page - 1) * limit }; // page 1 → OFFSET 0 (the old bug used page * limit)
}

// GET /customers – the page itself (SSR for the first load)
router.get('/', async (req, res) => {
  const { limit } = paging(req.query);
  const [rows] = await pool.query(`SELECT ${COLS} FROM customers ORDER BY customerNumber LIMIT ?`, [limit]);
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM customers');
  res.render('customerlist', { title: 'Customers', rows, total, limit });
});

// GET /customers/json?page=2&limit=10 → { page, limit, total, rows }
router.get('/json', async (req, res) => {
  const { page, limit, offset } = paging(req.query);
  const [rows] = await pool.query(
    `SELECT ${COLS} FROM customers ORDER BY customerNumber LIMIT ? OFFSET ?`, [limit, offset]); // query(): LIMIT ? is unreliable with execute()
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM customers');
  res.json({ page, limit, total, rows });
});

// GET /customers/search?q=mini – declare BEFORE '/:customerNumber'
router.get('/search', async (req, res) => {
  const q = `%${req.query.q ?? ''}%`;
  const [rows] = await pool.execute(
    `SELECT ${COLS} FROM customers WHERE customerName LIKE ? ORDER BY customerName LIMIT 50`, [q]);
  res.json(rows);
});

// POST /customers/api – fetch POST with JSON
router.post('/api', async (req, res) => {
  const { customerName, phone, city, country } = req.body;
  if (!customerName?.trim() || !phone?.trim() || !city?.trim() || !country?.trim()) {
    return res.status(400).json({ error: 'customerName, phone, city and country are required' });
  }
  const [[{ next }]] = await pool.query('SELECT MAX(customerNumber) + 1 AS next FROM customers');
  await pool.execute(
    `INSERT INTO customers (customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, city, country)
     VALUES (?, ?, '-', '-', ?, '-', ?, ?)`, [next, customerName.trim(), phone.trim(), city.trim(), country.trim()]);
  res.status(201).json({ id: next });
});

// GET /customers/103 – JSON of one customer
router.get('/:customerNumber', async (req, res) => {
  const [rows] = await pool.execute(`SELECT ${COLS} FROM customers WHERE customerNumber = ?`, [req.params.customerNumber]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

module.exports = router;
