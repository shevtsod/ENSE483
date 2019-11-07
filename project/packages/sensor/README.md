# Sensor

Simulates an arbitrary sensor that publishes numerical measurements within a
given range over MQTT at a regular interval.

## Usage

```shell
docker container run \
  -d \
  -e MQTT_PUB_TOPIC="some/topic" \
  --name some-sensor
  shevtsod/ense483-project-sensor
```

## Environment Variables

### `MQTT_HOST`

Host of MQTT server to connect to.

Default: `"127.0.0.1"`

### `MQTT_PORT`

Port of MQTT server to connect to.

Default: `1883`

### `MQTT_PUB_TOPIC`

**Required**. MQTT topic to publish to.

### `MQTT_PUB_INTERVAL`

Frequency of publishing new MQTT messages, in milliseconds.

Default: `10000`

### `VALUE_MIN`

Minimum value for randomized simulated sensor reading.

Default: `0`

### `VALUE_MAX`

Maximum value for randomized simulated sensor reading.

Default: `1`

## Developing

To develop locally:

```shell
npm run dev
```
