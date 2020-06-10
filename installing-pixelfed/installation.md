# Installation

Installing Pixelfed is simple!

<!-- ## Quick Setup
Use our installer for the easiest installation. It will detect and try to fix any issues it encounters during installation.

```bash
$ git clone https://github.com/pixelfed/pixelfed
$ cd pixelfed
$ composer install
$ php artisan install
``` -->

## Development Setup
For local/non-production use only.
```bash
$ git clone https://github.com/pixelfed/pixelfed
$ cd pixelfed
$ composer install
$ php artisan install
$ php artisan serve

Laravel development server started: http://127.0.0.1:8000
```

## Manual Setup

### Clone Source
```bash
$ git clone https://github.com/pixelfed/pixelfed
$ cd pixelfed
$ composer install
```

### Copy Configuration & Edit
```bash
$ cp .env.example .env
$ php artisan key:generate
# update .env file
```

### Run Database Migrations
```bash
$ php artisan migrate
```

::: tip Database Issues
If you get a database error when running the migrations, ensure you updated the .env with proper [database variables](#) and then run ```php artisan config:cache```. If the issue persists, please create a new issue on our bug tracker.
:::

### Cache + Optimization Commands
Running the following commands is recommend when running Pixelfed in production.

```bash
$ php artisan config:cache
$ php artisan route:cache
$ php artisan view:cache
```

### Storage
Running the following command will link your storage properly.

```bash
$ php artisan storage:link
```
----
::: tip Troubleshooting Installation

We are working on improving the documentation, for now we recommend getting assistance via our ```#pixelfed``` IRC channel on freenode.
:::
