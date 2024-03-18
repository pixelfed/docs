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

## Database migrations fail on debian / mariadb due to unknown charset
Edit `/etc/mysql/mariadb.conf.d/50-server.cnf` and replace `character-set-collations = utf8mb4=uca1400_ai_ci` with `character-set-collations = utf8mb4=utf8mb4_unicode_ci`, then restart mariadb. Essentially mariadb on debian uses `uca1400_ai_ci` by default, when pixelfed expects `utf8mb4_unicode_ci`. You may need to `ALTER DATABASE <name> CHARACTER SET = 'utf8mb4_unicode_ci';` afterwards.
