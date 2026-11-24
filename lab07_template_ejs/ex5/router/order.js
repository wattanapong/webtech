const express = require('express');
const pool = require('../libs/mysql');

const router = express.Router();

router.get('/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM orders WHERE customerNumber = ?', [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        res.render('order', {orders: rows});
    })
});

module.exports = router