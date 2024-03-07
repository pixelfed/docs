---
title = "Troubleshooting"
summary = "Frequently asked questions about things going wrong"
weight = 50
[menu]
[menu.docs]
identifier = "admin/troubleshooting"
parent = "admin"
---

# Troubleshooting

## Horizon is not working
This means that your permissions are wrong somewhere. Make sure that you have run `php artisan horizon` as a user that has access to both your repo and to Redis.

## Horizon seems to be working, but it's still showing as inactive.
Run either `php artisan package:discover` or `composer install`, then run `php artisan horizon:install` then `php artisan route:cache`. Restart your systemd service or restart Horizon. It should now show as active.

## Apps using OAuth login show "Something went wrong" page
First, check that `OAUTH_ENABLE=1` is set in `.env`. If the problem persists, try `php artisan passport:install` to regenerate the `storage/oauth-private.key` file.

## 419 Session Expired error
Make sure you have `SESSION_DOMAIN`, `APP_URL` and `APP_DOMAIN` set in your `.env`.
