/**
 * Error representing an HTTP error status code (4XX or 5XX).
 */
class HttpError extends Error {
  /**
   * Creates a new instance.
   *
   * @param statusCode {number} HTTP status code
   * @param message {string} Error message
   */
  constructor(statusCode, message) {
    super();

    // Set the error name based on the class name
    this.name = this.constructor.name;

    // Set the status code
    this.statusCode = statusCode || 500;

    // Use the given message or set the message based on the status
    this.message = message;

    // Remove constructor invocation from stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpError;
