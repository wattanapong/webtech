const express = require("express");
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application started and Listening on port ${PORT}`);
});

app.get('/student', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send(`<h1>Please define Student ID</h1>`)
});

app.get('/student/:id', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send(`<h1>Student ID:${req.params['id']}</h1>`)
});

app.get('/address/:province-:amphur', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send(`<h1>Your address is ${req.params['amphur']}, ${req.params['province']}</h1>`)
});

app.get('/address/zipcode=:code', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send(`<h1>Your address zip-code is ${req.params['code']}</h1>`)
});



