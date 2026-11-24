// lib/session.js – express-session with a MySQL store (survives node --watch restarts)
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const store = new MySQLStore({
  // creates the table "sessions" automatically
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = session({
  secret: process.env.SESSION_SECRET, // long random string from .env
  store,
  resave: false,
  saveUninitialized: false, // no cookie before login
  cookie: {
    httpOnly: true,           // JavaScript cannot read it
    sameSite: 'lax',          // blocks most CSRF
    maxAge: 2 * 3600e3,       // 2 hours
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  },
});
