# Deploying Pixelfed on Arch Linux

## Assumptions
These instructions will install Pixelfed with the following:
- Nginx (instead of Apache)
- MariaDB (instead of PostgreSQL)
- PHP-FPM (latest version)
- ImageMagick (instead of GD)
- Redis and PHP-FPM running via sockets instead of TCP (same machine)
- `pixelfed` user for running Horizon queues, `http` user for running web processes (Arch default)
- Repo cloned at `/home/pixelfed`
- No other sites/services running on this machine

## Preparing a machine

You will need a machine running Arch Linux with access to the root account.

1. Login as `root`.
2. Create the `pixelfed` user and group:
```bash
useradd -rU -s /bin/bash pixelfed
```
3. Install dependencies:
```bash
pacman -S --needed nginx mariadb redis git php-fpm php-intl php-imagick composer jpegoptim optipng pngquant imagemagick unzip
```
4. Setup database. During `mysql_secure_installation`, hit Enter to use the default options. Make sure to set a password for the SQL user `root` (as by default, there is no password).
```bash
mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl enable --now mariadb
mysql_secure_installation
```
```sql
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'strong_password';
flush privileges;
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
Edit `/etc/php/conf.d/imagick.ini` and uncomment:
```
extension=imagick
```
6. Edit `/etc/redis.conf` and edit the following lines:
```
port 6379                           # change this to "port 0" to disable network packets
unixsocket /run/redis/redis.sock    # 
unixsocketperm 770                  # give permission to "redis" user and group
```
7. Edit `/etc/nginx/nginx.conf`:
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

    include /home/pixelfed/nginx.conf;    # we will make this file later
}
```
Generate SSL cert:
```bash
mkdir /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```
8. Add users to groups:
```bash
usermod -aG pixelfed http  # give web user permission to serve pixelfed
usermod -aG redis pixelfed # give app user access to redis for queues
usermod -aG redis http     # allow web user to proxy php-fpm to redis
```
9. Enable services:
```bash
systemctl enable {nginx,redis,php-fpm}
systemctl start {redis,php-fpm} # nginx will fail if started now
```

## Pixelfed setup
1. Clone the repo:
```
cd /home
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed
```
2. Setup environment variables and nginx:
```bash
cd pixelfed
cp contrib/nginx.conf nginx.conf
# edit nginx.conf
## in particular, set the correct domain name
systemctl start nginx
cp .env.example .env
# edit .env
## in particular, set:
### REDIS_SCHEME = unix
### REDIS_PATH = /run/redis/redis.sock
### IMAGE_DRIVER = imagick
```
3. Set permissions:
```bash
echo 'umask 002' > .bash_profile
chown -R pixelfed:pixelfed .
find . -type d -exec chmod 775 {} \;
find . -type f -exec chmod 664 {} \;
chmod g+s .
```
4. Switch to the `pixelfed` user:
```bash
su - pixelfed
```
5. Deploy:
```bash
composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan horizon:terminate
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```
6. Start Horizon task queue:
```bash
php artisan horizon
```
