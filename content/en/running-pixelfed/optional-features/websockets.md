+++
title = "Websockets"
summary = "Websockets provide real time chat for Live Streaming and in the future, other aspects of the frontend UI and mobile apps."
weight = 42
[menu]
[menu.docs]
identifier = "admin/optional/websockets"
parent = "admin/optional"
+++

{{<hint style="danger">}}
When using websockets as a Pusher replacement without having used Pusher before, **it does not matter what you set as your `PUSHER_` variables. Just make sure they are unique and not empty**.
{{</hint>}}

## Pusher Configuration

When broadcasting events from your Pixelfed server to your WebSocket server, the default behavior is to send the event information to the official Pusher server. But since the Pixelfed WebSockets package comes with its own Pusher API implementation, we need to tell Pixelfed to send the events to our own server.

To do this, you should add the `host` and `port` configuration key to your `config/broadcasting.php` and add it to the `pusher` section. The default port of the Pixelfed WebSocket server is 6001.

```php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'encrypted' => true,
        'host' => env('PUSHER_APP_HOST', '127.0.0.1'),
        'port' => env('PUSHER_APP_PORT', 6001),
        'scheme' => env('PUSHER_APP_SCHEME', 'http'),
        'curl_options' => [
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
        ],
    ],
],
```

## Starting the WebSocket server

Once you have configured your WebSocket apps and Pusher settings, you can start the Pixelfed WebSocket server by issuing the artisan command:

```bash
php artisan websockets:serve
```

### Using a different port

The default port of the Pixelfed WebSocket server is `6001`. You may pass a different port to the command using the `--port` option.

```bash
php artisan websockets:serve --port=3030
```

This will start listening on port `3030`.

### Restricting the listening host

By default, the Pixelfed WebSocket server will listen on `0.0.0.0` and will allow incoming connections from all networks. If you want to restrict this, you can start the server with a `--host` option, followed by an IP.

For example, by using `127.0.0.1`, you will only allow WebSocket connections from localhost.

```bash
php artisan websockets:serve --host=127.0.0.1
```

## Restarting Server

If you use Supervisor to keep your server alive, you might want to restart it just like `queue:restart` does.

To do so, consider using the `websockets:restart`. In a maximum of 10 seconds since issuing the command, the server will be restarted.

```bash
php artisan websockets:restart
```

## SSL Support

Since most of the web's traffic is going through HTTPS, it's also crucial to secure your WebSocket server. Luckily, adding SSL support to this package is really simple.

### Configuration

The SSL configuration takes place in your `config/websockets.php` file.

The default configuration has a SSL section that looks like this:

```php
'ssl' => [

    'local_cert' => env('LARAVEL_WEBSOCKETS_SSL_LOCAL_CERT', null),

    'capath' => env('LARAVEL_WEBSOCKETS_SSL_CA', null),

    'local_pk' => env('LARAVEL_WEBSOCKETS_SSL_LOCAL_PK', null),

    'passphrase' => env('LARAVEL_WEBSOCKETS_SSL_PASSPHRASE', null),

    'verify_peer' => env('APP_ENV') === 'production',

    'allow_self_signed' => env('APP_ENV') !== 'production',

],
```

But this is only a subset of all the available configuration options.

This packages makes use of the official PHP [SSL context options](http://php.net/manual/en/context.ssl.php).

So if you find yourself in the need of adding additional configuration settings, take a look at the PHP documentation and simply add the configuration parameters that you need.

After setting up your SSL settings, you can simply (re)start your WebSocket server using:

```bash
php artisan websockets:serve
```

### Server configuration

When broadcasting events from your Pixelfed server to the WebSocket server, you also need to tell Pixelfed to make use of HTTPS instead of HTTP. You can do this by setting the `PUSHER_APP_SCHEME` variable to `https`

```
PUSHER_APP_SCHEME=https
```

Your connection from `config/broadcasting.php` would look like this:

```php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'encrypted' => true,
        'host' => env('PUSHER_APP_HOST', '127.0.0.1'),
        'port' => env('PUSHER_APP_PORT', 6001),
        'scheme' => env('PUSHER_APP_SCHEME', 'http'),
    ],
],
```

Since the SSL configuration can vary quite a lot, depending on your setup, let's take a look at the most common approaches.

### Usage with a reverse proxy (like Nginx)

Alternatively, you can also use a proxy service - like Nginx, HAProxy or Caddy - to handle the SSL configurations and proxy all requests in plain HTTP to your echo server.

A basic Nginx configuration would look like this, but you might want to tweak the SSL parameters to your liking.

```
server {
  listen        443 ssl;
  listen        [::]:443 ssl;
  server_name   socket.yourapp.tld;

  # Start the SSL configurations
  ssl                  on;
  ssl_certificate      /etc/letsencrypt/live/socket.yourapp.tld/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/socket.yourapp.tld/privkey.pem;

  location / {
    proxy_pass             http://127.0.0.1:6001;
    proxy_read_timeout     60;
    proxy_connect_timeout  60;
    proxy_redirect         off;

    # Allow the use of websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

You can now talk HTTPS to `socket.yourapp.tld`. You would configure your `config/broadcasting.php` like the example above, treating your socket server as an `https` endpoint.

#### Same location for websockets and web contents

To have the websockets be served at the same location and port as your other web content, Nginx can be taught to map incoming requests based on their type to special sub-locations.

```
map $http_upgrade $type {
  default "web";
  websocket "ws";
}

server {
  # Your default configuration comes here...

  location / {
    try_files /nonexistent @$type;
  }

  location @web {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location @ws {
    proxy_pass             http://127.0.0.1:6001;
    proxy_set_header Host  $host;
    proxy_read_timeout     60;
    proxy_connect_timeout  60;
    proxy_redirect         off;

    # Allow the use of websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

This configuration is useful if you do not want to open multiple ports or you are restricted to which ports are already opened on your server. Alternatively, a second Nginx location can be used on the server-side, while the Pusher configuration [`wsPath`](https://github.com/pusher/pusher-js#wspath) can be used on the client-side (_note: `"pusher-js": ">=4.2.2"` is required for this configuration option_).

```
server {
  # Your default configuration comes here...

  location /ws {
    proxy_pass             http://127.0.0.1:6001;
    proxy_set_header Host  $host;
    proxy_read_timeout     60;
    proxy_connect_timeout  60;
    proxy_redirect         off;

    # Allow the use of websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

#### Nginx worker connections

Note that you might need to increase the amount of `worker_connections` in Nginx. Your WebSocket connections will now be sent to Nginx, which in turn will send those along to the websocket server.

By default, that will have a sane limit of 1024 connections. If you are expecting more concurrent connections to your WebSockets, you can increase this in your global `nginx.conf`.

```
events {
    worker_connections  1024;
}
```

You know you've reached this limit of your Nginx error logs contain similar messages to these:

```
[alert] 1024 worker_connections are not enough while connecting to upstream
```

Remember to restart your Nginx after you've modified the `worker_connections`.

### Example using Caddy v2

[Caddy](https://caddyserver.com) can also be used to automatically obtain a TLS certificate from Let's Encrypt and terminate TLS before proxying to your websocket server.

An example configuration would look like this:

```
socket.yourapp.tld {
    @ws {
        header Connection *Upgrade*
        header Upgrade    websocket
    }
    reverse_proxy @ws 127.0.0.1:6001
}
```

Note that you should change `127.0.0.1` to the hostname of your websocket server. For example, if you're running in a Docker environment, this might be the container name of your websocket server.

## Deploying

When your application is ready to get deployed, here are some tips to improve your WebSocket server.

### Open Connection Limit

On Unix systems, every user that connects to your WebSocket server is represented as a file somewhere on the system.
As a security measurement of every Unix based OS, the number of "file descriptors" an application may have open at a time is limited - most of the time to a default value of 1024 - which would result in a maximum number of 1024 concurrent users on your WebSocket server.

In addition to the OS restrictions, this package makes use of an event loop called "stream_select", which has a hard limit of 1024.

#### Increasing the maximum number of file descriptors

The operating system limit of open "file descriptors" can be increased using the `ulimit` command. The `-n` option modifies the number of open file descriptors.

```bash
ulimit -n 10000
```

The `ulimit` command only **temporarily** increases the maximum number of open file descriptors. To permanently modify this value, you can edit it in your operating system `limits.conf` file.

You are best to do so by creating a file in the `limits.d` directory. This will work for both Red Hat & Ubuntu derivatives.

```bash
$ cat /etc/security/limits.d/laravel-echo.conf
laravel-echo        soft        nofile      10000
```

The above example assumes you will run your echo server as the `laravel-echo` user, you are free to change that to your liking.

#### Changing the event loop

To make use of a different event loop, that does not have a hard limit of 1024 concurrent connections, you can either install the `ev` or `event` PECL extension using:

```bash
sudo pecl install ev
# or
sudo pecl install event
```

#### Deploying on Laravel Forge

If your are using [Laravel Forge](https://forge.laravel.com/) for the deployment [this article by Alex Bouma](https://alex.bouma.dev/installing-laravel-websockets-on-forge) might help you out.

### Keeping the socket server running with supervisord

The `websockets:serve` daemon needs to always be running in order to accept connections. This is a prime use case for `supervisor`, a task runner on Linux.

First, make sure `supervisor` is installed.

```bash
# On Debian / Ubuntu
apt install supervisor

# On Red Hat / CentOS
yum install supervisor
systemctl enable supervisord
```

Once installed, add a new process that `supervisor` needs to keep running. You place your configurations in the `/etc/supervisor/conf.d` (Debian/Ubuntu) or `/etc/supervisord.d` (Red Hat/CentOS) directory.

Within that directory, create a new file called `websockets.conf`.

```bash
[program:websockets]
command=/usr/bin/php /home/laravel-echo/laravel-websockets/artisan websockets:serve
numprocs=1
autostart=true
autorestart=true
user=laravel-echo
```

Once created, instruct `supervisor` to reload its configuration files (without impacting the already running `supervisor` jobs).

```bash
supervisorctl update
supervisorctl start websockets
```

Your echo server should now be running (you can verify this with `supervisorctl status`). If it were to crash, `supervisor` will automatically restart it.

Please note that, by default, just like file descriptiors,  `supervisor` will force a maximum number of open files onto all the processes that it manages. This is configured by the `minfds` parameter in `supervisord.conf`.

If you want to increase the maximum number of open files, you may do so in `/etc/supervisor/supervisord.conf` (Debian/Ubuntu) or `/etc/supervisord.conf` (Red Hat/CentOS):

```
[supervisord]
minfds=10240; (min. avail startup file descriptors;default 1024)
```

After changing this setting, you'll need to restart the supervisor process (which in turn will restart all your processes that it manages).

### Cloudflare

In some cases, you might use Cloudflare and notice that your production server does not seem to respond to your `:6001` port.

This is because Cloudflare does not seem to open ports, [excepting a few of them](https://blog.cloudflare.com/cloudflare-now-supporting-more-ports/).

To mitigate this issue, for example, you can run your server on port `2096`:

```bash
php artisan websockets:serve --port=2096
```

You will notice that the new `:2096` websockets server will work properly.