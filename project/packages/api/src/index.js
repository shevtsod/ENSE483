const { Model } = require('objection');

const express = require('./express');
const env = require('./env');
const knex = require('./db/knex');
const logger = require('./util/logger');

// Bind Objection.js ORM models to knex (SQL database connection) instance
Model.knex(knex);

// Start HTTP server at the specified port
const server = express.listen(env.PORT, async () => {
  logger.info(`Started HTTP server at "http://${env.HOST}:${env.PORT}"`);
  logger.info('Listening for requests ...');
});

// Handle Promise rejections
process.on('unhandledRejection', (err) => {
  // Throw an error that will be caught by the logger
  throw err;
});

// Handle shutdown events
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => {
  process.once(signal, async () => {
    logger.info('Received shutdown signal. Shutting down ...');

    // Stop HTTP server
    await new Promise((resolve) => server.close((err) => {
      if (err) {
        logger.error(`Error closing HTTP server\n  ${err}`);
      } else {
        logger.info('Closed HTTP server');
      }

      resolve();
    }));

    // Close MySQL/MariaDB client
    await knex.destroy().then(() => {
      logger.info('Closed MySQL/MariaDB client');
    });

    // InfluxDB client is stateless, closing not needed

    process.exit();
  });
});
