# Deploying Pixelfed on Arch Linux

## Assumptions
These instructions will install Pixelfed with the following:
- Nginx (instead of Apache)
- MariaDB (instead of PostgreSQL)
- PHP-FPM (latest version)
- `pixelfed` user
- Repo cloned at `/home/pixelfed`
- No other sites/services running on this machine

## Preparing a machine

You will need a machine running Arch Linux with access to the root account.

1. Login as `root`.
2. Create the `pixelfed` user:
```bash
useradd -r -G http -s /usr/bin/nologin pixelfed
```
3. Install dependencies:
```bash
pacman -S --needed nginx mariadb redis git php-fpm php-intl composer jpegoptim optipng pngquant imagemagick unzip
```
4. Setup database. During `mysql_secure_installation`, hit Enter to use the default options. Make sure to set a password for the SQL user `root` (as by default, there is no password).
```bash
mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl {start, enable} mariadb
mysql_secure_installation
```
5. Edit `/etc/php/php.ini` and uncomment the following lines:
```
extension=bcmath
extension=iconv
extension=intl
extension=mysqli
extension=pdo_mysql
```
Edit the following lines to your desired upload limits:
```
post_max_size = 8M
upload_max_filesize = 2M
max_file_uploads = 20
```
6. Edit `/etc/nginx/nginx.conf`:
```nginx
worker_processes 1;    # change to auto, or 1 x your CPU cores, but 1 is enough
events {
    worker_connections 1024;    # 512-1024 is fine for a small site, but you may want to use up to 10k or more, if running in production with many users
}
http {
    # [...]
    gzip on;    # uncomment this line

    server {    # delete this entire block
        # [...]
    }

    include /home/pixelfed/nginx.conf    # we will make this file later
}
```
7. Start/enable services:
```bash
systemctl {start,enable} {nginx,redis,php-fpm}
```

## Pixelfed setup
1. Clone the repo and set correct permissions.
```
cd /home
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed
chown -R pixelfed:http pixelfed/
find pixelfed/ -type d -exec chmod 775 {} \;
find pixelfed/ -type f -exec chmod 664 {} \;
```
2. Setup environment variables and nginx:
```bash
cd pixelfed
cp contrib/nginx.conf nginx.conf
```
3. Switch to the `pixelfed` user:
```bash
su pixelfed
```
4. Deploy:
```bash
composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
php artisan storage:link
php artisan horizon:terminate
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```
5. Switch back to root and start/enable services