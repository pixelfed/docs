+++
title = "Using Docker"
summary = "Leave the setup up to Docker."
weight = 30
[menu]
[menu.docs]
identifier = "admin/docker"
parent = "admin"
+++

{{<hint style="warning">}}
**WARNING**

Pixelfed is still a work in progress. We do not recommend running an instance in production at this stage unless you know what you are doing!
{{</hint>}}

## Setup

Adjust `.env.docker` to how you want to run your instance:

- Leave `APP_KEY` empty. This will be set automatically on the first run.
- The Docker image has only been tested with MySQL and Redis. Use other databases and cache drivers at your own risk.

## Build

Our Docker image is built based on `contrib/docker/Dockerfile.apache`. (The FPM version is not up-to-date.)

Uncomment the `build` property in the `pixelfed` and `pixelfed_worker` services in `docker-compose.yml` to build the image yourself, instead of using [the one from Docker Hub](https://hub.docker.com/r/pixelfed/pixelfed).

## Run

You'll need to run the image in two parallel containers, with these entrypoints:

- `start.apache.sh` (default)
- `worker.apache.sh`

The easiest way to do this is to use [the provided `docker-compose.yml`](#docker-compose).

### Docker Compose

To build the images without running them yet (see [Build](#build)):

```shell
docker-compose --env-file=.env.docker build
```

To run Pixelfed:

```shell
docker-compose --env-file=.env.docker up
```

### Frontend Proxy

To make your Pixelfed instance available on a public domain, you might want to consider a reverse proxy like [Traefik](https://github.com/traefik/traefik).
