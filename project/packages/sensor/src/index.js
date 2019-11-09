require('dotenv').config();
const mqtt = require('mqtt');

const env = require('./env');
const { logger, generateRandomNumber } = require('./util');

const mqttUrl = `mqtt://${env.MQTT_HOST}:${env.MQTT_PORT}`;
// MQTT server connection timeout, in milliseconds
const mqttClientConnectTimeout = 10000;

// Create a client and connect to the MQTT server
const mqttClient = mqtt.connect(mqttUrl);

// If timeout expires and connection was not established, shutdown
const mqttClientConnectTimeoutID = setTimeout(() => {
  logger.error(`Could not connect to ${mqttUrl}!`);
  process.exit(1);
}, mqttClientConnectTimeout);

// Handle successful MQTT connection event
mqttClient.on('connect', () => {
  // Clear the timeout to shutdown if connection could not have been established
  clearTimeout(mqttClientConnectTimeoutID);

  logger.log(`Connected to ${mqttUrl}`);

  // Start publishing random measurements at the specified interval
  setInterval(() => {
    const payload = JSON.stringify({
      data: generateRandomNumber(env.VALUE_MIN, env.VALUE_MAX),
    });

    mqttClient.publish(env.MQTT_PUB_TOPIC, payload, (err) => {
      const log = `${err ? 'Error publishing' : 'Published'} message:\n`
        + `  TOPIC:   "${env.MQTT_PUB_TOPIC}"\n`
        + `  PAYLOAD: ${payload}`;

      if (err) {
        logger.error(log);
      } else {
        logger.log(log);
      }
    });
  }, env.MQTT_PUB_INTERVAL);
});

// Handle shutdown events
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => process.once(signal, () => {
  logger.log('Shutting down ...');

  // Disconnect MQTT client
  mqttClient.end();

  process.exit();
}));