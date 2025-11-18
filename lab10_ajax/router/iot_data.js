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

let root_path = path.resolve(__dirname, '../', 'static', 'iot_data')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define user routes
router.get('/', (req, res) => {
    res.send('iot_data Route');
});

router.get('/list', (req, res) => {

    let start = parseInt(req.query.start)
    let end = parseInt(req.query.end)

    start = isNaN(start) ? 0 : start
    end = isNaN(end) ? 10 : (end - start)

    pool.query('SELECT * FROM iot_data LIMIT ?,?', [start, end], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database');
        } else {
            res.json(results);
        }
    });
});


router.get('/table', (req, res)=>{
    res.render('iot_data/table')
})

router.get('/table2/', (req, res)=>{

    var sql = 'SELECT * FROM iot_data LIMIT 0, 20'
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } if (results.length == 0) {
            res.status(404).send('no iot_data_id = ' + req.params['id']);
        } else {
            data = []
            results.forEach( row =>{
                data.push(row)
            })
            res.render('iot_data/table2', {'data': data.slice(1,6)})
        }
    });

    
})

router.get('/json/:id', (req, res) => {

    var sql = 'SELECT * FROM iot_data WHERE iot_data_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } if (results.length == 0) {
            res.status(404).send('no iot_data_id = ' + req.params['id']);
        } else {
            res.json(results)
            res.end()
        }
    });
});

router.get('/:id(\\d+)', (req, res) => {

    var sql = 'SELECT * FROM iot_data WHERE iot_data_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } if (results.length == 0) {
            res.status(404).send('no iot_data_id = ' + req.params['id']);
        } else {
            // res.setHeader('Content-Type', 'text/html')
            iot_data_id = results[0].iot_data_id
            iot_data_name = results[0].iot_data_name
            res.render('iot_data/index', { 'iot_data_id': iot_data_id, 'iot_data_name': iot_data_name })
        }
    });
});

router.get('/update/:id', (req, res) => {

    var sql = 'SELECT * FROM iot_data WHERE iot_data_id = ' + req.params['id']
    pool.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving data from the database\n' + sql);
        } if (results.length == 0) {
            res.status(404).send('no iot_data_id = ' + req.params['id']);
        } else {
            // res.setHeader('Content-Type', 'text/html')
            iot_data_id = results[0].iot_data_id
            iot_data_name = results[0].iot_data_name
            res.render('iot_data/update', { 'iot_data_id': iot_data_id, 'iot_data_name': iot_data_name })
        }
    });
});


router.post('/update', (req, res) => {

    const { iot_data_id, iot_data_name } = req.body;

    const sql = 'UPDATE iot_data SET iot_data_name = ? WHERE iot_data_id=?';

    pool.query(sql, [iot_data_name, iot_data_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect(iot_data_id)
    });
});

router.get('/add', (req, res) => {
    res.render('iot_data/add')
    // res.end()
});

router.post('/add', (req, res) => {
    const { iot_data_name } = req.body;

    // SQL query to insert data into the iot_data table
    const sql = 'INSERT INTO iot_data (iot_data_name) VALUES (?)';

    // Execute the query with the provided data
    pool.query(sql, [iot_data_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.redirect('/iot_data/' + result.insertId)
    });
});


router.post('/delete', (req, res) => {

    const { iot_data_id } = req.body;

    // SQL query to insert data into the iot_data table
    const sql = 'DELETE FROM iot_data WHERE iot_data_id=(?)';

    // Execute the query with the provided data
    pool.query(sql, [iot_data_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Return the ID of the inserted row
        res.json({ 'delete': 'completed' });
    });
});

module.exports = router;