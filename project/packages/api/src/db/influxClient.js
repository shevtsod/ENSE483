const influx = require('influx');

const env = require('../env');

module.exports = new influx.InfluxDB({
  host: env.INFLUX_HOST,
  port: env.INFLUX_PORT,
  database: env.INFLUX_DB,
  username: env.INFLUX_USERNAME,
  password: env.INFLUX_PASSWORD,
});
