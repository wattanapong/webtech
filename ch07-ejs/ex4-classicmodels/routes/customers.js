// routes/customers.js – a sub-router
const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /customers  – list
router.get('/', async (req, res) => {
  const [customers] = await pool.query(
    'SELECT customerNumber, customerName, city, country FROM customers ORDER BY customerName');
  res.render('customers', { title: 'Customers', customers });
});

// GET /customers/:customerNumber – one customer + their orders
router.get('/:customerNumber', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM customers WHERE customerNumber = ?', [req.params.customerNumber]);
  if (!rows.length) return res.status(404).render('message', { title: 'Not found', message: 'Customer not found' });
  const [orders] = await pool.execute(
    'SELECT orderNumber, orderDate, status FROM orders WHERE customerNumber = ? ORDER BY orderDate DESC',
    [req.params.customerNumber]);
  res.render('customer', { title: rows[0].customerName, customer: rows[0], orders });
});

module.exports = router;
