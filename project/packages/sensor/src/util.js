/**
 * Returns the given log message in a consistent format.
 *
 * @param type {string} Type of log (info, error, etc.)
 * @param message {string} Message to be logged
 * @return {string} Formatted message
 */
function formatLogMessage(type, message) {
  return `${new Date().toISOString()} [${type}]\t${message}\n`;
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
  info: (message) => {
    process.stdout.write(formatLogMessage('info', message));
  },

  /**
   * Logs the given message to STDERR.
   *
   * @param message {string} Message to be logged
   */
  error: (message) => {
    process.stderr.write(formatLogMessage('error', message));
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
