const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 3000;

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'ejs');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

const memberRoutes = require('./router/member');

// Use routes
app.use('/member', memberRoutes);

app.use('/register', (req, res) => {
  res.render('member/register')
})

app.get(['/','/login'],(req,res)=>{
  let {msg} = req.query
  if (msg)
    msg = 'msg='+msg
  res.redirect('/member/login?'+msg)
})

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

