# Running a Pixelfed instance

::: tip Warning
The docs are still a work in progress.
:::

[[toc]]

<!---->

## Pre-requisites

Before you install pixelfed, you will need to setup a webserver with the required dependencies.

### HTTP Web server
The following web servers are supported:
- Apache
- nginx

### External programs

- Redis
- GD or ImageMagick
- [`jpegoptim`](https://github.com/tjko/jpegoptim)
- [`optipng`](http://optipng.sourceforge.net/)
- [`pngquant`](https://pngquant.org/)

### Database

You can choose one of three supported database drivers:
- MySQL (5.7+)
- MariaDB (10.2.7+)
- Postgres

::: tip
If you decide to change database drivers later, please run a backup first!

```bash
php artisan backup:run --only-db
```
:::

### PHP
Make sure you are running **PHP >= 7.1.3** (7.2+ recommended for stable version) with the following extensions:
- `bcmath`
- `ctype`
- `curl`
- `iconv`
- `intl`
- `json`
- `mbstring`
- `openssl`
- `pdo_*` driver for your database of choice -- either `pdo_mysql` for MySQL/MariaDB, or `pdo_pgqsl` for Postgres
- `tokenizer`
- `xml`

::: tip WARNING
Make sure you do NOT have the `redis` PHP extension installed/enabled! Pixelfed uses the [predis](https://github.com/nrk/predis) library internally, so the presence of any Redis extensions can cause issues.
:::

#### Composer

Pixelfed uses the [composer](https://getcomposer.org/) dependency manager for PHP.

<!---->

## Webserver Configuration

To translate web requests to PHP workers,

### Apache
Pixelfed includes a `public/.htaccess` file that is used to provide URLs without the index.php front controller in the path. Before serving Pixelfed with Apache, be sure to enable the `mod_rewrite` module so the `.htaccess` file will be honored by the server.

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

Example Nginx + PHP 7.2 server configuration

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixelfed.example;
    root /home/pixelfed/public;

    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

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
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
