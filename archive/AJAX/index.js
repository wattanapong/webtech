const express = require('express')
const app = express()
const me = require('mustache-express')
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



app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/index', (req, res) => {
    
    const msg = req.query.msg
    const text = req.query.text
    console.log(msg)
    res.render('site/index',{'msg':msg, 'text':text})
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
            let msg, text
            if (result.length == 0){
                msg= 'wrong username and password'
                text = 'danger'
            }else{
                msg = 'welcome ' + result[0]['username']
                text = 'primary'
                res.cookie('name', username, {maxAge: 1000000})
            }

            res.redirect('/index?msg=' + encodeURIComponent(msg) + '&text=' + text)
        }
    })
})

app.post('/verifyapi', (req, res) =>{
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?"
    const {username,password} = req.body
    pool.query(sql, [username, md5(password)], (err, result) =>{
        if (err){
            return res.status(500).json({'error': err.message})
        }else{
            let msg, text
            if (result.length == 0){
                msg= 'wrong username and password'
                text = 'danger'
            }else{
                msg = 'welcome ' + result[0]['username']
                text = 'primary'
                // res.cookie('name', username, {maxAge: 1000000})
            }
            res.json({msg:msg, text:text})
        }
    })
})

app.get('/product', (req, res) =>{
    const sql = "SELECT * FROM iot"
    pool.query(sql, (err, result) =>{
        if (err){
            return res.status(500).json({'error': err.message})
        }else{
            res.render('site/products', {product: result})
        }
    })
})

app.get('/:page', (req, res) => {
    // res.render('site/'+ req.params['page'])
    const page = req.params['page']
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

app.listen(3000, '0.0.0.0', () => {
    console.log('running on http://localhost:3000')
})
