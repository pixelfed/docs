---
title = "Administering your website"
summary = "Tips and instructions for managing your Pixelfed installation"
weight = 30
[menu]
[menu.docs]
identifier = "admin/administration"
parent = "admin"
---

# Administration 

## Updating Pixelfed

After you have installed Pixelfed, you may update to the latest commits by pulling the dev branch and doing necessary updates/migration/caching:

```bash
cd /path/to/pixelfed
git pull origin dev
composer install
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```