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
 * @typedef {object} ParsedTopic
 * @property {string} measurement Measurement name
 * @property {string[]} tags Tags for measurement
 */

/**
 * Parses an MQTT topic string into an {@link ParsedTopic} object.
 *
 * @example
 * parseMQTTTopic('temperature/0/ABC');
 *
 * // {
 * //   measurement: 'topic',
 * //   tags: [
 * //     '0',
 * //     'ABC'
 * //   ]
 * // }
 * @param topic {string} MQTT topic
 * @returns {ParsedTopic}
 */
exports.parseMQTTTopic = (topic) => {
  const splitTopic = topic.split('/');

  return {
    measurement: splitTopic[0],
    tags: splitTopic.slice(1),
  };
};
