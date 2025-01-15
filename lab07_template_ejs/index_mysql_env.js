const express = require('express');
const path = require('path')
const expressLayouts = require('express-ejs-layouts');

global.appRoot = path.resolve(__dirname);

const app = express();
const port = 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.use(expressLayouts);
app.set('layout', 'layout');

const locationRoutes = require('./router/location');

// Use routes
app.use('/location', locationRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

