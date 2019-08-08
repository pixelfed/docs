```bash
useradd -m -g users -s /bin/bash pixelfed
usermod -aG http pixelfed

pacman -S --needed nginx php-fpm php-intl mariadb redis git jpegoptim optipng pngquant imagemagick

mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl start mariadb
mysql_secure_installation
```