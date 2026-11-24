const express = require('express');
const pool = require('../libs/mysql');

const router = express.Router();

router.get('/:orderNumber', (req, res) => {
    pool.query('SELECT * FROM orderdetails, products WHERE orderNumber = ? '+
     'and orderdetails.productCode = products.productCode', [req.params.orderNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        res.render('orderdetails', {orderdetails: rows});
    })
})

module.exports = router