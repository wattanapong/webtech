const express = require('express');
const pool = require('../libs/mysql');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('customerlist');
});

router.get('/json', (req, res) => {
    const page = Number(req.query.page) || 1;   // page starts at 1
    const limit = Number(req.query.limit) || 10;
    pool.query('SELECT * FROM customers Limit ?,?', 
    [(page - 1) * limit, limit], (err, rows, fields) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    })
});

router.get('/edit/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM customers WHERE customerNumber = ?', 
    [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        if (rows.length == 0) return res.status(404).send('Customer not found');
        // res.json(rows);
        res.render('customer', {customer: rows[0], action: 'edit'});
    })
});

router.post('/update', (req, res) => {
    const sql = `
      UPDATE customers
      SET customerName = ?, phone = ?, addressLine1 = ?,
          city = ?, country = ?, creditLimit = ? 
      WHERE customerNumber = ?
    `;
    console.log(req.body)
    const values = [
      req.body.customerName, req.body.phone, req.body.addressLine1,
      req.body.city, req.body.country,  Number(req.body.creditLimit),
      Number(req.body.customerNumber) // used for WHERE
    ];
  
    pool.query(sql, values, function(err, results) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect(`/customers/${req.body.customerNumber}`); 
    });
  });
  

router.get('/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM customers WHERE customerNumber = ?', 
    [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        if (rows.length == 0) return res.status(404).send('Customer not found');
        // res.json(rows);
        res.render('customer', {customer: rows[0], action: 'view'});
    })
});

module.exports = router;