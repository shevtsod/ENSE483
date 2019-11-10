require('dotenv').config();

const env = require('./env');
const { logger, generateRandomNumber } = require('./util');
const mqttClient = require('./mqttClient');

let publishIntervalID = null;

// When connected, start publishing random measurements at the specified interval
mqttClient.on('connect', () => {
  if (publishIntervalID) return;

  publishIntervalID = setInterval(() => {
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

// When disconnected, stop publishing measurements
mqttClient.on('close', () => {
  clearInterval(publishIntervalID);
  publishIntervalID = null;
});

// Handle shutdown events
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => process.once(signal, () => {
  logger.log('Shutting down ...');

  // Disconnect MQTT client
  mqttClient.end();

  process.exit();
}));
