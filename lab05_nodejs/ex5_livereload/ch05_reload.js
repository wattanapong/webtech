const express = require('express');
const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');

const app = express();

// Create a Livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname+ '/lab01_html');

// Add the Livereload middleware
app.use(livereloadMiddleware({
  port: 35729,
}));

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(__dirname+ '/lab01_html'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Watch for changes and trigger live reload
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

