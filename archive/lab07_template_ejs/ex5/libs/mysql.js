const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.dbname
});

module.exports = pool;
