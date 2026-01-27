const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mustacheExpress = require('mustache-express');
const { error } = require('console');

const app = express();
const port = 3000;

app.set('views', `${__dirname}/static`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.get('/random',(req, res)=>{
  res.render('random')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

