const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 3000;

require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

// Simple SELECT query
app.get('/locations', (req, res) => {
  pool.query('SELECT * FROM location', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

app.get('/location/json/:id', (req, res) => {

  var sql = 'SELECT * FROM location WHERE location_id = '+req.params['id']
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n'+sql);
    } else {
      res.json(results)
      res.end()
    }
  });
});

app.get('/location/:id', (req, res) => {

  var sql = 'SELECT * FROM location WHERE location_id = '+req.params['id']
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n'+sql);
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.send(`Location ID: ${results[0].location_id}, Name: ${results[0].location_name}`)
      res.sendFile(root_path + '/location/delete.html')
      res.end()
    }
  });
});

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', path.join(__dirname, 'static'));

app.get('/location/update/:id', (req, res) => {

  var sql = 'SELECT * FROM location WHERE location_id = '+req.params['id']
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n'+sql);
    } else {
      // res.setHeader('Content-Type', 'text/html')
      // res.send(`Location ID: ${results[0].location_id}, Name: ${results[0].location_name}`)
      location_id = results[0].location_id
      location_name = results[0].location_name
      res.render('update', {location_id, location_name})
      // res.end()
      
    }
  });
});


// Simple SELECT query
app.post('/locations', (req, res) => {
  const { location_name } = req.body;

  // SQL query to insert data into the location table
  const sql = 'INSERT INTO location (location_name) VALUES (?)';

  // Execute the query with the provided data
  pool.query(sql, [location_name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the ID of the inserted row
    res.json({ id: result.insertId  });
  });
});

// Simple SELECT query
app.post('/location', (req, res) => {

  const { location_id } = req.body;

  // SQL query to insert data into the location table
  const sql = 'DELETE FROM location WHERE location_id=(?)';

  // Execute the query with the provided data
  pool.query(sql, [location_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the ID of the inserted row
    res.json({ 'delete': 'completed'  });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

