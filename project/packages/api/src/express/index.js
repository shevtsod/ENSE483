const express = require('express');

const middleware = require('./middleware');
const routes = require('./routes');
const errorHandler = require('./errorHandler');

// Create the Express application instance
const app = express();

// Mount middleware
app.use(middleware);

// Mount application routes
app.use(routes);

// Mount error handlers (must be mounted after routes)
// see https://expressjs.com/en/guide/error-handling.html
app.use(errorHandler);

module.exports = app;
