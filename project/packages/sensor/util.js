/**
 * Returns the given log message in a consistent format.
 *
 * @param type {string} Type of log (INFO, ERROR, etc.)
 * @param message {string} Message to be logged
 * @return {string} Formatted message
 */
function formatLogMessage(type, message) {
  // Append current date and time to the log message
  const date = new Date();
  const localeString = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  });
  const ms = date.getMilliseconds();

  return `${localeString}.${ms} [${type.toUpperCase()}] ${message}\n`;
}

/**
 * Logger used to output arbitrary messages to STDOUT/STDERR.
 */
exports.logger = {
  /**
   * Logs the given message to STDOUT.
   *
   * @param message {string} Message to be logged
   */
  log: (message) => {
    process.stdout.write(formatLogMessage('INFO', message));
  },

  /**
   * Logs the given message to STDERR.
   *
   * @param message {string} Message to be logged
   */
  error: (message) => {
    process.stderr.write(formatLogMessage('ERROR', message));
  },
};

/**
 * Generates and returns a random number in the given range [min, max].
 *
 * @param min {number} Minimum value
 * @param max {number} Maximum value
 * @return {number} Random value in range [min, max]
 */
exports.generateRandomNumber = (min, max) => {
  // Generate random value in range [0, 1]
  const randomValue = Math.random();

  // Return random value transformed to range [min, max]
  return randomValue * (max - min) + min;
};
