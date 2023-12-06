const express = require("express");
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application started and Listening on port ${PORT}`);
});

app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send('<h1>Test Page</h1>')
});

// app.get('/student', (req, res) =>{
//     res.setHeader('Content-Type', 'text/html')
//     res.send(`<h1>Please define Student ID</h1>`)
// });

app.get('/student/:id', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send(`<h1>Student ID:${req.params['id']}</h1>`)
});