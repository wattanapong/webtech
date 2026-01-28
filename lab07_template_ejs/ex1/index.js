const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, 'static')))

app.set('views', `${__dirname}/public`)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:3000')
})

