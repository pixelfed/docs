+++
title = "LDAP Authentication"
summary = "You can configure your Pixelfed server to authenticate with an LDAP Server!"
weight = 53
[menu]
[menu.docs]
identifier = "admin/optional/ldap"
parent = "admin/optional"
+++

## Prerequisites

- Enable the `ext-ldap` PHP extension in your servers `php.ini` configuration

- Run the following command in Pixelfed root directory (the one with app, bootstrap, public, storage)

```
composer require directorytree/ldaprecord-laravel
```

### Step 1: Updating user model

You need to edit the `app/User.php` file and add the first two lines

```php
use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;
```

Then change the following line to include `implements LdapAuthenticatable`

```php
class User extends Authenticatable implements LdapAuthenticatable
```

And finally add `AuthenticatesWithLdap` after the other traits.

```php
use Notifiable, SoftDeletes, HasApiTokens, UserRateLimit, HasFactory, AuthenticatesWithLdap;
```

Afterwards your `app/User.php` file should look like this:

```php
<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Util\RateLimit\User as UserRateLimit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;

class User extends Authenticatable implements LdapAuthenticatable
{
    use Notifiable, SoftDeletes, HasApiTokens, UserRateLimit, HasFactory, AuthenticatesWithLdap;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at', 'email_verified_at', '2fa_setup_at'];
```

### Step 2: Configuring session driver

Open the `config/auth.php` file and comment out or delete the following code:

```php
    // Comment out or remove below for LDAP
    'users' => [
        'driver' => 'eloquent',
        'model'  => App\User::class,
    ],
```

Insert the following code immediately after the previous lines you commented out or deleted:

```php
'users' => [
    'driver' => 'ldap',
    'model' => LdapRecord\Models\ActiveDirectory\User::class,
    'rules' => [],
    'database' => [
        'model' => App\User::class,
        'sync_passwords' => false,
        'sync_attributes' => [
            'name' => 'cn',
            'email' => 'mail',
        ],
    ],
],
```

### Step 3: Connecting to LDAP

Configure your LDAP server settings.

Add the following lines to your `.env` file and edit to your needs.

```
LDAP_LOGGING=true
LDAP_CONNECTION=default
LDAP_CONNECTIONS=default

LDAP_DEFAULT_HOSTS=10.0.0.1
LDAP_DEFAULT_USERNAME="cn=admin,dc=local,dc=com"
LDAP_DEFAULT_PASSWORD=secret
LDAP_DEFAULT_PORT=389
LDAP_DEFAULT_BASE_DN="dc=local,dc=com"
LDAP_DEFAULT_TIMEOUT=5
LDAP_DEFAULT_SSL=false
LDAP_DEFAULT_TLS=false
```

### Step 4: Finishing Up!

You're almost ready! The last thing you need to do is flush the configuration cache by running

```
php artisan config:cache
```

You are now ready to login via LDAP!

To test your connection you can run

```
php artisan ldap:test
```
