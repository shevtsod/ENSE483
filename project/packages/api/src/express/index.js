const express = require('express');

const routes = require('./routes');

// Create the Express application instance
const app = express();

// Mount application routes
app.use(routes);

module.exports = app;
