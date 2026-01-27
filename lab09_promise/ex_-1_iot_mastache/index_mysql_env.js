const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mustacheExpress = require('mustache-express')

const app = express();
const port = 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

const locationRoutes = require('./router/location');
const manufactureRoutes = require('./router/manufacture');
const iotDataRoutes = require('./router/iot_data');

// Use routes
app.use('/location', locationRoutes);
app.use('/manufacture', manufactureRoutes);
app.use('/iot_data', iotDataRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

