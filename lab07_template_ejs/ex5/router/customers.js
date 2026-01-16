const express = require('express');
const pool = require('../libs/mysql');

const router = express.Router();

router.get('/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM customers WHERE customerNumber = ?', [req.params.customerNumber], (err, rows, fields) => {
        if (err) throw err;
        // res.json(rows);
        res.render('customer', {customer: rows[0]});
    })
});

module.exports = router