+++
title = "Setting up your environment"
summary = "Download and install the pre-requisites, then run these commands."
[menu]
[menu.docs]
identifier = "development/intro"
parent = "development"
weight = 10
+++

## Requirements
- [Git](https://git-scm.com/downloads)
- [PHP](https://www.php.net/manual/en/install.php)
- [Composer](https://getcomposer.org/download/)
- [Node](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Database
  - [MariaDB](https://mariadb.org/download/?t=mariadb)
  - [MySQL](https://www.mysql.com/downloads/)
  - [PostgreSQL]https://www.postgresql.org/download/
- [Redis](https://redis.io/docs/getting-started/)

## Development Setup
For local/non-production use only.
```bash
git clone https://github.com/pixelfed/pixelfed
cd pixelfed
composer install
php artisan install
php artisan serve
```

The development server will start on: http://localhost:8000