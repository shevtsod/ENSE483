# MQTT Influx Persister

Acts as a bridge between an MQTT server and an InfluxDB server. Subscribes to
the topic `#` (all topics) and persists every received MQTT message into an
InfluxDB time series.

## Usage

```shell
docker container run \
  -d \
  -e INFLUX_DB="my_database" \
  -e INFLUX_USERNAME="my_user" \
  -e INFLUX_PASSWORD="my_password" \
  --name some-mqtt-influx-persister
  shevtsod/ense483-project-mqtt-influx-persister
```

## Environment Variables

### `MQTT_HOST`

Host of MQTT server to connect to.

Default: `"127.0.0.1"`

### `MQTT_PORT`

Port of MQTT server to connect to.

Default: `1883`

### `INFLUX_HOST`

Host of InfluxDB server to connect to.

Default: `"127.0.0.1"`

### `INFLUX_PORT`

Port of InfluxDB server to connect to.

Default: `8086`

### `INFLUX_DB`

**Required.** Database name to use inside InfluxDB server to connect to.

### `INFLUX_USERNAME`

**Required.** Username of InfluxDB user to connect as.

### `INFLUX_PASSWORD`

**Required.** Password of InfluxDB user to connect as.

## Developing

To develop locally:

```shell
npm run dev
```
