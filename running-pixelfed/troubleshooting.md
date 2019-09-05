# Troubleshooting your Pixelfed installation

## Horizon is not working
This means that your permissions are wrong somewhere. Make sure that you have run `php artisan horizon` as a user that has access to both your repo and to Redis.

## Horizon seems to be working, but it's still showing as inactive.
Run either `php artisan package:discover` or `composer install`, then run `php artisan horizon:install` and `php artisan horizon:assets` then `php artisan route:cache`. Restart your systemd service or restart Horizon. It should now show as active.