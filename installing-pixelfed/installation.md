# Pixelfed installation process

[[toc]]

## Pre-requisites

Before you install Pixelfed, you will need to setup a webserver with the required dependencies.

### HTTP Web server
The following web servers are officially supported:
- Apache
- nginx

### Database

You can choose one of three supported database drivers:
- MySQL (5.7+)
- MariaDB (10.2.7+ -- 10.3.5+ recommended)
- PostgreSQL (10+)

::: warning A note on using PostgreSQL:
PostgreSQL support is not primary -- there may be Postgre-specific bugs within Pixelfed. If you encounter any issues while running Postgre as a database, please file those issues on our [Github tracker](https://github.com/pixelfed/pixelfed/issues).
:::

You will need to create a database and grant permission to an SQL user identified by a password. To do this with MySQL or MariaDB, do the following:

```bash
$ sudo mysql -u root -p
```

You can then create a database and grant privileges to your SQL user. The following SQL commands will create a database named `pixelfed` and allow it to be managed by a user `pixelfed` with password `strong_password`:

```sql{1,2}
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'strong_password';
flush privileges;
```

::: tip Changing database drivers:
If you decide to change database drivers later, please run a backup first! You can do this with `php artisan backup:run --only-db`
:::

### PHP

You can check your currently installed version of PHP by running `php -v`. Make sure you are running **PHP >= 7.3**.

You can check your currently loaded extensions by running `php -m`. Modules are usually enabled by editing `/etc/php/php.ini` and uncommenting the appropriate line under the "Dynamic extensions" section. Make sure the following extensions are loaded (extensions generally not loaded by default will be marked with an asterisk):
- `bcmath` *
- `ctype`
- `curl`
- `iconv` *
- `intl` *
- `json`
- `mbstring`
- `openssl`
- `tokenizer`
- `xml`

Additionally, you will need to enable extensions for database drivers.
- For MySQL or MariaDB: enable `pdo_mysql` and `mysqli`
- For PostgreSQL: enable `pdo_pgsql` and `pgsql`

::: danger A note about php-redis vs. predis:
Make sure you do NOT have the `redis` PHP extension installed/enabled! Pixelfed uses the [predis](https://github.com/nrk/predis) library internally, so the presence of any Redis extensions can cause issues.
:::

Finally, make sure to set the desired upload limits for your PHP processes. You will want to check the following:
- `post_max_size` (default 8M, set this around or slightly greater than your desired post size limit)
- `file_uploads` (default On, which it needs to be)
- `upload_max_filesize` (default 2M, set this <= `post_max_size`)
- `max_file_uploads` (default 20, but make sure it is >= your desired attachment limit)
- `max_execution_time` (default 30, consider raising this to 600 or more so that longer tasks aren't interrupted)

### External programs
- [Composer](https://getcomposer.org/) (PHP dependency manager)
- Git (for fetching updates)
- Redis (in-memory caching)
- GD or ImageMagick (image processing)
- [JPEGOptim](https://github.com/tjko/jpegoptim)
- [OptiPNG](http://optipng.sourceforge.net/)
- [PNGQuant](https://pngquant.org/)

<!----------------------------------------------------------------------------->

## Installation

::: warning WARNING
Pixelfed is still a work in progress. We do not recommending running an instance in production unless you know what you are doing!
:::

Make sure you have all prerequisites installed and the appropriate services running/enabled.

### Download source via Git

Pixelfed Beta currently uses the `dev` branch for deployable code. When v1.0 is released, the stable branch will be changed to `master`, with `dev` branch being used for development and testing.

```bash{1}
$ cd /home # or wherever you choose to install web applications
$ git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # checkout dev branch into "pixelfed" folder
```

### Set correct permissions

Your web server and PHP processes need to be able to write to the `pixelfed` directory. Make sure to set the appropriate permissions. For example, if you are running your processes through the `http` user/group, then run the following:

```bash{1}
$ sudo chown -R http:http pixelfed/ # change user/group of pixelfed/ to http user and http group
$ sudo find pixelfed/ -type d -exec chmod 775 {} \; # set all directories to rwx by user/group
$ sudo find pixelfed/ -type f -exec chmod 664 {} \; # set all files to rw by user/group
```

::: danger WARNING
Make sure to use the correct user/group name for your system. This user may be `http`, `www-data`, or `pixelfed` (if using a dedicated user). The group will likely be `http` or `www-data`.
:::

### Initialize PHP dependencies

Run `composer install` to fetch the dependencies needed by Pixelfed. Pixelfed recommends running with the following flags:

```bash
$ composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
```

### Configure Pixelfed

By default Pixelfed comes with a `.env.example` file for production deployments, and a `.env.testing` file for debug deployments. You'll need to rename or copy one of these files to `.env` regardless of which environment you're working on.

```bash
$ cp .env.example .env # for production deployments
$ cp .env.testing .env # for debug deployments
```

You can now edit `.env` and change values for your setup.

::: tip
You can find a list of additional configuration settings on the [Configuration](configuration.md) page, but the important variables will be listed in the below subsections.
:::

#### App variables

- Set `APP_NAME` to your desired title. This will be shown in the header bar and other places.
- Ensure that `APP_DEBUG` is false for production environments, or true for debug environments.
- Set your `APP_URL` to the URL that you wish to serve Pixelfed through.
- Set `APP_DOMAIN` and `ADMIN_DOMAIN` to the domain name you will be using for Pixelfed.

#### Database variables

- Set `DB_CONNECTION` to `mysql` if you are using MySQL or MariaDB, or `pgsql` if you are using PostgreSQL.
- Set `DB_HOST` to the IP of the machine
- Set `DB_PORT` to the port on which your database server is exposed
- Set `DB_DATABASE` to the name of the database created for Pixelfed
- Set `DB_USERNAME` to the user that was granted privileges for that database
- Set `DB_PASSWORD` to the password that identifies the user with privileges to the database

#### Redis variables

If you are running Redis on the same machine as Pixelfed, then the default settings will work. If you are running Redis on another machine:

- Set `REDIS_HOST` to the IP of the machine your Redis server is running on
- Set `REDIS_PORT` to the port on which Redis is exposed
- Set `REDIS_PASSWORD` to the password of that Redis server

#### Email variables

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

#### Additional variables

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
#### Generate an application secret key

If you copied `.env.testing` to set up a development environment, the secret is pre-generated for you. If you copied `.env.example` to set up a production environment, then you need to generate the secret `APP_KEY`:

```bash
$ php artisan key:generate
```

### Configure your HTTP reverse proxy

To translate HTTP web requests to PHP workers, you will need to configure a reverse proxy.

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

For local development, you may generate a self-signed SSL certificate with the following command:

```bash
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```



### Final steps

Every time you edit your .env file, you must run this command to have the changes take effect:

```bash
php artisan config:cache
```



```bash
php artisan route:cache
php artisan migrate --force
php artisan horizon:purge
php artisan storage:link
```

## Post-installation

After you have installed Pixelfed, you may update to the latest commits by pulling the dev branch.

```bash
$ cd /home/pixelfed  # or wherever you installed pixelfed
$ git pull origin dev
```