const mqtt = require('mqtt');

const env = require('./env');
const { logger } = require('./util');

const mqttUrl = `mqtt://${env.MQTT_HOST}:${env.MQTT_PORT}`;
// Server connection timeout, in milliseconds
const connTimeout = 10000;

const mqttClient = mqtt.connect(mqttUrl);

function onSuccess() {
  logger.log(`Connected to MQTT server at ${mqttUrl}`);
}

function onFailure() {
  logger.error(`Could not connect to ${mqttUrl}!`);
  process.exit(1);
}

// If timeout expires and connection was not established, shutdown
const mqttClientConnectTimeoutID = setTimeout(onFailure, connTimeout);

// Handle successful MQTT connection event
mqttClient.on('connect', () => {
  // Clear the timeout to shutdown if connection could not have been established
  clearTimeout(mqttClientConnectTimeoutID);

  onSuccess();
});

module.exports = mqttClient;
