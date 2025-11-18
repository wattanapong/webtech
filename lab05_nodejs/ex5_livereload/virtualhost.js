const express = require('express');
const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');
const vhost = require('vhost')

const app = express();
const app1 = express();

// Create a Livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname+ '/lab01_html');

// Add the Livereload middleware
app.use(livereloadMiddleware({
  port: 35729,
}));

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(__dirname+ '/lab01_html'));

// app.use(vhost( "my.local", app1))

const port = process.env.PORT || 3000;
app.listen(port, "my.local", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

// Watch for changes and trigger live reload
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

