# Deployment

Post update procedures or deploying is a set of commands you need to run after installation or updating Pixelfed on a production environment.

::: warning
Depending on the release notes of a specific version, it may require additional deployment commands not listed on this page.
:::

<br>

[[toc]]

### Background Task Runner

Pixelfed needs a process running in the background to handle jobs. Below are example configurations for some init systems.

#### init

Create the file `/etc/init.d/pixelfed-queue.sh` with the following content:

```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          pixelfed-queue
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       Pixelfed task queueing via Laravel Horizon
### END INIT INFO

SCRIPT=/usr/bin/php /home/pixelfed/artisan horizon
RUNAS=<USERNAME>

PIDFILE=/var/run/pixelfed-queue.pid
LOGFILE=/var/log/pixelfed-queue.log

start() {
  if [ -f /var/run/$PIDFILE ] && kill -0 $(cat /var/run/$PIDFILE); then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service…' >&2
  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

uninstall() {
  echo -n "Are you really sure you want to uninstall this service? That cannot be undone. [yes|No] "
  local SURE
  read SURE
  if [ "$SURE" = "yes" ]; then
    stop
    rm -f "$PIDFILE"
    echo "Notice: log file is not be removed: '$LOGFILE'" >&2
    update-rc.d -f <NAME> remove
    rm -fv "$0"
  fi
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  uninstall)
    uninstall
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|uninstall}"
esac
```

You need to replace `<USERNAME>` with a username privileged to access the pixelfed directory (for example `www-data` on some setups). Additionally the path in the line starting with `SCRIPT` needs to be adapted to the path to the pixelfed installation.

The service will log into `/var/log/pixelfed-queue.log`.

#### systemd

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

You might want to change the required services (for example replace `mariadb` with `postgresql` when using that, and replace `nginx` with `apache2` if you use apache). When not using PHP 7.2, `php7.2-fpm` also must be changed.

The path in the line starting with `ExecStart` should match the path to the pixelfed installation.

Afterwards reload services by runnning `systemctl daemon-reload` and enable (and start) the service with `systemctl enable --now pixelfed-queue`.

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

# adapt to your init system
$ sudo systemctl restart pixelfed-queue
$ sudo /etc/init.d/pixelfed-queue.sh restart
```

# Updating

```bash
$ cd /home/pixelfed # Or wherever you chose to install web applications
$ git pull origin dev
```
