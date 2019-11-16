const Knex = require('knex');

const env = require('../env');
const logger = require('../util/logger');

const knex = Knex({
  client: 'mysql',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DB,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  },
});

knex.raw('SELECT "test connection"')
  .then(() => {
    logger.info('Connected to MySQL/MariaDB server');
  });

module.exports = knex;
