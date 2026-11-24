// routes/orders.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /orders/:orderNumber – order details joined with products
router.get('/:orderNumber', async (req, res) => {
  const [orderdetails] = await pool.execute(
    `SELECT od.productCode, p.productName, od.quantityOrdered, od.priceEach
       FROM orderdetails od
       JOIN products p ON od.productCode = p.productCode
      WHERE od.orderNumber = ?
      ORDER BY od.orderLineNumber`, [req.params.orderNumber]);
  if (!orderdetails.length) return res.status(404).render('message', { title: 'Not found', message: 'Order not found' });
  res.render('orderdetails', { title: `Order ${req.params.orderNumber}`, orderNumber: req.params.orderNumber, orderdetails });
});

module.exports = router;
