# Administration

[[toc]]

## Updating Pixelfed

After you have installed Pixelfed, you may update to the latest commits by pulling the dev branch and doing necessary updates/migration/caching:

```bash
$ cd /home/pixelfed  # or wherever you installed pixelfed
$ git pull origin dev
$ composer install
$ php artisan route:cache
$ php artisan migrate --force
```

## Admin user

> You can give a user the admin role with the command `php artisan user:admin USER`. USER can be a user id or a user name.

Optionally, you can do it manually

```
$ php artisan tinker

>>> $username = 'username_here';

>>> $user = User::whereUsername($username)->firstOrFail();

>>> $user->is_admin = true;

>>> $user->save();
```
