# Deploying Pixelfed on Ubuntu 20.04.4 LTS (Focal Fossa)
Guide by @shlee@aus.social - Version 0.1

## NOTES
* This guide will be updated for Ubuntu 22.04 LTS (Jammy Jellyfish) once PHP 8.0 is confirmed as fully supported.

## TODO
* Update redis and mariadb to use unixsockets over tcp. (It's worth it)

## Part 0 - Setup the VM and update the DNS for A and AAAA records
![image](https://user-images.githubusercontent.com/17537000/168226273-9b89cc51-11ca-4ace-9137-99f2401b3b28.png)
![image](https://user-images.githubusercontent.com/17537000/168226310-e5c4f24a-f93c-4234-8e23-e2ce865ca988.png)

## Part 1 - Upgrade Ubuntu 20.04 LTS
* Install all updated default Ubuntu packages and reboot
```
apt update
```
```
apt upgrade -y
```
```
reboot now
```

## Part 2 - Redis - Install
* Install stock Redis, and enable the service to autostart.
```
apt -y install redis-server
```
```
systemctl enable redis-server
```

## Part 3 - MariaDB - Install
* Install stock MariaDB, and enable the service to autostart.
```
apt -y install mariadb-server
```
```
systemctl enable mariadb
```

## Part 3.1 - MariaDB - Setup
* Complete the secure installation steps
```
mysql_secure_installation
```
![image](https://user-images.githubusercontent.com/17537000/171800985-2d712c85-197b-4fe2-adab-cd8ba21a2d5c.png)

* Run the SQL query to create the pixelfed DB (using the root password you've used in the last step)
```
mysql -u root -p
```

* Paste in the following SQL (Replacing secretpasswordhere with a new secure password for the pixelfed DB user).
```
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'secretpasswordhere';
flush privileges;
exit;
```
![image](https://user-images.githubusercontent.com/17537000/171801426-47a94540-1f71-4db7-b515-c93add487034.png)

## Part 4 - Setup dependent packages
```
apt -y install ffmpeg
```
```
apt -y install jpegoptim optipng pngquant gifsicle 
```
```
apt -y install unzip zip
```

## Part 5 - PHP - Install
* Install PHP 7.4 (FPM and CLI only)
```
apt -y install php7.4-fpm php7.4-cli
```

*  Install additional PHP modules not installed by default
```
apt -y install php7.4-bcmath php7.4-curl php7.4-gd php7.4-intl php7.4-mbstring php7.4-redis php7.4-xml php7.4-zip php7.4-mysql
```

## Part 5.1 - PHP - Setup
* Open the php.ini file
```
nano /etc/php/7.4/fpm/php.ini
```

* Edit these parameters/keys to match these values
```
    post_max_size = 100M
    file_uploads = On
    upload_max_filesize = 100M
    max_file_uploads = 20
    max_execution_time = 120
```

* Test the changes using the following command
```
grep "post_max_size\|file_uploads\|upload_max_filesize\|max_file_uploads\|max_execution_time" /etc/php/7.4/fpm/php.ini
```
![image](https://user-images.githubusercontent.com/17537000/171808166-400b5299-1c90-43af-aa14-5daa76398ab0.png)


## Part 5.2 - PHP-FPM - Setup
* Make a copy of the php-fpm pool config file for pixelfed
```
cp /etc/php/7.4/fpm/pool.d/www.conf /etc/php/7.4/fpm/pool.d/pixelfed.conf
```

* Open the pixelfed.conf file
```
nano /etc/php/7.4/fpm/pool.d/pixelfed.conf
```

* Edit these lines
```
    [pixelfed]
    user = pixelfed
    group = pixelfed
    listen = /run/php/php7.4-fpm-pixelfed.sock
```
![image](https://user-images.githubusercontent.com/17537000/171807724-84a5d028-a6d2-48f9-9a83-19a4345406fb.png)

## Part 6 - Install Composer
* Download the composer installer to /tmp/
```
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
```

* Install composer
```
php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```
![image](https://user-images.githubusercontent.com/17537000/171808535-b0a08f87-2b73-436f-91e7-133e7074a16d.png)


## Part 7 - Prepare new Pixelfed user
* Create a new user pixelfed
```
adduser pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809063-fd22194d-3d2a-446c-9b51-26aadce99ef1.png)

* Login as the new pixelfed user
```
su - pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809094-7d5b7b1d-13ff-4eee-bebd-b496c5590d9b.png)

## Part 7.1 - Prepare Pixelfed (AS PIXELFED USER)
* Using git, clone a copy of the repo from the dev branch
```
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed && cd pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809397-9c797416-1b33-4069-b5a6-e63569006802.png)

* Install all of the php dependant packages using composer
```
composer install --no-ansi --no-interaction --optimize-autoloader
```
![image](https://user-images.githubusercontent.com/17537000/171809700-53d77822-bb8f-475d-812e-3e7f6c5ae086.png)

## Part 8 - Prepare new Pixelfed instance
* Copy the default .env file
```
cp .env.example .env
```

* Open the .env file
```
nano .env
```
* Edit these lines to match your new instance
```
    APP_NAME="Pixelfed Australia"
    APP_DEBUG=false

    APP_URL="https://pixelfed.au"
    APP_DOMAIN="pixelfed.au"
    ADMIN_DOMAIN="pixelfed.au"
    SESSION_DOMAIN="pixelfed.au"
```

## Part 9 - PHP Artisan tasks
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

## Part 10 - Prepare systemd Pixelfed Horizon service file (AS ROOT)
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
## Part 11 - Crontab for schedule
```
crontab -e

```
add this line
```
* * * * * /usr/bin/php /home/pixelfed/pixelfed/artisan schedule:run >> /dev/null 2>&1

```

## Part 12 - Nginx and Certbot - Install
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

```

## Part 13 - Test your new Pixelfed

curl -I https://pixelfed.au

pixelfed@localhost:~/pixelfed$ curl -I https://pixelfed.au
HTTP/2 200
server: nginx/1.18.0 (Ubuntu)

```

Hot cache the instance actor 
```
curl https://pixelfed.au/i/actor

```


