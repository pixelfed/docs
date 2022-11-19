+++
title = "Laravel Octane"
summary = "Improve performance by using Swoole/Roadrunner"
weight = 43
[menu]
[menu.docs]
identifier = "admin/optional/octane"
parent = "admin/optional"
+++

## Server Prerequisites

* PHP 8.0+

## Installing Laravel Octane

To install Octane run the following command in the root folder of the application:

```bash
php artisan octane:install
```

You need to change your NGINX Configuration to serve the app via Octane:

Add to the top of your configuration, before the server block:
```
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

Change your location inside the server block to:
```
location /index.php {
    try_files /not_exists @octane;
}

location / {
    try_files $uri $uri/ @octane;
}

error_page 404 /index.php;

location @octane  {
    set $suffix "";

    if ($uri = /index.php) {
        set $suffix ?$query_string;
    }

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Scheme $scheme;
    proxy_set_header SERVER_PORT $server_port;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_pass http://127.0.0.1:8000$suffix;
}
```

Don't forget to change the port ``8000`` to the port your Octane server is running.


## Run Laravel Octane
To start Octane type the following command:
```bash
php artisan octane:start
```

Use ``screenie`` or a service to let the command run as daemon/detached shell.

More Information and configuration can be found in the official docs:
[https://laravel.com/docs/9.x/octane](Laravel Octane)