# Generic installation process

[[toc]]

<!----------------------------------------------------------------------------->


::: warning WARNING
Pixelfed is still a work in progress. We do not recommending running an instance in production at this stage unless you know what you are doing!
:::

Make sure you have all prerequisites installed and the appropriate services running/enabled.

## Download source via Git

Pixelfed Beta currently uses the `dev` branch for deployable code. When v1.0 is released, the stable branch will be changed to `master`, with `dev` branch being used for development and testing.

```bash{1}
$ cd /home # or wherever you choose to install web applications
$ git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # checkout dev branch into "pixelfed" folder
```

## Set correct permissions

Your web server and PHP processes need to be able to write to the `pixelfed` directory. Make sure to set the appropriate permissions. For example, if you are running your processes through the `http` user/group, then run the following:

```bash{2}
$ cd pixelfed
$ sudo chown -R http:http . # change user/group to http user and http group
$ sudo find . -type d -exec chmod 775 {} \; # set all directories to rwx by user/group
$ sudo find . -type f -exec chmod 664 {} \; # set all files to rw by user/group
```

::: danger WARNING
Make sure to use the correct user/group name for your system. This user may be `http`, `www-data`, or `pixelfed` (if using a dedicated user). The group will likely be `http` or `www-data`.
:::

## Initialize PHP dependencies

Run `composer install` to fetch the dependencies needed by Pixelfed. It is recommended to run with the following flags:

```bash
$ composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
```

## Configure Pixelfed

By default Pixelfed comes with a `.env.example` file for production deployments, and a `.env.testing` file for debug deployments. You'll need to rename or copy one of these files to `.env` regardless of which environment you're working on.

```bash
$ cp .env.example .env # for production deployments
$ cp .env.testing .env # for debug deployments
```

You can now edit `.env` and change values for your setup.

::: tip
You can find a list of additional configuration settings on the [Configuration](configuration.md) page, but the important variables will be listed in the below subsections.
:::

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

If you are using a UNIX socket for Redis, then:

- Set `REDIS_SCHEME` to `unix`
- Set `REDIS_PATH` to the path of the socket, e.g. `/run/redis/redis.sock`

::: tip TCP server vs. UNIX socket
Redis usually comes pre-configured to listen for TCP requests on the local machine over port 6379. In your Redis configuration, typically at `/etc/redis.conf`, the relevant lines are `bind 127.0.0.1` and `port 6379`.

Changing the latter line to `port 0` will disable TCP listening, in which case Redis must be configured for socket access. Lines such as `unixsocket /run/redis/redis.sock` and `unixsocketperm 770` must be set to enable socket access. Additionally, the HTTP/PHP users should have permission to access the socket, e.g. by being added to the `redis` group.

Using a UNIX socket is optional, but may provide faster access since it does not have to create TCP packets. TCP is usually used over a network, and would be required if Redis were running on a different machine than your web server.
:::

### Email variables

- Set
```bash
MAIL_DRIVER=log
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="pixelfed@pixelfed.example"
MAIL_FROM_NAME="pixelfed.example mailer"
```

### Additional variables

```bash
OPEN_REGISTRATION=true
ENFORCE_EMAIL_VERIFICATION=true # can be "false" for testing

MAX_PHOTO_SIZE=15000
MAX_CAPTION_LENGTH=150
MAX_ALBUM_LENGTH=4

ACTIVITYPUB_INBOX=false
ACTIVITYPUB_SHAREDINBOX=false
HORIZON_DARKMODE=true

# Set these both "true" to enable federation.
# You might need to also run:
#   php artisan cache:clear
#   php artisan optimize:clear
#   php artisan optimize
ACTIVITY_PUB=false
REMOTE_FOLLOW=false
```
### Generate an application secret key

If you copied `.env.testing` to set up a development environment, the secret is pre-generated for you. If you copied `.env.example` to set up a production environment, then you need to generate the secret `APP_KEY`:

```bash
$ php artisan key:generate
```

## Artisan deployment hooks

Every time you edit your .env file, you must run this command to have the changes take effect:

```bash
php artisan config:cache
```

One time only, the `storage/` directory must be linked to the application:

```bash
php artisan storage:link
```

Database migrations must be run:

```bash
php artisan migrate --force
```

Routes should be cached whenever the source code changes:
```bash
php artisan route:cache
```

## Background task queue

::: danger Make sure Horizon is running!
If Horizon is not running, you will notice that many things will fail, such as thumbnail generation, image optimization, avatar changes, and so on.
:::

Pixelfed uses Laravel Horizon for running tasks. It is vital to 

## Post-installation

After you have installed Pixelfed, you may update to the latest commits by pulling the dev branch and doing necessary updates/migration/caching:

```bash
$ cd /home/pixelfed  # or wherever you installed pixelfed
$ git pull origin dev
$ composer install
$ php artisan route:cache
$ php artisan migrate --force
```

## Configure your HTTPS reverse proxy

To translate HTTPS web requests to PHP workers, you will need to configure a reverse proxy.

### Apache
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
### Nginx

Pixelfed includes a sample NGINX configuration at `contrib/nginx.conf`. You can copy the contents of this file or include it within your `nginx.conf`. Take note of the comments, and make sure to set the correct domain name and root path.

```nginx{4,5,7,8,33,36,45}
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixelfed.example;                    # change this to your fqdn
    root /home/pixelfed/public;                      # path to repo/public

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

::: tip FastCGI path:
Make sure to use the correct `fastcgi_pass` socket path for your distribution and version of PHP-FPM. For example, on Arch, this is `/run/php-fpm/php-fpm.sock`, but on Ubuntu it may be `/run/php/php7.3-fpm.sock`, on Debian it may be `/var/run/php/php7.3-fpm.sock`, and so on. If you have configured a PHP server over TCP, you may also pass to its IP and port, e.g. `localhost:9000` by default.
:::

### HTTPS Certificate

For local development, you may generate a self-signed SSL certificate. For example:

```bash
$ sudo mkdir /etc/nginx/ssl
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```

For production deployments, you will need to obtain a certificate from a certificate authority. You may automate certification from LetsEncrypt, a free certificate authority, by using a utility such as [EFF Certbot](https://certbot.eff.org/) or [acme.sh](https://acme.sh).