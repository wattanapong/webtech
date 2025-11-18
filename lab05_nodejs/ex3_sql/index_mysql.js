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

tableNames = ['customers', 'orders', 'orderdetails', 'products']
for (const tableName of tableNames) {
  app.get('/' + tableName, (req, res) => {
    pool.query('SELECT * FROM ' + tableName, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving data from the database');
      } else {
        res.json(results);
      }
    });
  });
}

// Simple SELECT query
// app.get('/customers', (req, res) => {
//   pool.query('SELECT * FROM customers', (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error retrieving data from the database');
//     } else {
//       res.json(results);
//     }
//   });
// });

app.post('/customers/:id', (req, res) => {

  var sql = 'SELECT * FROM location WHERE location_id = '+req.params['id']
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

  // SQL query to insert data into the location table
  const sql = 'INSERT INTO location (location_name) VALUES (?)';

  // Execute the query with the provided data
  db.run(sql, [location_name], function(err) {
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


