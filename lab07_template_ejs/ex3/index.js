const express = require('express');
const path = require('path')
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'ejs');

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.use(expressLayout);
app.set('layout', 'layout');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/sticky', (req, res) => {
  res.render('sticky');
})

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

