+++
title = "Administering your website"
summary = "Tips and instructions for managing your Pixelfed installation"
weight = 40
[menu]
[menu.docs]
identifier = "admin/administration"
parent = "admin"
+++

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

## Artisan commands

### User management

- `user:admin`	Make a user an admin, or remove admin privileges.
- `user:create`	Create a new user
- `user:delete`	Delete account
- `user:show`	Show user info
- `user:suspend`	Suspend a local user.
- `user:unsuspend`	Unsuspend a local user.
- `user:table`	Display latest users


For example, you can give a user the admin role with the following command:

```bash
php artisan user:admin username_here
```

### Fix accounts with reserved names

You can run this command to fix accounts created before that username was reserved.
```bash
php artisan fix:usernames
```

### Remove unused media

With this command you can trigger the garbage collection on the media files. This frees up disk space. All files being older than one hour and which are not used in any status are removed.

```bash
php artisan media:gc
```

### Create an OAuth client

You can create an OAuth client from the command line using this command:

```bash
php artisan passport:client --personal
```
