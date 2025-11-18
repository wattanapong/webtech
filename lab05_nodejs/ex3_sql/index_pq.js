const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432, // Default PostgreSQL port
});

// Simple SELECT query
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results.rows);
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
