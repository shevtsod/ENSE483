const { ValidationError } = require('objection');

const HttpError = require('../errors/HttpError');
const logger = require('../util/logger');

/**
 * Custom Express application error handler.
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 * @param err {Error} Error raised by previous middleware
 * @param req {object} Express request
 * @param res {object} Express response
 * @param next {Function} Next Express middleware in the chain
 */
// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, next) => {
  // Try to get error code from error object with default
  let statusCode = err.statusCode || 500;
  // Only expose error messages explicitly
  let message;

  // Objection.js errors (database, validation)
  if (err instanceof ValidationError) message = err.message;

  // HTTP errors
  if (err instanceof HttpError) message = err.message;

  // Syntax errors are a result of a bad request
  if (err instanceof SyntaxError) statusCode = 400;

  // Log 500 errors
  if (statusCode === 500) {
    logger.error(err.stack);
  }

  // Set the status code in the response
  res.status(statusCode);

  // If a message is provided, append a body
  if (message) {
    return res.json({
      message,
    });
  }

  // Otherwise send an empty response with the status
  return res.end();
};
