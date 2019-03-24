# Requirements

::: tip WARNING
Before you install pixelfed, you will need to setup the required dependencies and a webserver.
:::

    
[[toc]]

### Dependencies

 - PHP >= 7.1.3 (7.2+ recommended for stable version)
 - MySQL >= 5.7, Mariadb >= 10.2.7, Postgres (sqlite is not supported yet)
 - Redis
 - Composer
 - GD or ImageMagick
 - OpenSSL PHP Extension
 - PDO PHP Extension
 - Mbstring PHP Extension
 - Tokenizer PHP Extension
 - XML PHP Extension
 - Ctype PHP Extension
 - JSON PHP Extension
 - JpegOptim
 - Optipng
 - Pngquant 2

### Composer

Pixelfed uses the composer package manager, you can download it [here](https://getcomposer.org/download/)

### Database

You can choose one of three supported database drivers:
 - MySQL (5.7+)
 - MariaDB (10.2.7+)
 - Postgres

::: warning WARNING
If you decide to change database drivers later, please run a backup first!

```bash
php artisan backup:run --only-db
```
:::