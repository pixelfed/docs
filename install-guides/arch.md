# Izvršiti Pixelfed na Arch Linux

## Pretpostavke
Ove instruktcije će instalirati Pixelfed sa sljedećim:
- Nginx (umjesto Apache)
- MariaDB (umjesto PostgreSQL)
- PHP-FPM (Najnovija verzija)
- ImageMagick (umjesto GD)
- Redis i PHP-FPM korištenje sockets umjesto TCP (ista mašina)
- `pixelfed` koristnik za korištenja Horizon redova, `http` koristnik za korištenje web procesa (Arch default)
- Repo kloniran u `/srv/http/pixelfed`
- Nijedna druga lokacija / usluga ne rade na ovoj mašini

## Priprema mašine

Trebat će vam mašina koja koristi Arch Linux s pristupom root računu.

1. Prijavi se kao `root`.
2. Napravi `pixelfed` korisnik i grupu:
```bash
useradd -rU -s /bin/bash pixelfed
```
3. Instaliraj zavisnosti:
```bash
pacman -S --needed nginx mariadb redis git php-fpm php-intl php-imagick php-redis composer jpegoptim optipng pngquant imagemagick unzip certbot certbot-nginx
```
4. Postavljanje bazu podataka. Tokom `mysql_secure_installation`, stisni Enter da koristite zadane opcije. obavezno postavite lozinku za SQL korisnika `root` (kao po defaultu, nema lozinke).
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
5. Uredi `/etc/php/php.ini` i nekomentiraj sljedeće redove:
```
extension=bcmath
extension=iconv
extension=intl
extension=mysqli
extension=pdo_mysql
```
Uredite sljedeće redove prema vašim željenim ograničenjima prijenosa:
```
post_max_size = 8M
upload_max_filesize = 2M
max_file_uploads = 20
```
Uredi `/etc/php/conf.d/imagick.ini` i nekomentiraj:
```
extension=imagick
```
Uredi `/etc/php/conf.d/redis.ini` i nekomentiraj:
```
extension=redis
```
Uredi `/etc/php/conf.d/igbinary.ini` i nekomentiraj:
```
extension=igbinary
```
Napravi jedan PHP-FPM pool za Pixelfed:
```bash
cd /etc/php/php-fpm.d/
cp www.conf pixelfed.conf
$EDITOR pixelfed.conf
```
Napravi sljedeće promjene u PHP-FPM pool:
```
;     use the username of the app-user as the pool name, e.g. pixelfed
[pixelfed]
user = pixelfed
group = pixelfed
;    to use a tcp socket, e.g. if running php-fpm on a different machine than your app:
;    (note that the port 9001 is used, since php-fpm defaults to running on port 9000;)
;    (however, the port can be whatever you want)
; listen = 127.0.0.1:9001;
;    but it's better to use a socket if you're running locally on the same machine:
listen = /run/php-fpm/pixelfed.sock
listen.owner = http
listen.group = http
listen.mode = 0660
[...]
```
6. Uredi `/etc/redis.conf` i uredite sljedeće redove:
```
port 6379                           # change this to "port 0" to disable network packets
unixsocket /run/redis/redis.sock    # 
unixsocketperm 770                  # give permission to "redis" user and group
```
7. Uredi `/etc/nginx/nginx.conf`:
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

    include /usr/share/webapps/pixelfed/nginx.conf;    # we will make this file later
}
```
Generiraj SSL cert:
```bash
mkdir /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```
8. Dodaj Koristnike u grupu:
```bash
usermod -aG pixelfed http  # give web user permission to serve pixelfed
usermod -aG redis pixelfed # give app user access to redis for queues
usermod -aG redis http     # allow web user to proxy php-fpm to redis
```
9. Omogućite usluge:
```bash
systemctl enable {nginx,redis,php-fpm}
systemctl start {redis,php-fpm} # nginx will fail if started now
```

## Pixelfed Postavljanje:
1. Kloniraj repo:
```
cd /srv/http
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed
```
2. Postavi environment varijable i nginx:
```bash
cd pixelfed
cp contrib/nginx.conf nginx.conf
# edit nginx.conf
## in particular, set:
### - the correct domain name
### - fastcgi_pass correct path (e.g. unix:/run/php-fpm/pixelfed.sock;)

systemctl start nginx
cp .env.example .env
# edit .env
## in particular, set:
### REDIS_SCHEME = unix
### REDIS_PATH = /run/redis/redis.sock
### IMAGE_DRIVER = imagick
```
3. Postavite dozvole:
```bash
chown -R pixelfed:pixelfed .
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
```
4. Prebaci na `pixelfed` koristnik:
```bash
su - pixelfed
```
5. Izvrši:
```bash
composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan horizon:terminate
php artisan horizon:install
php artisan horizon:assets
php artisan migrate --force
```
Eventualno, koristi keš [NAPOMENA: Ako pokrenete ove komande, moraćete ih pokrenuti svaki put kad promijenite .env ili Ažurirate Pixelfed]:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
Uvezi Places podatke:
```bash
php artisan import:cities
```
6. Napravi novu datoteku na `/etc/systemd/system/pixelfed.conf`:
```
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php-fpm
Requires=redis
Requires=nginx

[Service]
Type=simple
ExecStart=/usr/bin/php /srv/http/pixelfed/artisan horizon
User=pixelfed
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
7. Pokreni Horizon zadatak:
```bash
sudo systemctl enable --now pixelfed
```
