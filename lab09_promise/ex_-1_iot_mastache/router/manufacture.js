// userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path')


require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Define user routes
router.get('/', (req, res) => {
  res.send('Manufacture Route');
});

// Simple SELECT query
router.get('/list', (req, res) => {
  pool.query('SELECT * FROM manufacture', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {

  var sql = 'SELECT * FROM manufacture WHERE id = ?'
  pool.query(sql, [req.params['id']], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database\n' + sql);
    } else if (results.length == 0) {
      res.status(404).send('no manufacture id = ' + req.params['id']);
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.send(`Manufacture ID: ${results[0].id}, Name: ${results[0].name}`)
    }
  });
});

module.exports = router;