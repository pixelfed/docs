---
title = "Generic installation guide"
summary = "How to set up everything you need to run your own Pixelfed instance."
weight = 20
[menu]
[menu.docs]
identifier = "admin/installation"
parent = "admin"
---

# Installation

Make sure you have all [prerequisites](./prerequisites) installed and the appropriate services running/enabled before continuing.

## Setting up Pixelfed files

### Download source via Git

Pixelfed Beta currently uses the `dev` branch for deployable code. When v1.0 is released, the stable branch will be changed to `stable`, with `dev` branch being used for development and testing.

```shellscript
cd /usr/share/webapps # or wherever you choose to install web applications
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # checkout dev branch into "pixelfed" folder
```

### Set correct permissions

Your web server and app processes need to be able to write to the Pixelfed directory. Make sure to set the appropriate permissions. For example, if you are running your processes through the `http` user/group, then run the following:

```shellscript
cd pixelfed
sudo chown -R http:http . # change user/group to http user and http group
sudo find . -type d -exec chmod 755 {} \; # set all directories to rwx by user/group
sudo find . -type f -exec chmod 644 {} \; # set all files to rw by user/group
```

::: danger
**User and group permissions**
Make sure to use the correct user/group name for your system. This may be `http`, `www-data`, or `pixelfed` (if using a dedicated user).
:::

### Initialize PHP dependencies

Run `composer install` to fetch the dependencies needed by Pixelfed. It is recommended to run with the following flags:

```shellscript
composer install --no-ansi --no-interaction --optimize-autoloader
```

## Configure environment variables

By default Pixelfed comes with a `.env.example` file for production deployments, and a `.env.testing` file for debug deployments. You'll need to rename or copy one of these files to `.env` regardless of which environment you're working on.

```shellscript
cp .env.example .env # for production deployments
cp .env.testing .env # for debug deployments
```

You can now edit `.env` and change values for your setup.

### App variables

- Set `APP_NAME` to your desired title, e.g. `Pixelfed`. This will be shown in the header bar and other places.
- Ensure that `APP_DEBUG` is `false` for production environments, or `true` for debug environments.
- Set your `APP_URL` to the HTTPS URL that you wish to serve Pixelfed through, e.g. `https://pixelfed.example`
- Set `APP_DOMAIN`, `ADMIN_DOMAIN`, and `SESSION_DOMAIN` to the domain name you will be using for Pixelfed, e.g. `pixelfed.example`

### Database variables

By default, the values provided will allow connecting to MySQL or MariaDB over the default localhost TCP connection.

If you are running Postgres:

- Set `DB_CONNECTION` to `pgsql` instead of `mysql`.

If you are running your SQL server on a different machine or port:

- Set `DB_HOST` to the IP of the machine
- Set `DB_PORT` to the port on which your database server is exposed

Alternatively, if you are using a Unix socket:

- Set `DB_SOCKET` to the path of the socket, e.g. `/run/mysqld/mysqld.sock`

To connect to the database you created:

- Set `DB_DATABASE` to the name of the database created for Pixelfed
- Set `DB_USERNAME` to the user that was granted privileges for that database
- Set `DB_PASSWORD` to the password that identifies the user with privileges to the database

### Redis variables

If you are running Redis over TCP on the same machine as Pixelfed, then the default settings will work.

If you are running Redis on another machine:

- Set `REDIS_HOST` to the IP of the machine your Redis server is running on
- Set `REDIS_PORT` to the port on which Redis is exposed
- Set `REDIS_PASSWORD` to the password of that Redis server

If you are using a Unix socket for Redis, then:

- Set `REDIS_SCHEME` to `unix`
- Set `REDIS_HOST` to the path of the socket, e.g. `/run/redis/redis.sock`
- Set `REDIS_PORT` to `0`

::: tip
**TCP server vs. Unix socket**

Redis usually comes pre-configured to listen for TCP requests on the local machine over port 6379. In your Redis configuration, typically at `/etc/redis.conf`, the relevant lines are `bind 127.0.0.1` and `port 6379`.

Changing the latter line to `port 0` will disable TCP listening, in which case Redis must be configured for socket access. Lines such as `unixsocket /run/redis/redis.sock` and `unixsocketperm 770` must be set to enable socket access. Additionally, both the app user and web user should have permission to access the socket, e.g. by being added to the `redis` group.

Using a Unix socket is optional, but may provide faster access since it does not have to create TCP packets. TCP is usually used over a network, and would be required if Redis were running on a different machine than your web server.
:::

### Email variables

By default, Pixelfed will not send any emails, but will instead write messages to the Laravel log. 

To setup a mailer for production deployments, you have several options for supported mail services. Pixelfed currently supports SMTP, Mailgun, Postmark, Amazon SES, and `sendmail` for sending emails to users.

- Set `MAIL_FROM_ADDRESS` to the email address you want to send from
- Set `MAIL_FROM_NAME` to the name you want to appear on emails
- Set `MAIL_ENCRYPTION` to `tls` in order to have emails be properly delivered

#### SMTP (Mailtrap)

Set up your SMTP server. Or, create an account with [Mailtrap](https://mailtrap.io).

- Set `MAIL_DRIVER` to `smtp`
- Set `MAIL_HOST` to your host, e.g. `smtp.mailtrap.io`
- Set `MAIL_PORT` to your port, e.g. `587` or `2525`
- Set `MAIL_USERNAME` and `MAIL_PASSWORD` if your SMTP server requires authorization. (Mailtrap.io does not.)

#### Mailgun

Create an account with [Mailgun](https://mailgun.com/).

- Set `MAIL_DRIVER` to `mailgun`
- Set `MAIL_HOST` to `smtp.mailgun.org`
- Set `MAIL_PORT` to `587`
- Set `MAIL_USERNAME` to your Mailgun domain
- Set `MAIL_PASSWORD` to your Mailgun API key

If you are not using the "US" [Mailgun region](https://documentation.mailgun.com/en/latest/api-intro.html#mailgun-regions), you may define your region's endpoint in the `services.php` configuration file located in the `config/` directory:

```php
'mailgun' => [
    'domain' => env('MAILGUN_DOMAIN'),
    'secret' => env('MAILGUN_SECRET'),
    'endpoint' => 'api.eu.mailgun.net',
],
```

#### Postmark

To use the Postmark driver, install Postmark's SwiftMailer transport via Composer:

```bash
composer require wildbit/swiftmailer-postmark
```

Next, install Guzzle and set the `driver` option in your `config/mail.php` configuration file to `postmark`. Finally, verify that your `config/services.php` configuration file contains the following options:

```php
'postmark' => [
    'token' => 'your-postmark-token',
],
```

#### Amazon SES

Create an account with Amazon AWS.

- Set `MAIL_DRIVER` to `ses`
- Set `SES_KEY`
- Set `SES_SECRET`
- Set `SES_REGION` (if not using the default of `us-east-1`)

#### sendmail

- Set `MAIL_DRIVER` to `sendmail`

### Additional variables

If you are using ImageMagick, then:

- Set `IMAGE_DRIVER` to `imagick`

If you want to enable ActivityPub federation:

- Set `ACTIVITY_PUB` to `true`
- Set `AP_REMOTE_FOLLOW` to `true`

If you want to enable OAuth support for external clients:

- Set `OAUTH_ENABLED` to `true`

## Setting up services

### One-time setup tasks

One time only, you need to generate the secret `APP_KEY`:

```bash
php artisan key:generate
```

One time only, the `storage/` directory must be linked to the application:

```bash
php artisan storage:link
```

Database migrations must be run:

```bash
php artisan migrate --force
```

If you want to enable support for location data:
```bash
php artisan import:cities
```

If you enabled ActivityPub federation:
```bash
php artisan instance:actor
```

If you enabled OAuth:
```bash
php artisan passport:keys
```

Routes should be cached whenever the source code changes or whenever you change routes:

```bash
php artisan route:cache
php artisan view:cache
```

Every time you edit your .env file, you must run this command to have the changes take effect:

```bash
php artisan config:cache
```

::: tip
**Running Pixelfed without a cache**

It is possible to not use a cache by not running the above cache commands, but it is recommended to run these for production deployments. If you choose not to run these commands, then you can freely edit the .env file and source code instead, and your changes will be reflected instantly, but performance may take a slight hit. You can also undo these commands by running `:clear` commands:

```bash
php artisan route:clear
php artisan view:clear
php artisan config:clear
```
:::

### Job queueing

Pixelfed supports both [Laravel Horizon](https://laravel.com/docs/6.x/horizon) and [Queue Workers](https://laravel.com/docs/6.x/queues) to power the job queue. The main difference between Horizon and Queue Worker is the dashboard provided by Horizon as well as advanced load balancing. We recommend using Horizon. Horizon provides a beautiful dashboard which allows you to easily monitor key metrics of your queue system such as job throughput, runtime, and job failures.

#### Using Laravel Horizon

If you want admins to be able to access the Horizon web dashboard, you will need to run the following commands:

```bash
php artisan horizon:install
php artisan horizon:publish
```

If your user has the correct permissions to access Redis and the Pixelfed installation folder, then you can simply run `php artisan horizon` as that user in a terminal. This may be fine, but if you close the terminal then Horizon will also be terminated. Running directly is recommended only in deployments where a terminal can run uninterrupted, e.g. in a VM or using a utility such as GNU Screen or tmux.

If you are running in production, it is more ideal to create a background service for running Pixelfed's task queue. You will need to use a task manager like systemd or Supervisor. For more information, refer to the [Laravel Documentation](https://laravel.com/docs/6.x/horizon#deploying-horizon).

Most distributions will already come with systemd, so you may set up this unit file at `/etc/systemd/system/pixelfed.service`:

```ini
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php-fpm
Requires=redis
Requires=nginx

[Service]
Type=simple
ExecStart=/usr/bin/php /usr/share/webapps/pixelfed/artisan horizon
User=http
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

::: tip
**Using correct paths and service names**

The example above assumes you are using MariaDB and Nginx, that your distribution's PHP packages do not have versioned names, and that your distribution uses the `http` user to serve Nginx. It also assumes that you have installed Pixelfed in /usr/share/webapps/pixelfed in accordance with the rest of the installation process documentation. Some changes you may need to make include:

- Replacing `mariadb` with `postgresql` or `mysql`
- Replacing `php-fpm` with your distro's PHP-FPM package name, e.g. `php8.1-fpm`
- Replacing `nginx` with `apache`, or replacing `Requires` with `Wants` if you are not running in a production environment
- Replacing `/usr/bin/php` or `/usr/share/webapps/pixelfed/artisan` with the correct paths, e.g. `/usr/bin/php8.1` or `/path/to/pixelfed/artisan`
- Replacing `User=http` to reflect the app user, e.g. `User=pixelfed` or commenting this line in order to run in the system slice.
:::

You can now use systemd to manage Pixelfed like any other background service:

```bash
sudo systemctl enable --now pixelfed
```

Alternatively, if you do not wish to use systemd, then you can install Supervisor and create this sample Supervisor configuration file at `/etc/supervisor/conf.d/pixelfed.conf`, making sure to use the correct path to your Pixelfed installation and the appropriate app-user:

```ini
[program:pixelfed]
command=/usr/bin/php /usr/share/webapps/pixelfed/artisan horizon
user=http
autorestart=true
redirect_stderr=true
stdout_logfile=/usr/share/webapps/pixelfed/horizon.log
stopwaitsecs=3600
```
::: tip
**Using correct paths**

You may need to replace `/usr/bin/php` or `/usr/share/webapps/pixelfed/artisan` with the correct paths, e.g. `/usr/bin/php8.1` or `/path/to/pixelfed/artisan`
:::

You will then need to run these commands:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pixelfed
```

#### Using Queue Worker
Pixelfed also includes a queue worker that will process new jobs as they are pushed onto the queue. You may run the worker using the `queue:work` command. Note that once the command has started, it will continue to run until it is manually stopped or you close your terminal:

```bash
php artisan queue:work
```

Again, you can use Supervisor or systemd as described above, substituting `horizon` for `queue:work`.

### Scheduling periodic tasks

The task scheduler is used to run periodic commands in the background, such as media optimization, garbage collection, and other time-based tasks that should be run every once in a while.

To set up scheduled tasks using Cron:

```bash
EDITOR=nano crontab -e
```

Paste the following cronjob into your crontab:

```
* * * * * /usr/bin/php /usr/share/webapps/pixelfed/artisan schedule:run >> /dev/null 2>&1
```

::: tip
**Using correct paths**

You may need to replace `/usr/bin/php` or `/usr/share/webapps/pixelfed/artisan` with the correct paths, e.g. `/usr/bin/php7.3` or `/path/to/pixelfed/artisan`
:::

### Handling web requests

To translate HTTPS web requests to PHP workers, you will need to configure a reverse proxy.

#### Apache
Pixelfed includes a `public/.htaccess` file that is used to provide URLs without the index.php front controller in the path. Before serving Pixelfed with Apache, be sure to enable the `mod_rewrite` module in your Apache configuration so the `.htaccess` file will be honored by the server.

If the `.htaccess` file that ships with Pixelfed does not work with your Apache installation, try this alternative:

```php
Options +FollowSymLinks -Indexes
RewriteEngine On

RewriteCond %{HTTP:Authorization} .
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

#### Nginx

Pixelfed includes a sample NGINX configuration at `contrib/nginx.conf`. You can copy the contents of this file or include it within your `nginx.conf`. Take note of the comments, and make sure to set the correct domain name and root path.

```nginx{4,5,7,8,34,37,46}
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixelfed.example;                    # change this to your fqdn
    root /usr/share/webapps/pixelfed/public;         # path to repo/public

    ssl_certificate /etc/nginx/ssl/server.crt;       # generate your own
    ssl_certificate_key /etc/nginx/ssl/server.key;   # or use letsencrypt

    ssl_protocols TLSv1.2;
    ssl_ciphers EECDH+AESGCM:EECDH+CHACHA20:EECDH+AES;
    ssl_prefer_server_ciphers on;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;
    client_max_body_size 15M;   # or your desired limit

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php-fpm/php-fpm.sock; # make sure this is correct
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; # or $request_filename
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

server {                                             # Redirect http to https
    server_name pixelfed.example;                    # change this to your fqdn
    listen 80;
    listen [::]:80;
    return 301 https://$host$request_uri;
}
```

::: tip
**FastCGI path**

Make sure to use the correct `fastcgi_pass` socket path for your distribution and version of PHP-FPM. For example, on Arch, this is `/run/php-fpm/php-fpm.sock`, but on Ubuntu it may be `/run/php/php8.1-fpm.sock`, on Debian it may be `/var/run/php/php8.1-fpm.sock`, and so on. If you have configured a PHP server over TCP, you may also pass to its IP and port, e.g. `localhost:9000` by default.
:::

::: warning
**Nginx web root**

Make sure to use the `/public` folder as your server root. For example:

```nginx
server {
    root /var/www/pixelfed/public;
````

If you set root to the install directory (example: `root /var/www/pixelfed;`) Pixelfed will not work.
:::

::: tip
**Nginx client max body size**

Make sure to set an appropriate `client_max_body_size` setting in the `nginx.conf` file. Set this slightly greater than your desired post size limit for file uploads. The `nginx.conf` file location will vary based on your server. `/etc/nginx/nginx.conf`

Example:`http {client_max_body_size 9m;}`
:::

#### Obtaining an HTTPS certificate

For testing deployments, you may generate a self-signed SSL certificate. For example:

```bash
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```

For production deployments, you will need to obtain a certificate from a certificate authority. You may automate certification from LetsEncrypt, a free certificate authority, by using a utility such as [EFF Certbot](https://certbot.eff.org/) or [acme.sh](https://acme.sh).

Sample usage of certbot:

```bash
certbot --nginx -d pixelfed.example
```
