# Deployment

Post update procedures or deploying is a set of commands you need to run after installation or updating Pixelfed on a production environment.

::: warning
Depending on the release notes of a specific version, it may require additional deployment commands not listed on this page.
:::

<br>

[[toc]]

### Background Task Runner

Pixelfed needs a process running in the background to handle jobs.

The program which is used for that is called Supervisor. Information on how to install it is available in [their docs](http://supervisord.org/installing.html#installing-a-distribution-package).

> Use the package management tools of your distribution to check availability; e.g. on Debian/Ubuntu you can run `apt search supervisor`, and on CentOS you can run `yum info supervisor`.

After installing supervisor, you need to create a configuration file for the service. When installing the Debian package of supervisor, the file resides in `/etc/supervisor/conf.d/` and is called `pixelfed-horizon.conf`. If your installation has a `supervisor.d` directory instead of `conf.d`, the file should be called `pixelfed-horizon.ini`.

Put the following content into the file, modify it to match your setup and check if the path to the Pixelfed installation and the logfile is writable by the given user.

```
[program:horizon]
command=php /home/pixelfed/artisan horizon
stdout_logfile=/home/pixelfed/horizon.log
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
process_name=%(program_name)s
```

Depending on your init system, you can then enable and start supervisor.

Example for systemd: 
```
$ systemctl enable --now supervisor
```

After that, load the configuration we just created and start horizon:
```
$ supervisorctl reread
$ supervisorctl update
$ supervisorctl start horizon
```

You can then check the running services using:
```
$ supervisorctl status
```

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
$ supervisorctl restart horizon
```

# Updating

```bash
$ cd /home/pixelfed # Or wherever you chose to install web applications
$ git pull origin dev
$ php artisan optimize
```
