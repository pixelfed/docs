---
title = "Preparing your machine"
summary = "Download, install, and configure some pre-requisites."
weight = 10
[menu]
[menu.docs]
identifier = "admin/prerequisites"
parent = "admin"
---

# Prerequisites

Before you install Pixelfed, you will need to setup a webserver with the required dependencies:

- A PHP-FPM server
- An SQL database server
- An HTTPS server
- [Composer](https://getcomposer.org/), for PHP dependency management
- [Git](https://git-scm.com/), for fetching updates
- [Redis](https://redis.io/), for in-memory caching and background task queueing
- [GD](https://libgd.github.io/), for image processing
- [JPEGOptim](https://github.com/tjko/jpegoptim), for optimizing JPG
- [OptiPNG](http://optipng.sourceforge.net/), for lossless PNG
- [PNGQuant](https://pngquant.org/), for lossy PNG
- [ffmpeg](https://ffmpeg.org/), for generating video thumbnails

::: warning
**Shared Hosting**

At this stage, it's not possible to install Pixelfed by downloading a ZIP file and uploading the files to your web server. This is because Composer needs to run on the command line.

This doesn't necessarily mean you need a VPS. Some shared hosts give you SSH access, through which you should be able to install Composer and Pixelfed just fine.
:::

## PHP-FPM

You can check your currently installed version of PHP-FPM by running `php-fpm -v`. Make sure you are running **PHP >= 8.1**.

You can check your currently loaded extensions by running `php-fpm -m`. Modules are usually enabled by editing your PHP configuration file and uncommenting the appropriate lines under the "Dynamic extensions" section. Make sure the following extensions are installed and loaded:

- `bcmath`
- `ctype`
- `curl`
- `exif`
- `gd`
- `iconv`
- `intl`
- `json`
- `mbstring`
- `openssl`
- `redis`
- `tokenizer`
- `xml`
- `zip`

Additionally, you will need to enable extensions for database drivers:
- For MySQL or MariaDB: enable `pdo_mysql` and `mysqli`
- For PostgreSQL: enable `pdo_pgsql` and `pgsql`

Finally, make sure to set the desired upload limits for your PHP processes. You will want to check the following:
- `post_max_size` (default 8M, set this around or slightly greater than your desired post size limit)
- `file_uploads` (default On, which it needs to be)
- `upload_max_filesize` (default 2M, set this <= `post_max_size`)
- `max_file_uploads` (default 20, but make sure it is >= your desired attachment limit)
- `max_execution_time` (default 30, consider raising this to 600 or more so that longer tasks aren't interrupted)

::: tip
**Instagram imports**

Instagram imports are also affected by these settings. If you enable imports, you will want to raise `post_max_size` to the maximum size you expect an Instagram archive to be, `upload_max_filesize` to the maximum size you expect individual Instagram photos to be, and `max_file_uploads` to the maximum number of photos (not posts) you'd expect an Instagram archive to contain.
:::

## Database

You can choose one of three [supported database drivers for Laravel 9](https://laravel.com/docs/9.x/database#introduction), the framework used by Pixelfed:
- MySQL (5.7+)
- MariaDB (10.3+)
- PostgreSQL (10+)

You will need to create a database and grant permission to an SQL user identified by a password. To do this with MySQL or MariaDB, do the following:

```sh
sudo mysql -u root -p
```

You can then create a database and grant privileges to your SQL user. The following SQL commands will create a database named `pixelfed` and allow it to be managed by a user `pixelfed` with password `strong_password`:

```sql
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'strong_password';
flush privileges;
```

To do this with PostgreSQL instead, do the following:

```sh
sudo -u postgres psql
```

Once in the psql shell, do the following:

```sql
CREATE USER pixelfed CREATEDB;
\q
```

::: warning
**Changing database drivers**

If you decide to change database drivers later, please run a backup first! You can do this with `php artisan backup:run --only-db`
:::

## HTTP Web server

The following web servers are officially supported:
- Apache (with `mod_rewrite` enabled)
- nginx

Pixelfed uses HTTPS URIs, so you will need to have HTTPS set up at the perimeter of your network before you proxy requests internally.

## Creating a dedicated app-user and using UNIX sockets (optional)

For added security, you may want to create a dedicated user specifically for running Pixelfed. To do this:

```sh
useradd -rU -s /bin/bash pixelfed
```

### Configuring PHP-FPM pool and socket

```sh
cd /etc/php/php-fpm.d/
cp www.conf pixelfed.conf
$EDITOR pixelfed.conf
```

::: tip
**Where to define custom PHP-FPM pools**

The exact directory you should `cd` to will vary according to your distribution:
- Arch Linux uses `/etc/php/php-fpm.d`
- Debian and Ubuntu use `/etc/php/8.1/fpm/pool.d/` (dependent on PHP version)
- For other distributions, check your php-fpm.conf to see where exactly you can define `*.conf` with `include=`
:::


Make the following changes to the PHP-FPM pool:

```ini
; use the username of the app-user as the pool name, e.g. pixelfed
[pixelfed]
user = pixelfed
group = pixelfed
; to use a tcp socket, e.g. if running php-fpm on a different machine than your app:
;    (note that the port 9001 is used, since php-fpm defaults to running on port 9000;)
;    (however, the port can be whatever you want)
; listen = 127.0.0.1:9001;
;    but it's better to use a socket if you're running locally on the same machine:
listen = /run/php-fpm/pixelfed.sock
listen.owner = http
listen.group = http
listen.mode = 0660
; [...]
```

### Configuring Redis socket

Edit `redis.conf` and edit the following lines:

```
port 6379                           # change this to "port 0" to disable network packets
unixsocket /run/redis/redis.sock    # 
unixsocketperm 770                  # give permission to "redis" user and group
```

::: tip
**Where to find redis.conf**

The exact location will vary according to your distribution:
- Arch Linux uses `/etc/redis.conf`
- Debian and Ubuntu use `/etc/redis/redis.conf`
- For other distributions, check your documentation
:::
