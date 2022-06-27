# Deploying Pixelfed on Ubuntu 22.04 LTS (Jammy Jellyfish) + PHP 8.1
Guide by [@shlee@aus.social](https://aus.social/@shlee) - Version 0.2

[[toc]]

## NOTES
* I will be using `pixelfed.au` as the example domain, because this is the instance I've used to test and confirm this guide. I am running this guide in production. Just replace `pixelfed.au` with your new instance domain.

## TASKS TO COMPLETE AFTER INSTALLATION
* Email setup
* Cloud Storage (S3 bucket)
* Unix Sockets for redis and mariadb to use unixsockets over tcp. (Optional)

## TODO For the guide
* Add UFW

----

## Part 0 - Setup the VM and update the DNS for A and AAAA records
* Setup the VM
> **Note**
> You can use a low spec machine for a while. Increase the instance size for additional CPU/RAM to handle more users as required.

![image](https://user-images.githubusercontent.com/17537000/171820544-80ed8a0e-dae3-4b4b-9c76-ff939c8a488c.png)
* Setup the DNS for pixelfed.au
> **Note**
> DNS records for www.pixelfed.au are not required.
```
A @ <ipv4 address above>
AAAA @ <ipv6 address above> 
```
![image](https://user-images.githubusercontent.com/17537000/171820581-9dd5246f-47e1-4204-bf44-1c5916dd72b5.png)

----

## Part 1 - Upgrade Ubuntu 22.04 LTS
* Install all updated default Ubuntu packages and reboot to use the latest kernel.
```
apt update && apt upgrade -y
```
```
reboot now
```

----

## Part 2 - Redis - Install
* Install stock Redis, and enable the service to autostart.
```
apt -y install redis-server
```
```
systemctl enable --now redis-server
```
* Confirm Redis is running.
```
systemctl status redis-server --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/172035220-2c9f9ad8-d9b3-4109-b2de-adb38010acae.png)

----

## Part 3 - MariaDB - Install
* Install stock MariaDB, and enable the service to autostart.
```
apt -y install mariadb-server
```
```
systemctl enable --now mariadb
```
* Confirm MariaDB is running.
```
systemctl status mariadb --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/172035232-8b0b17a3-9460-404a-945d-9df33cc135af.png)

## Part 3.1 - MariaDB - Secure MariaDB
* Complete the secure installation steps
> **Note**
> Select No (n) for `Switch to unix_socket authentication [Y/n]`.

> **Warning**
> Remember to write down the root password!
```
mysql_secure_installation
```
![image](https://user-images.githubusercontent.com/17537000/171971795-f89a6a59-391c-45a5-8187-5dc9cf123785.png)

## Part 3.2 - MariaDB - Setup Pixelfed DB

* Run the SQL cli tool
```
mysql -u root -p
```

* Paste in the following SQL to create the pixelfed DB, and DB user.
> **Warning**
> Replace `secretpasswordhere` for the pixelfed DB user.
```
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'secretpasswordhere';
flush privileges;
exit;

```
![image](https://user-images.githubusercontent.com/17537000/172032110-5d43fad2-ac8b-4a4e-9939-fc6c476e47b2.png)

----

## Part 4 - Prepare new Pixelfed user
* Create a new user pixelfed
```
adduser pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809063-fd22194d-3d2a-446c-9b51-26aadce99ef1.png)

----

## Part 5 - Setup dependent packages
```
apt -y install ffmpeg unzip zip jpegoptim optipng pngquant gifsicle 
```

----

## Part 6 - PHP - Install
* Install PHP 8.1 (FPM and CLI only)
```
apt -y install php8.1-fpm php8.1-cli
```

*  Install additional PHP modules not installed by default
```
apt -y install php8.1-bcmath php8.1-curl php8.1-gd php8.1-intl php8.1-mbstring php8.1-xml php8.1-zip php8.1-mysql php-redis
```

* Confirm PHP installation
```
/usr/bin/php -v
```
![image](https://user-images.githubusercontent.com/17537000/171971995-d94a4278-68d6-4d1c-9a81-9fb7404779d6.png)

## Part 6.1 - PHP - Configure php.ini for CLI
* Tweak the CLI php.ini file (using sed automation)
```
sed -i "s/post_max_size = .*/post_max_size = 300M/g" /etc/php/8.1/cli/php.ini
sed -i "s/file_uploads = .*/file_uploads = On/g" /etc/php/8.1/cli/php.ini
sed -i "s/upload_max_filesize = .*/upload_max_filesize = 300M/g" /etc/php/8.1/cli/php.ini
sed -i "s/max_file_uploads = .*/max_file_uploads = 20/g" /etc/php/8.1/cli/php.ini
sed -i "s/max_execution_time = .*/max_execution_time = 120/g" /etc/php/8.1/cli/php.ini
```
or manually by editing the `/etc/php/8.1/cli/php.ini` file.

* Test the changes using the following command
```
grep "post_max_size\|file_uploads\|upload_max_filesize\|max_file_uploads\|max_execution_time" /etc/php/8.1/cli/php.ini
```
![image](https://user-images.githubusercontent.com/17537000/174467902-5e82c270-8510-4896-839f-38205fb0f1e6.png)


## Part 6.2 - PHP - Configure php.ini for FPM
* Tweak the FPM php.ini file (using sed automation)
```
sed -i "s/post_max_size = .*/post_max_size = 300M/g" /etc/php/8.1/fpm/php.ini
sed -i "s/file_uploads = .*/file_uploads = On/g" /etc/php/8.1/fpm/php.ini
sed -i "s/upload_max_filesize = .*/upload_max_filesize = 300M/g" /etc/php/8.1/fpm/php.ini
sed -i "s/max_file_uploads = .*/max_file_uploads = 20/g" /etc/php/8.1/fpm/php.ini
sed -i "s/max_execution_time = .*/max_execution_time = 120/g" /etc/php/8.1/fpm/php.ini
```
or manually by editing the `/etc/php/8.1/fpm/php.ini` file.

* Test the changes using the following command
```
grep "post_max_size\|file_uploads\|upload_max_filesize\|max_file_uploads\|max_execution_time" /etc/php/8.1/fpm/php.ini
```
![image](https://user-images.githubusercontent.com/17537000/174468122-f1a20bb7-f3a4-4bbd-809b-aed53ec46789.png)


## Part 6.3 - PHP-FPM - Setup
* Make a copy of the php-fpm pool config file for pixelfed
```
cp /etc/php/8.1/fpm/pool.d/www.conf /etc/php/8.1/fpm/pool.d/pixelfed.conf
```

* Open the php-fpm pixelfed.conf file
```
nano /etc/php/8.1/fpm/pool.d/pixelfed.conf
```

* Edit these lines
```
[pixelfed]
user = pixelfed
group = pixelfed
listen = /run/php/php8.1-fpm-pixelfed.sock
```
![image](https://user-images.githubusercontent.com/17537000/171807724-84a5d028-a6d2-48f9-9a83-19a4345406fb.png)

* Restart php-fpm
```
systemctl restart php8.1-fpm
```
* Confirm FPM is running.
```
systemctl status php8.1-fpm --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/172035654-4365f84f-38a7-4490-b2cb-23dec345cb98.png)

----

## Part 7 - Install Composer
* Download the composer installer to /tmp/, and install it globally.
```
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

![image](https://user-images.githubusercontent.com/17537000/171808535-b0a08f87-2b73-436f-91e7-133e7074a16d.png)

----

## Part 8 - Installation of Pixelfed
* Login as the new pixelfed user
```
su - pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809094-7d5b7b1d-13ff-4eee-bebd-b496c5590d9b.png)

## Part 8.1 - Prepare your new Pixelfed instance as the pixelfed user
* Using git, clone a copy of the repo from the dev branch into the home folder of the new pixelfed user.
```
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed && cd pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171809397-9c797416-1b33-4069-b5a6-e63569006802.png)


## Part 8.2 - composer install
* Install all of the php dependant packages using composer
```
composer install --no-ansi --no-interaction --optimize-autoloader
```
![image](https://user-images.githubusercontent.com/17537000/171809700-53d77822-bb8f-475d-812e-3e7f6c5ae086.png)

----

## Part 9 - Prepare new Pixelfed instance (using Laravel artisan installer)
* Run the installer wizard
> **Note**
> Almost all of the default options can be selected.
```
php artisan install
```
![image](https://user-images.githubusercontent.com/17537000/175801755-fb42797e-04f8-45c1-ab52-cf074a384318.png)

* Select Advanced, and complete the installation wizard.

### Part 9.1 - Running the installer again (if you didn't complete the whole wizard)

> **Note**
> Clean your instance and start the installer from the beginning.
```
rm .env
php artisan config:cache  # Required to clear the previously generated APP_KEY from cache.
php artisan install
```

----

## Part 10 - Install Laravel Horizon
```
php artisan horizon:install
```
```
php artisan horizon:publish
```
![image](https://user-images.githubusercontent.com/17537000/171812367-970fea18-4150-46b2-9a3b-798cdaba464b.png)

----

## Part 11 - Return to the root account
* Exit the `pixelfed` account and become root again.
```
exit
```
![image](https://user-images.githubusercontent.com/17537000/171812687-e34fd89f-6bd0-4724-aed6-ef60a7dfbdc1.png)

## Part 11.1 - Fix ownership of folders
* chmod all of the pixelfed instance to include the www-data group.
```
chown -R pixelfed:www-data /home/pixelfed
```
```
ls -lA /home/pixelfed/pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/172037133-592798eb-20d7-4f9e-82da-c77682396eaf.png)

----

## Part 12 - Nginx and Certbot - Install
* Install stock nginx, Install certbot to handle the TLS certificate and enable the engine service to autostart.
```
apt -y install nginx certbot python3-certbot-nginx
```
```
systemctl enable --now nginx
```
![image](https://user-images.githubusercontent.com/17537000/171813872-b3b2066c-fa90-4e4d-98bb-8ca3f797ffed.png)

* Confirm the certbot timer is running (Certbot will renew TLS certs automatically)
```
systemctl status certbot.timer --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/171818819-231ada60-060d-4eb0-8692-e9cea151307b.png)


## Part 12.1 - Configure certbot
```
rm /etc/nginx/sites-enabled/default
```
* Generate a new TLS Certificate for `pixelfed.au`.
```
# Ignore the error about the matching server block. We will create this next.
certbot -d pixelfed.au
```
![image](https://user-images.githubusercontent.com/17537000/172035752-f11476f8-5bae-4754-8f90-e5bdec594ff1.png)


## Part 12.2 - Configure NGIИX
* Copy the Nginx pixelfed.conf
```
cp /home/pixelfed/pixelfed/contrib/nginx.conf /etc/nginx/sites-available/pixelfed.conf
```

* Open the Nginx pixelfed.conf file
```
nano /etc/nginx/sites-available/pixelfed.conf
```

* Edit these lines to match your new instance

> * server_name has to be changed twice
> * root needs to be changed to the correct path
> * fastcgi_pass needs to be updated to match the fpm conf
> * ssl_certificate and ssl_certificate_key need to be updated with the certbot path

```
    server_name pixelfed.au;
    root /home/pixelfed/pixelfed/public;
        
    ssl_certificate /etc/letsencrypt/live/pixelfed.au/fullchain.pem;       # generate your own
    ssl_certificate_key /etc/letsencrypt/live/pixelfed.au/privkey.pem;   # or use letsencrypt

    fastcgi_pass unix:/run/php/php8.1-fpm-pixelfed.sock;
```
![image](https://user-images.githubusercontent.com/17537000/171829099-3541b28c-0953-471a-8385-a36fd91c1606.png)

* Add a symlink to the Nginx sites-enabled folder
```
ln -s /etc/nginx/sites-available/pixelfed.conf /etc/nginx/sites-enabled/
```

* Reload Nginx to load the new enabled site.
```
systemctl reload nginx
```
* Confirm Nginx is running.
```
systemctl status nginx --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/174468284-08129a3f-c68b-4684-afef-45637748fd9f.png)

----

## Part 13 - Prepare systemd Pixelfed Horizon service file (AS ROOT)
* Create the systemd service file for Horizon
```
tee /etc/systemd/system/pixelfedhorizon.service <<EOF
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php8.1-fpm
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
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target

EOF
```
* Reload systemd and enable the Pixelfed Horizon
```
systemctl daemon-reload
```
```
systemctl enable --now pixelfedhorizon
```
* Wait 10 seconds for the Horizon Queue to boot the worker nodes
* Confirm MariaDB is running.
```
systemctl status pixelfedhorizon --no-pager 
```
![image](https://user-images.githubusercontent.com/17537000/171827697-a2aa60bf-dd65-4765-8bc5-bd79b83208ad.png)


## Part 13.1 - Crontab for schedule
* Edit the crontab file
```
crontab -e
```
![image](https://user-images.githubusercontent.com/17537000/171828144-8140c3eb-14ed-4062-9ff7-af635df51dac.png)


* add this line
```
* * * * * /usr/bin/php /home/pixelfed/pixelfed/artisan schedule:run >> /dev/null 2>&1
```
![image](https://user-images.githubusercontent.com/17537000/171827817-66ffa3e1-2e0d-430d-8cad-73f72a5b6122.png)

----

## Part 14 - Test your new Pixelfed
* Test the server locally
```
curl -I https://pixelfed.au
```
![image](https://user-images.githubusercontent.com/17537000/171829201-dc205193-515f-4cfa-adbd-4338f4ed3af9.png)


* Hot cache the instance actor 
```
curl https://pixelfed.au/i/actor
```
![image](https://user-images.githubusercontent.com/17537000/171829396-ad8c402f-d752-4b17-80ec-272ad71d71dc.png)

----

## Part 15 - Test on the browser!
![image](https://user-images.githubusercontent.com/17537000/171829532-a44d949a-3bc5-491a-aea0-73e9a210f1c3.png)

## Part 15.1 - Log in with the admin account
* Confirm the Admin Dashboard link is visible.

![image](https://user-images.githubusercontent.com/17537000/171832652-5123b4a5-b059-48c2-93cd-aae610b5e4ca.png)

## Part 15.2 - Test the Horizon Queue
* Visit the Horizon Portal in the admin area.
![image](https://user-images.githubusercontent.com/17537000/172037006-ab6801f3-90d8-44d6-889c-aaf233e154fa.png)


## Part 16 - Post-Installation Tasks
* Setup Email
* Setup Cloud Storage (S3 bucket)
