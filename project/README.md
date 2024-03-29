# ENSE 483 - Project - Pig Farm Management IoT System

> ### Presentaton: https://docs.google.com/presentation/d/1ExSQbTQov24KCKuZ52RYS2P_npSEnD3D8d_UHptHTkA/edit?usp=sharing

This system implements **Meat UC5.1: Pig Farm Management** as specified in the
_Internet of Food & Farm 2020 Use Case Architectures and Overview of the Related
IoT Systems_ document. This system automates management of pig farms using
sensors that report various parameters of each pig’s health to supply decision
makers such as farmers, slaughterhouse workers, and experts with relevant and
actionable information.

## Requirements

- Docker Engine [1.13.0+](https://docs.docker.com/engine/release-notes/)

## Usage

To deploy in production (i.e., on a Raspberry Pi device):

```shell
# Set environment variables (can also be done via a .env file)
export NODE_ENV="production"
export DB_PASSWORD="my_password"
export SECRET_KEY="my_secret"

# Start services
docker-compose up

# Stop services
docker-compose down
```

## Environment Variables

### `NODE_ENV`

Environment to run Node.js containers in. Affects debugging features such as
logging levels.

Default: `"development"`

### `DB_PASSWORD`

**Required.** Password for the user account with read/write permissions that is
created in each database used by the system.

### `SECRET_KEY`

**Required.** See [API](./packages/api#secret_key).

## API Reference

API reference is available in the form of an interactive environment for the
[Insomnia REST Client](https://insomnia.rest/).

To browse the API reference and send requests via Insomnia:

1. Click on the environment name (top left corner).
2. Click on **Import/Export**.
3. Click on **Import Data** -> **From File**
4. Locate and import [insomnia.json](./doc/insomnia.json) from this repository.

## Developing

To develop locally:

```shell
# Set environment variables (can also be done via a .env file)
export DB_PASSWORD="my_password"
export SECRET_KEY="my_secret"

# Start services
docker-compose \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  -f docker-compose.test-sensors.yml \
  up -d --build

# Stop services
docker-compose \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  -f docker-compose.test-sensors.yml \
  down -v
```

> **NOTE:**
>
> The `docker-compose.dev.yml` file contains overrides specific to the
> development environment. Modifications include building certain images locally
> and selecting different variants of third-party images.
