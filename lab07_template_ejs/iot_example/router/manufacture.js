// manufacture routes
const express = require('express');
const router = express.Router();
const db = require('../db');

// Define manufacture routes
router.get('/', (req, res) => {
  res.send('Manufacture Route');
});

// Simple SELECT query
router.get('/list', (req, res) => {
  db.query('SELECT * FROM manufacture', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {

  const sql = 'SELECT * FROM manufacture WHERE id = ?'
  db.query(sql, [req.params['id']], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the database');
    } else if (results.length == 0) {
      res.status(404).send('no manufacture id = ' + req.params['id']);
    } else {
      res.send(`Manufacture ID: ${results[0].id}, Name: ${results[0].name}`)
    }
  });
});

module.exports = router;
