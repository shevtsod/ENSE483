const Knex = require('knex');
const Knexfile = require('./Knexfile');

const logger = require('../util/logger');

const knex = Knex(Knexfile);

knex.raw('SELECT "test connection"')
  .then(() => {
    logger.info('Connected to SQL database server');
  })
  .catch((err) => {
    logger.error(
      `Failed to connect to SQL database.\n  ${err.stack}`,
    );


    process.exit(1);
  });


// Create an SQL database client and wire it to the given server
module.exports = knex;
