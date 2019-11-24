const { InfluxDB } = require('influx');

const env = require('../env');

// Create InfluxDB client and wire it to the given server
module.exports = new InfluxDB({
  host: env.INFLUX_HOST,
  port: env.INFLUX_PORT,
  database: env.INFLUX_DB,
  username: env.INFLUX_USERNAME,
  password: env.INFLUX_PASSWORD,
});
