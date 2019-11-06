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
   * MQTT topic to publish to.
   */
  MQTT_PUB_TOPIC: env.MQTT_PUB_TOPIC,

  /**
   * Frequency of publishing new MQTT messages, in milliseconds.
   */
  MQTT_PUB_INTERVAL: parseInt(env.MQTT_PUB_INTERVAL, 10) || 10000,

  /**
   * Minimum value for randomized simulated sensor reading.
   */
  VALUE_MIN: Number(env.VALUE_MIN) || 0,

  /**
   * Maximum value for randomized simulated sensor reading.
   */
  VALUE_MAX: Number(env.VALUE_MAX) || 1,
};
