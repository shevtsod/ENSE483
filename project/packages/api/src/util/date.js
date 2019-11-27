const { format } = require('date-fns');

/**
 * Converts a {@link Date} to an SQL-compatible timestamp format. The format is
 * "YYYY-MM-DD HH:MM:SS".
 *
 * @see https://mariadb.com/kb/en/library/timestamp/
 * @param date {Date} Date to format
 * @returns {string} SQL-compatible timestamp
 */
exports.toSQLTimestamp = (date) => format(date, 'yyyy-MM-dd HH:mm:ss');
