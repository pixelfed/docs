# Generic installation process

::: warning WARNING
Pixelfed is still a work in progress. We do not recommending running an instance in production at this stage unless you know what you are doing!
:::

Make sure you have all prerequisites installed and the appropriate services running/enabled.

[[toc]]

## Download source via Git

Pixelfed Beta currently uses the `dev` branch for deployable code. When v1.0 is released, the stable branch will be changed to `master`, with `dev` branch being used for development and testing.

```bash{1}
$ cd /home # or wherever you choose to install web applications
$ git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # checkout dev branch into "pixelfed" folder
```

## Set correct permissions

Your web server and app processes need to be able to write to the Pixelfed directory. Make sure to set the appropriate permissions. For example, if you are running your processes through the `http` user/group, then run the following:

```bash{2}
$ cd pixelfed
$ sudo chown -R http:http . # change user/group to http user and http group
$ sudo find . -type d -exec chmod 755 {} \; # set all directories to rwx by user/group
$ sudo find . -type f -exec chmod 644 {} \; # set all files to rw by user/group
```

::: danger User and group permissions
Make sure to use the correct user/group name for your system. This may be `http`, `www-data`, or `pixelfed` (if using a dedicated user).

If you created a dedicated app user, make sure to either add the app user to the web group, or add the web user to the app group. Also, you will need to set 775 for directories and 664 for files, so that both your dedicated app user and your web user can read and write to files in the Pixelfed installation.
:::

## Initialize PHP dependencies

Run `composer install` to fetch the dependencies needed by Pixelfed. It is recommended to run with the following flags:

```bash
$ composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
```

## Configure Pixelfed

By default Pixelfed comes with a `.env.example` file for production deployments, and a `.env.testing` file for debug deployments. You'll need to rename or copy one of these files to `.env` regardless of which environment you're working on.

```bash
$ cp .env.example .env # for production deployments
$ cp .env.testing .env # for debug deployments
```

You can now edit `.env` and change values for your setup.

::: tip List of environment variables
You can find a list of additional configuration settings in-depth on the [Configuration](../technical-documentation/env.md) page, but the important variables will be listed in the below subsections.
:::

### App variables

- Set `APP_NAME` to your desired title, e.g. `Pixelfed`. This will be shown in the header bar and other places.
- Ensure that `APP_DEBUG` is `false` for production environments, or `true` for debug environments.
- Set your `APP_URL` to the HTTPS URL that you wish to serve Pixelfed through, e.g. `https://pixelfed.example`
- Set `APP_DOMAIN`, `ADMIN_DOMAIN`, and `SESSION_DOMAIN` to the domain name you will be using for Pixelfed, e.g. `pixelfed.example`

### Database variables

By default, the values provided will allow connecting to MySQL or MariaDB over the default localhost TCP connection.

If you are running Postgres:

- Set `DB_CONNECTION` to `pgsql` instead of `mysql`.

If you are running your SQL server on a different machine or port:

- Set `DB_HOST` to the IP of the machine
- Set `DB_PORT` to the port on which your database server is exposed

To connect to the database you created:

- Set `DB_DATABASE` to the name of the database created for Pixelfed
- Set `DB_USERNAME` to the user that was granted privileges for that database
- Set `DB_PASSWORD` to the password that identifies the user with privileges to the database

### Redis variables

If you are running Redis over TCP on the same machine as Pixelfed, then the default settings will work.

If you are running Redis on another machine:

- Set `REDIS_HOST` to the IP of the machine your Redis server is running on
- Set `REDIS_PORT` to the port on which Redis is exposed
- Set `REDIS_PASSWORD` to the password of that Redis server

If you are using a UNIX socket for Redis, then:

- Set `REDIS_SCHEME` to `unix`
- Set `REDIS_PATH` to the path of the socket, e.g. `/run/redis/redis.sock`

::: tip TCP server vs. UNIX socket
Redis usually comes pre-configured to listen for TCP requests on the local machine over port 6379. In your Redis configuration, typically at `/etc/redis.conf`, the relevant lines are `bind 127.0.0.1` and `port 6379`.

Changing the latter line to `port 0` will disable TCP listening, in which case Redis must be configured for socket access. Lines such as `unixsocket /run/redis/redis.sock` and `unixsocketperm 770` must be set to enable socket access. Additionally, the app user should have permission to access the socket, e.g. by being added to the `redis` group.

Using a UNIX socket is optional, but may provide faster access since it does not have to create TCP packets. TCP is usually used over a network, and would be required if Redis were running on a different machine than your web server.
:::

### Email variables

By default, Pixelfed will not send any emails, but will instead write messages to the Laravel log. 

To setup a mailer for production deployments, you have several options for supported mail services. [Configuration#mail](../technical-documentation/env.md)

### Additional variables

For testing environments:

- Set `ENFORCE_EMAIL_VERIFICATION` to `false`

For production environments, you will probably want to set various config values related to your deployment. A full list of environment variables can be found [here.](../technical-documentation/env.md)

## Final steps

If you copied `.env.testing` to set up a development environment, the application secret is pre-generated for you. If you copied `.env.example` to set up a production environment, then you need to generate the secret `APP_KEY`:

```bash
$ php artisan key:generate
```

Every time you edit your .env file, you must run this command to have the changes take effect:

```bash
php artisan config:cache
```

One time only, the `storage/` directory must be linked to the application:

```bash
php artisan storage:link
```

Database migrations must be run:

```bash
php artisan migrate --force
```

Routes should be cached whenever the source code changes:
```bash
php artisan route:cache
```