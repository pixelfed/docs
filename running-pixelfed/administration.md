# Administration

[[toc]]

## Updating Pixelfed

After you have installed Pixelfed, you may update to the latest commits by pulling the dev branch and doing necessary updates/migration/caching:

```bash
$ git pull origin dev
$ composer install
$ php artisan config:cache
$ php artisan route:cache
$ php artisan migrate --force
```

## Admin user

You can give a user the admin role with the following command:

```bash
$ php artisan user:admin username_here
```

Or you can do this with the tinker REPL: 

```
$ php artisan tinker

>>> $username = 'username_here';

>>> $user = User::whereUsername($username)->firstOrFail();

>>> $user->is_admin = true;

>>> $user->save();
```

## Delete a user

Delete a user account with the following command:

```
php artisan user:delete username_here
```

## Fix accounts with reserved names

You can run this command to fix accounts created before that username was reserved.
```bash
$ php artisan fix:usernames
``` 

## Remove unused Media

With this command you can trigger the garbage collection on the media files. This frees up disk space. All files being older than one hour and which are not used in any status are removed.

```bash
$ php artisan media:gc
```
