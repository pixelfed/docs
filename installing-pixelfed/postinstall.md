# Post-installation

[[toc]]

## Background task queue

::: danger Make sure you set up Horizon!
If Horizon is not running, you will notice that many things will fail, such as thumbnail generation, image optimization, avatar changes, and so on.
:::

Pixelfed uses Laravel Horizon for running tasks.

If your user has the correct permissions to access Redis and the Pixelfed installation folder, then you can simply run `php artisan horizon` as that user in a terminal. This may be fine, but if you close the terminal then Horizon will also be terminated. Running directly is recommended only in deployments where a terminal can run uninterrupted, e.g. in a VM or using a utility such as GNU Screen or tmux.

If you are running in production, it is more ideal to create a background service for running Pixelfed's task queue.

### Using systemd

An example systemd unit file is as such:

```bash{4,5,7,11,12}
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php-fpm
Requires=redis
Requires=nginx

[Service]
Type=simple
ExecStart=/usr/bin/php /home/pixelfed/artisan horizon
User=http
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

::: tip Using correct paths and service names
The example above assumes you are using MariaDB and Nginx, that your distribution's PHP packages do not have versioned names, and that your distribution uses the `http` user to serve Nginx. It also assumes that you have installed Pixelfed in /home/pixelfed in accordance with the rest of the installation process documentation. Some changes you may need to make include:

- Replacing `mariadb` with `postgresql` or `mysql`
- Replacing `php-fpm` with your distro's PHP-FPM package name, e.g. `php7.3-fpm`
- Replacing `nginx` with `apache`, or replacing `Requires` with `Wants` if you are not running in a production environment
- Replacing `/usr/bin/php` or `/home/pixelfed/artisan` with the correct paths, e.g. `/usr/bin/php7.3` or `/path/to/pixelfed/artisan`
- Replacing `User=http` to reflect the app user, e.g. `User=pixelfed` or commenting this line in order to run in the system slice.
:::

If you create or copy this file to `/etc/systemd/system/pixelfed.service`, then you can use systemd to manage Pixelfed like any other background service:

```bash
$ sudo systemctl {start,enable} pixelfed
```

### Using Supervisor

It is also possible to use Supervisor to manage Horizon queues, but this method is currently not officially supported by Pixelfed. [Laravel Docs: Supervisor Configuation](https://laravel.com/docs/5.8/queues#supervisor-configuration)

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

::: tip FastCGI path
Make sure to use the correct `fastcgi_pass` socket path for your distribution and version of PHP-FPM. For example, on Arch, this is `/run/php-fpm/php-fpm.sock`, but on Ubuntu it may be `/run/php/php7.3-fpm.sock`, on Debian it may be `/var/run/php/php7.3-fpm.sock`, and so on. If you have configured a PHP server over TCP, you may also pass to its IP and port, e.g. `localhost:9000` by default.
:::

::: tip Nginx web root
Make sure to use the `/public` folder as your server root. Example:`server {root /var/www/pixelfed/public;)`.
If you set root to the install directory (example: `server {root /var/www/pixelfed;)` Pixelfed will not work.
:::

### HTTPS Certificate

For local development, you may generate a self-signed SSL certificate. For example:

```bash
$ sudo mkdir /etc/nginx/ssl
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```

For production deployments, you will need to obtain a certificate from a certificate authority. You may automate certification from LetsEncrypt, a free certificate authority, by using a utility such as [EFF Certbot](https://certbot.eff.org/) or [acme.sh](https://acme.sh).
