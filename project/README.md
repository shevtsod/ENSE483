# ENSE 483 - Project - Pig Farm Management IoT System

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

## Developing

To develop locally:

```shell
docker-compose up --build
```

🚧 WIP 🚧
