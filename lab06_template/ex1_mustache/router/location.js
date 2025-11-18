// userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
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

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define user routes
router.get('/', (req, res) => {
    res.send('Location Route');
});

// Simple SELECT query
router.get('/list', (req, res) => {
    pool.query('SELECT * FROM location', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database');
        } else {
            res.json(results);
        }
    });
});

router.get('/json/:id', (req, res) => {

    var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } else {
            res.json(results)
            res.end()
        }
    });
});

router.get('/:id', (req, res) => {

    var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } else {
            res.setHeader('Content-Type', 'text/html')
            res.send(`Location ID: ${results[0].location_id}, Name: ${results[0].location_name}`)
            res.sendFile(root_path + '/delete.html')
            res.end()
        }
    });
});


router.get('/update/:id', (req, res) => {

    var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } else {
            // res.setHeader('Content-Type', 'text/html')
            // res.send(`Location ID: ${results[0].location_id}, Name: ${results[0].location_name}`)
            location_id = results[0].location_id
            location_name = results[0].location_name
            res.render('location/update', { 'location_id':location_id, 'location_name':location_name })
            // res.end()

        }
    });
});

router.get('/update/:id', (req, res) => {

    var sql = 'SELECT * FROM location WHERE location_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } else {
            // res.setHeader('Content-Type', 'text/html')
            // res.send(`Location ID: ${results[0].location_id}, Name: ${results[0].location_name}`)
            location_id = results[0].location_id
            location_name = results[0].location_name
            res.render('location/update', { 'location_id':location_id, 'location_name':location_name })
            // res.end()

        }
    });
});

// Simple SELECT query
router.post('/list', (req, res) => {
    const { location_name } = req.body;

    // SQL query to insert data into the location table
    const sql = 'INSERT INTO location (location_name) VALUES (?)';

    // Execute the query with the provided data
    pool.query(sql, [location_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Return the ID of the inserted row
        res.json({ id: result.insertId });
    });
});

// Simple SELECT query
router.post('/', (req, res) => {

    const { location_id } = req.body;

    // SQL query to insert data into the location table
    const sql = 'DELETE FROM location WHERE location_id=(?)';

    // Execute the query with the provided data
    pool.query(sql, [location_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Return the ID of the inserted row
        res.json({ 'delete': 'completed' });
    });
});

module.exports = router;