const express = require('express')
const app = express()
const path = require('path')
const me = require('mustache-express')
const bodyParser = require('body-parser')
const cookie  = require('cookie-parser')
const mysql =require('mysql2')
const md5 = require('md5')

require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.set('views', __dirname + '/static')
app.set('view engine', 'mustache')
app.engine('mustache', me())

app.use(cookie())

app.use(express.static(__dirname + '/static/assets'))



app.listen(3000, '0.0.0.0', () => {
    console.log('running')
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/index', (req, res) => {
    res.render('site/index')
})

app.get('/', (req, res) => {
    res.render('site/index')
})

app.get('/logout', (req, res) => {
    res.clearCookie('name')
    res.redirect('/')
})

app.post('/register', (req, res) =>{
    const sql = "INSERT INTO user (username, password) VALUES (?,?)"
    const {username,password} = req.body
    pool.query(sql, [username, md5(password)], (err, result) =>{
        if (err){
            return res.status(500).json({'error': err.message})
        }else{
            res.redirect('/')
            // return res.json ({id: result.insertId})
        }
    })
})

app.post('/verify', (req, res) =>{
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?"
    const {username,password} = req.body
    pool.query(sql, [username, md5(password)], (err, result) =>{
        if (err){
            return res.status(500).json({'error': err.message})
        }else{
            if (result.length == 0){
                msg= 'wrong username and password'
            }else{
                msg = 'welcome ' + result[0]['username']
                res.cookie('name', username, {maxAge: 1000000})
            }

            res.redirect('/index?msg='+msg)
        }
    })
})

app.get('/product', (req, res) =>{
    const sql = "SELECT * FROM iot"
    pool.query(sql, (err, result) =>{
        if (err){
            return res.status(500).json({'error': err.message})
        }else{
            devices = app.get('/devices')
            locations = app.get('/locations')
            result.forEach((product)=>{
                products['location'] = locations[product['location_id']]
            })
            res.render('site/products', {product: products})
        }
    })
})

app.get('/:page', (req, res) => {
    // res.render('site/'+ req.params['page'])
    page = req.params['page']
    if (page == 'memberconsole'){
        if (req.cookies.name){
            res.render('site/'+page, {'username': req.cookies.name})
        }else{
            res.render('site/login')
        }
    }else{
        res.render('site/'+ page)
    }
})






