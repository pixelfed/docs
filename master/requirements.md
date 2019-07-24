# Requirements

::: tip WARNING
Before you install pixelfed, you will need to setup the required dependencies and a webserver.
:::

    
[[toc]]

## Dependencies

 - PHP >= 7.1.3 (7.2+ recommended for stable version)
 - MySQL >= 5.7, Mariadb >= 10.2.7, Postgres (sqlite is not supported yet)
 - [Redis](https://redis.io/topics/quickstart)
 - [Composer](https://getcomposer.org/doc/00-intro.md)
 - GD or ImageMagick
 - PHP Extensions:
   - BCMath 
   - Ctype 
   - Curl 
   - Internationalization 
   - JSON 
   - Mbstring 
   - OpenSSL 
   - PDO 
   - Tokenizer 
   - XML 
   - Zip
 - JpegOptim
 - Optipng
 - Pngquant 2

## Composer

Pixelfed uses the composer package manager, you can download it [here](https://getcomposer.org/download/)

## Database

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

## Webserver Configuration

::: warning
The web server must set the base directory to ```public/``` and not ```/``` or it will not function properly.
:::

### Apache
Pixelfed includes a ```public/.htaccess``` file that is used to provide URLs without the index.php front controller in the path. Before serving Pixelfed with Apache, be sure to enable the ```mod_rewrite``` module so the ```.htaccess``` file will be honored by the server.

If the ```.htaccess``` file that ships with Pixelfed does not work with your Apache installation, try this alternative:
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
    server_name .pixelfed.dev;
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
