const { env } = process;

// Export environment variables with defaults
module.exports = {
  /**
   * Host running this application.
   */
  HOST: env.HOST || '127.0.0.1',

  /**
   * Port to bind this application to.
   */
  PORT: parseInt(env.PORT, 10) || 8080,

  /**
   * Key for encrypting secrets such as authentication tokens.
   */
  SECRET_KEY: env.SECRET_KEY,

  /**
   * Host of MySQL/MariaDB server to connect to.
   */
  DB_HOST: env.DB_HOST || '127.0.0.1',

  /**
   * Port of MySQL/MariaDB server to connect to.
   */
  DB_PORT: parseInt(env.DB_PORT, 10) || 3306,

  /**
   * Database name to use inside MySQL/MariaDB server to connect to.
   */
  DB_DB: env.DB_DB,

  /**
   * Username of MySQL/MariaDB user to connect as.
   */
  DB_USERNAME: env.DB_USERNAME,

  /**
   * Password of MySQL/MariaDB user to connect as.
   */
  DB_PASSWORD: env.DB_PASSWORD,

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
