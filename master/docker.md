# Installing with Docker and Docker-Compose

::: tip 
DO NOT USE - This is a work in progress - some of the steps are currently place holders!
:::


## Install new Instance
Complete the steps in the standard configuration page.

```bash
$ docker-compose build
$ docker-compose up -d
```

```
$ php artisan migrate --force  # Initializes an empty DB
$ php artisan horizon:assets  # Creates Horizon dashboard resources```


## Updating docker instance

```bash
$ git fetch
$ git checkout v2.8.0
$ docker-compose build --pull
$ docker-compose run --rm app php artisan upgrade:example
$ docker-compose up -d
```
