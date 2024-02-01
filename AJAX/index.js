const express = require('express')
const app = express()
const path = require('path')
const me = require('mustache-express')
const bodyParser = require('body-parser')

app.set('views', __dirname + '/static')
app.set('view engine', 'mustache')
app.engine('mustache', me())

app.use(express.static(__dirname + '/static/assets'))

app.listen(3000, '0.0.0.0', () => {
    console.log('running')
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('site/index')
})

app.get('/:page', (req, res) => {
    res.render('site/'+ req.params['page'])
})

// app.get('/main', (req, res) => {
//     res.render('site/main')
// })

// app.get('/about', (req, res) => {
//     res.render('site/about')
// })

// app.get('/contact', (req, res) => {
//     res.render('site/contact')
// })

// app.get('/memberconsole', (req, res) => {
//     res.render('site/memberconsole')
// })





