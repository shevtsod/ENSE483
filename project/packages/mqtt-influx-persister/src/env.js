const dotenv = require('dotenv');

// Load custom environment variables into process.env
dotenv.config();

const { env } = process;

// Export environment variables with defaults
module.exports = {
  /**
   * Host of MQTT server to connect to.
   */
  MQTT_HOST: env.MQTT_HOST || '127.0.0.1',

  /**
   * Port of MQTT server to connect to.
   */
  MQTT_PORT: parseInt(env.MQTT_PORT, 10) || 1883,

  /**
   * Host of InfluxDB server to connect to.
   */
  INFLUX_HOST: env.INFLUX_HOST || '127.0.0.1',

  /**
   * Port of InfluxDB server to connect to.
   */
  INFLUX_PORT: parseInt(env.INFLUX_PORT, 10) || 8086,

  /**
   * Database name to use inside InfluxDB server to connect to.
   */
  INFLUX_DB: env.INFLUX_DB,

  /**
   * Username of InfluxDB user to connect as.
   */
  INFLUX_USERNAME: env.INFLUX_USERNAME,

  /**
   * Password of InfluxDB user to connect as.
   */
  INFLUX_PASSWORD: env.INFLUX_PASSWORD,
};
