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

## Commands to run on new instance
```
$ php artisan migrate --force  # Initializes an empty DB
$ php artisan storage:link  # Create a symbolic link from "public/storage" to "storage/app/public"
$ php artisan horizon:assets  # Creates Horizon dashboard resources
$ php artisan route:cache  # Create a route cache file for faster route registration
$ php artisan view:cache  # Compile all of the application's Blade templates
$ php artisan config:cache  # Create a cache file for faster configuration loading

```


## Updating docker instance

```bash
$ git fetch
$ git checkout v2.8.0
$ docker-compose build --pull
$ docker-compose up -d
```
