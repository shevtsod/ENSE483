const mqtt = require('mqtt');

const env = require('./env');
const { logger } = require('./util');

const mqttUrl = `mqtt://${env.MQTT_HOST}:${env.MQTT_PORT}`;

// Create MQTT client and attempt to connect to the server
const mqttClient = mqtt.connect(mqttUrl);

// Handle successful MQTT connection event
mqttClient.on('connect', () => {
  logger.info(`Connected to MQTT server at "${mqttUrl}"`);
});

// Handle MQTT server disconnection event
mqttClient.on('close', () => {
  logger.info(`Disconnected from MQTT server at "${mqttUrl}"`);
});

// Handle MQTT client closed event
mqttClient.on('end', () => {
  logger.info('Closed MQTT client');
});

module.exports = mqttClient;
