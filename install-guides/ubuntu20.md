# Deploying Pixelfed on Ubuntu 20.04.4 LTS (Focal Fossa)
Guide by @shlee@aus.social - Version 0.1

## NOTES
* PHP 7.4

## TODO
* Update redis and mariadb to use unixsockets over tcp. (Investigate if this is worth it)

## Part 0 - Setup the VM and update the DNS for A and AAAA records
![image](https://user-images.githubusercontent.com/17537000/168226273-9b89cc51-11ca-4ace-9137-99f2401b3b28.png)
![image](https://user-images.githubusercontent.com/17537000/168226310-e5c4f24a-f93c-4234-8e23-e2ce865ca988.png)

## Part 1 - Upgrade Ubuntu 20.04 LTS
```
apt update
apt upgrade -y
reboot now
```

## Part 2 - Redis - Install
```
apt -y install redis-server
systemctl enable redis-server
```

## Part 3 - MariaDB - Install
```
apt -y install mariadb-server
systemctl enable mariadb
mysql_secure_installation
mysql -u root -p
```

Run the SQL query to create the pixelfed DB
```
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'secretpasswordhere';
flush privileges;
exit;
```

## Part 4 - Setup dependent packets
```
apt -y install ffmpeg 
apt -y install jpegoptim optipng pngquant gifsicle 
apt -y install unzip zip
```

## Part 5 - PHP - Install
```
apt -y install php7.4-fpm php7.4-cli
### Install additional PHP modules not installed by default
apt -y install php7.4-bcmath php7.4-curl php7.4-gd php7.4-intl php7.4-mbstring php7.4-redis php7.4-xml php7.4-zip php7.4-mysql
```

### PHP - Setup
```
nano /etc/php/7.4/fpm/php.ini
```
Edit these lines
```
    post_max_size (default 8M, set this around or slightly greater than your desired post size limit)
    file_uploads (default On, which it needs to be)
    upload_max_filesize (default 2M, set this <= post_max_size)
    max_file_uploads (default 20, but make sure it is >= your desired attachment limit)
    max_execution_time (default 30, consider raising this to 600 or more so that longer tasks arent interrupted)
```
### PHP-fpm - Setup
```
cd /etc/php/php-fpm.d/
```
edit these lines
```
    [pixelfed]
    user = pixelfed
    group = pixelfed
    listen = /run/php/php7.4-fpm-pixelfed.sock
```

## Part 6 - Install Composer
```
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```


## Part 7 - Prepare Pixelfed (AS PIXELFED USER)
```
adduser pixelfed
su - pixelfed
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed

cd pixelfed
composer install --no-ansi --no-interaction --optimize-autoloader
cp .env.example .env
```

### Complete .env
```
nano .env
```
edit these lines
```
    APP_NAME="Pixelfed Australia"
    APP_DEBUG=false

    APP_URL="https://pixelfed.au"
    APP_DOMAIN="pixelfed.au"
    ADMIN_DOMAIN="pixelfed.au"
    SESSION_DOMAIN="pixelfed.au"
```

### PHP Artisan tasks
```
#One time only, you need to generate the secret APP_KEY:
php artisan key:generate

#One time only, the storage/ directory must be linked to the application:
php artisan storage:link

#Database migrations must be run:
php artisan migrate --force

#If you want to enable support for location data:
php artisan import:cities

#If you enabled ActivityPub federation:
php artisan instance:actor

#If you enabled OAuth:
php artisan passport:keys

#Routes should be cached whenever the source code changes or whenever you change routes:
php artisan route:cache
php artisan view:cache

#Every time you edit your .env file, you must run this command to have the changes take effect:
php artisan config:cache

### Laravel Horizon - Job queueing
php artisan horizon:install
php artisan horizon:publish
```

## Part 8 - Prepare Pixelfed (AS ROOT)
```
tee /etc/systemd/system/pixelfedhorizon.service <<EOF
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php7.4-fpm
Requires=redis
Requires=nginx

[Service]
Type=simple
ExecStart=/usr/bin/php artisan horizon --environment=production
ExecStop=/usr/bin/php artisan horizon:terminate --wait
User=pixelfed
WorkingDirectory=/home/pixelfed/pixelfed/
Restart=on-failure

KillSignal=SIGCONT
TimeoutStopSec=3600

[Install]
WantedBy=multi-user.target

EOF

systemctl daemon-reload
systemctl enable pixelfedhorizon
systemctl status pixelfedhorizon
```
### Crontab for schedule
```
crontab -e
```
add this line
```
* * * * * /usr/bin/php /home/pixelfed/pixelfed/artisan schedule:run >> /dev/null 2>&1
```

## Part 9 - Nginx and Certbot - Install
```
apt -y install nginx certbot python3-certbot-nginx
systemctl enable nginx
```

```
cp /home/pixelfed/pixelfed/contrib/nginx.conf /etc/nginx/sites-available/pixelfed.conf
ln -s /etc/nginx/sites-available/pixelfed.conf /etc/nginx/sites-enabled/
nano /etc/nginx/sites-available/pixelfed.conf
systemctl reload nginx
```

```
certbot --nginx -d pixelfed.au -d www.pixelfed.au


## Part 10 - Test your new Pixelfed
```
curl -I https://pixelfed.au

pixelfed@localhost:~/pixelfed$ curl -I https://pixelfed.au
HTTP/2 200
server: nginx/1.18.0 (Ubuntu)

```

Hot cache the instance actor 
```
curl https://pixelfed.au/i/actor
```


