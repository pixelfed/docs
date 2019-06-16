# Deployment

Post update procedures or deploying is a set of commands you need to run after installation or updating Pixelfed on a production environment.

::: warning
Depending on the release notes of a specific version, it may require additional deployment commands not listed on this page.
:::

<br>

[[toc]]

### Post Deployment Commands
```bash
$ cd /home/pixelfed # Or wherever pixelfed is installed
$ composer install --no-ansi --no-interaction --no-progress --no-scripts --optimize-autoloader
$ php artisan config:cache
$ php artisan route:cache
$ php artisan migrate --force
$ php artisan horizon:purge
$ php artisan storage:link
```

# Updating

::: tip
We recommend following the post-update deployment procedures on the [Deployment](deployment.html) page.
:::


```bash
$ cd /home/pixelfed # Or wherever you chose to install web applications
$ git pull origin dev
```
