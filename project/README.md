# ENSE 483 - Project - Pig Farm Management IoT System

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
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

> **NOTE:**
>
> The `docker-compose.prod.yml` file contains overrides specific to Raspberry Pi
> devices. For example, a different MariaDB image is specified as the official
> image does not support the Raspberry Pi/ARMHF architecture.

## Environment Variables

### `DB_PASSWORD`

**Required**. Password for the user account with read/write permissions that is
created in each database used by the system.

## Developing

To develop locally:

```shell
docker-compose up --build
```

🚧 WIP 🚧
