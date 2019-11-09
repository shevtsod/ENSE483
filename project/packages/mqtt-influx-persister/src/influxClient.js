const influx = require('influx');

const env = require('./env');
const { logger } = require('./util');

// Server connection timeout, in milliseconds
const connTimeout = 10000;

const influxClient = new influx.InfluxDB({
  host: env.INFLUX_HOST,
  port: env.INFLUX_PORT,
  database: env.INFLUX_DB,
  username: env.INFLUX_USERNAME,
  password: env.INFLUX_PASSWORD,
});

// Try to connect to the server
influxClient.ping(connTimeout)
  .then((hosts) => {
    hosts.forEach((host) => {
      const url = `${host.url.protocol}//${host.url.host}`;

      if (host.online) {
        logger.log(`Connected to InfluxDB server at ${url}`);
      } else {
        logger.error(`Could not connect to ${url}!`);
        process.exit(1);
      }
    });
  });

module.exports = influxClient;
