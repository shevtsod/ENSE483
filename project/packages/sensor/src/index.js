require('dotenv').config();

const env = require('./env');
const { logger, generateRandomNumber } = require('./util');
const mqttClient = require('./mqttClient');

// ID returned by setInterval() when called to continuously publish messages
let publishIntervalID = null;

// When connected, start publishing random measurements at the specified interval
mqttClient.on('connect', () => {
  // If already publishing messages, don't setInterval() again
  if (publishIntervalID) return;

  // Start publishing messages on an interval
  publishIntervalID = setInterval(() => {
    // Message body/contents
    const payload = JSON.stringify({
      data: generateRandomNumber(env.VALUE_MIN, env.VALUE_MAX),
    });

    // Publish the message
    mqttClient.publish(env.MQTT_PUB_TOPIC, payload, (err) => {
      const log = `${err ? 'Error publishing' : 'Published'} message:\n`
        + `  TOPIC:   "${env.MQTT_PUB_TOPIC}"\n`
        + `  PAYLOAD: ${payload}`;

      // Log on publish success or failure
      if (err) {
        logger.error(log);
      } else {
        logger.info(log);
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
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => {
  process.once(signal, async () => {
    logger.info('Received shutdown signal. Shutting down ...');

    // Close MQTT client
    await new Promise((resolve) => mqttClient.end(undefined, undefined, resolve));

    process.exit();
  });
});
