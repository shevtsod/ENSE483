require('dotenv').config();

const { logger, parseMQTTTopic } = require('./util');
const mqttClient = require('./mqttClient');
const influxClient = require('./influxClient');

// Subscribe to all MQTT topics (#) to recveive all messages
mqttClient.subscribe('#', undefined, (err) => {
  if (err) {
    logger.error('Failed to subscribe to all MQTT topics ("#")!');
    process.exit(1);
  }
});

// When an MQTT message is received, persist it in InfluxDB
mqttClient.on('message', (topic, message) => {
  logger.log(
    'Received MQTT message:\n'
      + `  TOPIC:   "${topic}"\n`
      + `  PAYLOAD: ${message}`,
  );

  // Parse the MQTT topic to the measurement to store in InfluxDB
  const parsedTopic = parseMQTTTopic(topic);

  // Persist measurement in InfluxDB
  influxClient.writeMeasurement(parsedTopic.measurement, [
    {
      tags: { id: parsedTopic.tags[0] },
      fields: JSON.parse(message),
    },
  ])
    .then(() => {
      logger.log(
        'Persisted InfluxDB measurement:\n'
          + `  MEASUREMENT: "${parsedTopic.measurement}"\n`
          + `  ID:          ${parsedTopic.tags[0]}\n`
          + `  FIELDS:      ${message}`,
      );
    })
    .catch((err) => {
      if (err.message.includes('401 Unauthorized')) {
        logger.error(
          'Failed to persist measurement!'
            + ' Invalid credentials provided for InfluxDB!',
        );
      } else {
        logger.error(
          'Encountered unhandled error persisting measurement!\n'
            + `  ${err}`,
        );
      }

      process.exit(1);
    });
});

// Handle shutdown events
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) => process.once(signal, () => {
  logger.log('Shutting down ...');

  // Disconnect MQTT client
  mqttClient.end();

  process.exit();
}));
