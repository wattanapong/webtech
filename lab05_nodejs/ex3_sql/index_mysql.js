const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'webtech',
  password: '1234',
  database: 'classicmodels',
});

app.use(express.static('static'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Simple SELECT query
app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

app.get('/customers/insert', (req, res) => {
  res.sendFile(__dirname + '/static/form.html')
});

app.post('/customers', async (req, res) => {
  let attributes = '(customerNumber, customerName, contactLastName,';
  attributes += ' contactFirstName, phone, addressLine1, city, state, country)';
  
  const sql = `INSERT INTO customers ${attributes} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    req.body.customerNumber,
    req.body.customerName,
    req.body.contactLastName,
    req.body.contactFirstName,
    req.body.phone,
    req.body.addressLine1,
    req.body.city,
    req.body.state,
    req.body.country
  ];

  console.log(pool.format(sql, values));

  pool.query(sql, values, function(err, results) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.redirect('/customers/' + values[0]);
    console.log(results)

    // can use insertId where customerNumber (Primary key) is auto-increment
    // res.redirect('/customers/' + results.insertId);
  });
});

app.post('/customers/update', (req, res) => {
  const sql = `
    UPDATE customers
    SET customerName = ?,
        contactLastName = ?,
        contactFirstName = ?,
        phone = ?,
        addressLine1 = ?,
        city = ?,
        state = ?,
        country = ?
    WHERE customerNumber = ?
  `;
  console.log(req.body)
  const values = [
    req.body.customerName,
    req.body.contactLastName,
    req.body.contactFirstName,
    req.body.phone,
    req.body.addressLine1,
    req.body.city,
    req.body.state,
    req.body.country,
    req.body.customerNumber // used for WHERE
  ];

  pool.query(sql, values, function(err, results) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.get('/customers/delete/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM customers WHERE customerNumber = ?', 
  [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.redirect('/');
    }
  });
})

app.get('/customers/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM customers WHERE customerNumber = ?', [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


