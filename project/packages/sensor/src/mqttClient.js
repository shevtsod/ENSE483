const mqtt = require('mqtt');

const env = require('./env');
const { logger } = require('./util');

const mqttUrl = `mqtt://${env.MQTT_HOST}:${env.MQTT_PORT}`;

const mqttClient = mqtt.connect(mqttUrl);

// Handle successful MQTT connection event
mqttClient.on('connect', () => {
  logger.log(`Connected to MQTT server at "${mqttUrl}"`);
});

mqttClient.on('close', () => {
  logger.log(`Disconnected from MQTT server at "${mqttUrl}"`);
});

module.exports = mqttClient;
