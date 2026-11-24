const express = require('express');
const pool = require('../libs/mysql');

const router = express.Router();

router.get('/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM customers WHERE customerNumber = ?', [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        if (rows.length == 0) return res.status(404).send('Customer not found');
        res.render('customer', {customer: rows[0]});
    })
});

module.exports = router