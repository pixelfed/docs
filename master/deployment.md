# Deployment

Post update procedures or deploying is a set of commands you need to run after installation or updating Pixelfed on a production environment.

::: warning
Depending on the release notes of a specific version, it may require additional deployment commands not listed on this page.
:::

<br>

[[toc]]

### Post Deployment Commands
```bash
$ cd /home/pixelfed # Or wherever pixelfed is installed
$ composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
$ php artisan config:cache
$ php artisan route:cache
$ php artisan migrate --force
$ php artisan horizon:purge
$ php artisan storage:link
$ php artisan horizon:install
$ php artisan horizon:assets
```

### Background Task Runner

Create the file `/etc/systemd/system/pixelfed-queue.service` with the following content:

```
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=php7.2-fpm.service
Requires=redis.service
Requires=mariadb.service
Wants=nginx.service

[Service]
Type=simple
ExecStart=/usr/bin/php /home/pixelfed/artisan horizon
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

You might want to change the required services (for example replace `mariadb` with `postgresql` when using that db, and replace `nginx` with `apache2` if you use apache).

The path in the line starting with `ExecStart` should be the path to the pixelfed installation.

Afterwards reload services by runnning `systemctl daemon-reload` and enable (and start) the service with `systemctl enable --now pixelfed-queue`.
