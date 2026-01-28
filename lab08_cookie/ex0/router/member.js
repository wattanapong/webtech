const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const path = require('path')
const pool = require('../lib/mysqlpool')

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res) => {
    const msg = req.query.msg
    res.render('member/login', {registerStatus:msg})
});


router.post('/verify', (req,res) => {
    const {username, password} = req.body
    const sql = "SELECT * FROM user WHERE username = ? and password = ?"

    pool.query(sql, [username, password], (err, results) =>{
        if (err){
            console.log(err)
            res.render('member/login', {username: username, msg: 'Something went wrong, please contact admin'})
        }else{
            if (results.length == 0)
                res.render('member/login', {msg: 'Wrong Username or Password'})
            else{
                res.render('member/member', {username:username})
            }
        }
    })
})

router.get('/member', (req, res) => {
    res.render('member/member')
});


module.exports = router;