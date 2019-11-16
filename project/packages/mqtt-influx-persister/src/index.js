require('dotenv').config();

const { logger, parseMQTTTopic } = require('./util');
const mqttClient = require('./mqttClient');
const influxClient = require('./influxClient');

// When connected, subscribe to all MQTT topics wildcard (#) to receive
// all messages
mqttClient.on('connect', () => {
  mqttClient.subscribe('#', undefined, (err) => {
    if (err) {
      logger.error('Failed to subscribe to all MQTT topics ("#")!');
    } else {
      logger.info('Subscribed to all MQTT topics ("#")');
    }
  });
});

// When an MQTT message is received, persist it in InfluxDB
mqttClient.on('message', (topic, message) => {
  logger.info(
    'Received MQTT message:\n'
      + `  TOPIC:   "${topic}"\n`
      + `  PAYLOAD: ${message}`,
  );

  // Parse the MQTT topic to the measurement to store in InfluxDB
  const parsedTopic = parseMQTTTopic(topic);

  // InfluxDB measurement body/content
  const influxPayload = [
    {
      tags: { id: parsedTopic.tags[0] },
      fields: JSON.parse(message),
    },
  ];

  // Persist measurement in InfluxDB
  influxClient.writeMeasurement(parsedTopic.measurement, influxPayload)
    .then(() => {
      // Log out a success message
      logger.info(
        'Persisted InfluxDB measurement:\n'
          + `  MEASUREMENT: "${parsedTopic.measurement}"\n`
          + `  ID:          ${parsedTopic.tags[0]}\n`
          + `  FIELDS:      ${message}`,
      );
    })
    .catch((err) => {
      const log = 'Encountered error persisting measurement!\n  ';

      // Log out an error message
      if (err.message.includes('401 Unauthorized')) {
        logger.error(`${log}Invalid credentials provided for InfluxDB!`);
      } else {
        logger.error(`${log}${err}`);
      }
    });
});

// Handle shutdown events
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => {
  process.once(signal, async () => {
    logger.info('Received shutdown signal. Shutting down ...');

    // Close MQTT client
    await new Promise((resolve) => mqttClient.end(undefined, undefined, resolve));

    // InfluxDB client is stateless, closing not needed

    process.exit();
  });
});
