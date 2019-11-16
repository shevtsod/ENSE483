const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, printf, colorize,
} = format;

module.exports = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    colorize(),
    printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});
