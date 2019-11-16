const express = require('express');
const routes = require('./routes');

const app = express();

// Mount application routes
app.use(routes);

module.exports = app;
