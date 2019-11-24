# API

Provides an HTTP RESTful API for interacting with the components of the **ENSE
483 Project - Pig Farm Management IoT System**.

## Usage

```shell
docker container run \
  -d \
  -e SECRET_KEY="my_secret" \
  -e DB_DB="my_database" \
  -e DB_USERNAME="my_user" \
  -e DB_PASSWORD="my_password" \
  -e INFLUX_DB="my_database" \
  -e INFLUX_USERNAME="my_user" \
  -e INFLUX_PASSWORD="my_password" \
  --name some-api
  shevtsod/ense483-project-api
```

## Environment Variables

### `HOST`

Host running this application.

Default: `"127.0.0.1"`

### `PORT`

Port to bind this application to.

Default: `8080`

### `SECRET_KEY`

**Required.** Key for encrypting secrets such as authentication tokens.

### `DB_HOST`

Host of MySQL/MariaDB server to connect to.

Default: `"127.0.0.1"`

### `DB_PORT`

Port of MySQL/MariaDB server to connect to.

Default: `3306`

### `DB_DB`

**Required.** Database name to use inside MySQL/MariaDB server to connect to.

### `DB_USERNAME`

**Required.** Username of MySQL/MariaDB user to connect as.

### `DB_PASSWORD`

**Required.** Password of MySQL/MariaDB user to connect as.

### `INFLUX_HOST`: env.INFLUX_HOST || '127.0.0.1',

Host of InfluxDB server to connect to.

Default: `"127.0.0.1"`

### `INFLUX_PORT`

Port of InfluxDB server to connect to.

Default: `8086`

### `INFLUX_DB`: env.INFLUX_DB,

**Required.** Database name to use inside InfluxDB server to connect to.

### `INFLUX_USERNAME`: env.INFLUX_USERNAME,

**Required.** Username of InfluxDB user to connect as.

### `INFLUX_PASSWORD`: env.INFLUX_PASSWORD

**Required.** Password of InfluxDB user to connect as.

## Developing

To develop locally:

```shell
npm run dev
```
