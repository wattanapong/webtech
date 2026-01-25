const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const path = require('path')
const pool = require('../lib/mysqlpool')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

router.use(cookie());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/login', (req, res) => {
    const msg = req.query.msg
    res.render('member/login', {registerStatus:msg})
});

router.get('/register', (req, res) => {
    res.render('member/register')
})

router.post('/register', (req, res)=> {
    const {username, password} = req.body
    const sql = "INSERT INTO user (username, password) VALUES (?, ?)"

    bcrypt.hash(password, 12, (err, hash) => {
        if (err){
            console.log(err)
            res.render('member/register', {msg: 'Something went wrong, please contact admin'})
        }else{
            pool.query(sql, [username, hash], (err, results) => {
                if (err){
                    console.log(err)
                    res.render('member/register', {msg: 'Something went wrong, please contact admin'})
                }else{
                    res.redirect('/?msg=Register Success')
                }
            })
        }
    })
})


router.post('/verify', (req,res) => {
    const {username, password} = req.body
    const sql = "SELECT * FROM user WHERE username = ?"

    pool.query(sql, username, (err, results) =>{
        if (err){
            console.log(err)
            res.render('member/login', {username: username, msg: 'Something went wrong, please contact admin'})
        }else{
            if (results.length == 0)
                res.render('member/login', {msg: 'Wrong Username or Password'})
            else{
                if (!bcrypt.compareSync(password, results[0].password)){
                    res.render('member/login', {username: username, msg: 'Wrong Username or Password'})
                    return
                }
                const token = jwt.sign({username: username}, process.env.secret)
                res.cookie('username', username, {maxAge: 24*60*60*1000, httpOnly: true})
                res.cookie('token', token, {maxAge: 24*60*60*1000, httpOnly: true})
                res.render('member/member', {username:username})
            }

        }
    })
})

router.get('/member', (req, res) => {
    // first example
    const username = req.cookies.username;
    res.render('member/member', {username:username})
});

router.get('/logout', (req, res) => {
    const username = req.cookies.username;
    if (username)
        res.clearCookie('token')
        res.clearCookie('username')
    
    res.redirect('/member/login')
});


module.exports = router;