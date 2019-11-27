const bodyParser = require('body-parser');
const morgan = require('morgan');

// List of middleware to mount in express
module.exports = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  morgan('combined'),
];
