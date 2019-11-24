/**
 * Returns the given log message in a consistent format.
 *
 * @param type {string} Type of log (INFO, ERROR, etc.)
 * @param message {string} Message to be logged
 * @returns {string} Formatted message
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
