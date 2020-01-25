# Configuring Job Queue

Pixelfed uses [Redis](https://redis.io) to power the job queue that handles many important tasks. You can run the job queue with Horizon or a queue worker.

[[toc]]

## Using Horizon
Horizon provides a beautiful dashboard and code-driven configuration for our Redis queues. Horizon allows you to easily monitor key metrics of your queue system such as job throughput, runtime, and job failures.

While horizon does ship with Pixelfed, it is not enabled by default.

### Installing Horizon
To install Horizon, run the following commands:
```bash
$ php artisan horizon:install
```

### Supervisor Configuration
For more information, refer to the [Laravel Documentation](https://laravel.com/docs/6.x/horizon#deploying-horizon).
```bash
[program:horizon]
process_name=%(program_name)s
command=php /home/forge/app.com/artisan horizon
autostart=true
autorestart=true
user=forge
redirect_stderr=true
stdout_logfile=/home/forge/app.com/horizon.log
stopwaitsecs=3600
```

## Using Queue Worker
Pixelfed includes a queue worker that will process new jobs as they are pushed onto the queue. You may run the worker using the ```queue:work``` Artisan command. Note that once the ```queue:work``` command has started, it will continue to run until it is manually stopped or you close your terminal:

```bash
$ php artisan queue:work
```

::: tip
To keep the ```queue:work``` process running permanently in the background, you should use a process monitor such as [Supervisor](https://laravel.com/docs/6.x/queues#supervisor-configuration) to ensure that the queue worker does not stop running.
:::

## Horizon vs Queue Worker
Pixelfed supports both [Laravel Horizon](https://laravel.com/docs/6.x/horizon) and [Queue Workers](https://laravel.com/docs/6.x/queues) to power the job queue. The main difference between Horizon and Queue Worker is the dashboard provided by Horizon as well as advanced load balancing. We recommend using Horizon.