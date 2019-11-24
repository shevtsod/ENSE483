const env = require('../env');

// Configuration for SQL database
// See http://knexjs.org/#knexfile
module.exports = {
  client: 'mysql',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DB,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  },
};
