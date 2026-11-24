const express = require('express');
const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');
const path = require('path');
const vhost = require('vhost')

const app = express();

// lab01_html is at the repository root (two levels up from this folder)
const htmlDir = path.join(__dirname, '../../lab01_html');
const app1 = express();

// Create a Livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(htmlDir);

// Add the Livereload middleware
app.use(livereloadMiddleware({
  port: 35729,
}));

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(htmlDir));

// app.use(vhost( "my.local", app1))

const port = process.env.PORT || 3000;
app.listen(port, "my.local", () => {
  console.log(`Server is running on http://my.local:${port}`);
});

// Watch for changes and trigger live reload
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

