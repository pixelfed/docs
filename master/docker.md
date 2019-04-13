# Installing with Docker and Docker-Compose

::: tip 
DO NOT USE - This is a work in progress - some of the steps are currently place holders!
:::


## Install new Instance
Complete the steps in the standard configuration page.

```bash
$ docker-compose build
$ docker-compose run --rm web php artisan config:cache
$ docker-compose run --rm web php artisan route:cache
$ docker-compose up -d
```



## Updating docker instance

```bash
$ git fetch
$ git checkout v2.8.0
$ docker-compose build --pull
```
