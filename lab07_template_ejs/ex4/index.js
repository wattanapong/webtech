const express = require('express');
const pool = require('./libs/mysql');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/order/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM orders WHERE customerNumber = ?', [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        res.render('order', {orders: rows});
    })
});

app.get('/orderdetails/:orderNumber', (req, res) => {
    pool.query('SELECT * FROM orderdetails, products WHERE orderNumber = ? '+
     'and orderdetails.productCode = products.productCode', [req.params.orderNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        res.render('orderdetails', {orderdetails: rows});
    })
})


app.get('/customers/:customerNumber', (req, res) => {
    pool.query('SELECT * FROM customers WHERE customerNumber = ?', [req.params.customerNumber], (err, rows, fields) => {
        if (err) return res.status(500).send(err.message);
        // res.json(rows);
        if (rows.length == 0) return res.status(404).send('Customer not found');
        res.render('customer', {customer: rows[0]});
    })
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

