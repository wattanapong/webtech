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

app.get('/customers/:id', (req, res) => {

  var sql = 'SELECT * FROM customers WHERE customerNumber = '+req.params['id']
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n'+sql);
    } else {
      res.json(results);
    }
  });
});



// Simple SELECT query
app.post('/customers', (req, res) => {
  const { latitude, longitude, name } = req.body;

  // SQL query to insert data into the customers table
  const attributes = '(customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, city, state, country)';
  const values = [498, 'Wattanapong Suttapak', 'Wattanapong', 'Suttapak', '123-4567', '19 M.2', 'Maeka', 'Phayao', 'Thailand'];
  const sql = `INSERT INTO customers (${attributes}) VALUES (?)`;

  // Execute the query with the provided data
  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the ID of the inserted row
    res.json({ id: this.lastID });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


