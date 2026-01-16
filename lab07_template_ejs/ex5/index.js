const express = require('express');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/customers', require('./router/customers'));
app.use('/order', require('./router/order'));
app.use('/orderdetails', require('./router/orderdetails'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

