+++
title = "Configuration"
summary = "A list of environment variables"
[menu]
[menu.docs]
identifier = "tech/config"
parent = "tech"
+++

All configuration files are located in the `config/` folder of your Pixelfed installation. These are the environment variables you can set in your `.env` file; note that some variables are currently unused and do nothing.

{{<hint style="tip">}}
**Summary of important variables**

For a user-facing guide to which environment variables you might want to set, check out the [installation guide](../running-pixelfed/installation.md#configure-environment-variables) instead.
{{</hint>}}

## APP

### `APP_NAME`

This value is the name of your application. This value is used when the framework needs to place the application's name in a notification or any other location as required by the application or its packages. Defaults to `"Pixelfed"`.

### `APP_ENV`

This value determines the "environment" your application is currently running in. This may determine how you prefer to configure various services your application utilizes. Set this in your ".env" file. Defaults to `"production"`.

### `APP_DEBUG`

When your application is in debug mode, detailed error messages with stack traces will be shown on every error that occurs within your application. If disabled, a simple generic error page is shown. Defaults to `false`.

### `APP_URL`

This URL is used by the console to properly generate URLs when using the Artisan command line tool. You should set this to the root of your application so that it is used when running Artisan tasks. Defaults to `"https://localhost"`.

### `APP_TIMEZONE`

(Not listed on Admin > Diagnostics.) Defaults to `"UTC"`. Do not edit your timezone or things will break!

### `APP_LOCALE`

The application locale determines the default locale that will be used by the translation service provider. You are free to set this value to any of the locales which will be supported by the application. Defaults to `"en"`.

### `APP_FALLBACK_LOCALE`

The fallback locale determines the locale to use when the current one is not available. You may change the value to correspond to any of the language folders that are provided through your application. Defaults to `"en"`.

### `APP_KEY`

(Not listed on Admin > Diagnostics.) A random 32-character string to be used as an encryption key. No default value; use `php artisan key:generate` to generate. This key is used by the Illuminate encrypter service and should be set to a random, 32 character string, otherwise these encrypted strings will not be safe. Please do this before deploying an application!

## BACKUP

(Not listed on Admin > Diagnostics.)

### `BACKUP_ARCHIVE_PASSWORD`

(Not listed on Admin > Diagnostics.) The password to be used for archive encryption. Set to `null` to disable encryption.

### `BACKUP_EMAIL_ADDRESS`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

## BROADCASTING

### `BROADCAST_DRIVER`

This option controls the default broadcaster that will be used by the framework when an event needs to be broadcast. Possible values:

- `"pusher"`
- `"redis"`
- `"log"`
- `"null"` (default)

### PUSHER

#### `PUSHER_APP_KEY`

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_SECRET`

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_ID`

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_CLUSTER`

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_ENCRYPTED`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

#### `PUSHER_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `APP_DOMAIN`.

#### `PUSHER_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `443`.

#### `PUSHER_SCHEME`

(Not listed on Admin > Diagnostics.) Defaults to `"https"`.

## CACHE

### `CACHE_DRIVER`

This option controls the default cache connection that gets used while using this caching library. This connection is used when another is not explicitly specified when executing a given caching function. Possible values:

- `"apc"`
- `"array"`
- `"database"`
- `"file"` (default)
- `"memcached"`
- `"redis"`

### `CACHE_PREFIX`

(Not listed on Admin > Diagnostics.) Defaults to `${APP_NAME}_cache`, or `laravel_cache` if no `APP_NAME` is set.

### MEMCACHED

(Not listed on Admin > Diagnostics.)

#### `MEMCACHED_PERSISTENT_ID`

(Not listed on Admin > Diagnostics.)

#### `MEMCACHED_USERNAME`

(Not listed on Admin > Diagnostics.)

#### `MEMCACHED_PASSWORD`

(Not listed on Admin > Diagnostics.)

#### `MEMCACHED_HOST`

Defaults to `"127.0.0.1"`.

#### `MEMCACHED_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `11211`.

### REDIS

#### `REDIS_CLIENT`

(Not listed on Admin > Diagnostics.) Defaults to `"phpredis"`.

#### `REDIS_SCHEME`

(Not listed on Admin > Diagnostics.) Defaults to `"tcp"`.

#### `REDIS_PATH`

(Not listed on Admin > Diagnostics.) No default value.

#### `REDIS_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"localhost"`.

#### `REDIS_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

#### `REDIS_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `6379`.

#### `REDIS_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `0`.

## CAPTCHA

(Not listed on Admin > Diagnostics.) Use [hCaptcha](https://www.hcaptcha.com/) to protect your login from bots.

### `CAPTCHA_ENABLED`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### `CAPTCHA_SECRET`

(Not listed on Admin > Diagnostics.)

### `CAPTCHA_SITEKEY`

(Not listed on Admin > Diagnostics.)

## COSTAR

(Not listed on Admin > Diagnostics.) COSTAR - Confirm Object Sentiment Transform and Reduce

### `CS_BLOCKED_DOMAINS`

(Not listed on Admin > Diagnostics.) Comma-separated list of domains to block. Defaults to `null`.

### `CS_CW_DOMAINS`

(Not listed on Admin > Diagnostics.) Comma-separated list of domains to add warnings. Defaults to `null`.

### `CS_UNLISTED_DOMAINS`

(Not listed on Admin > Diagnostics.) Comma-separated list of domains to remove from public timelines. Defaults to `null`.

### `CS_BLOCKED_KEYWORDS`

(Not listed on Admin > Diagnostics.) Comma-separated list of keywords to block. Defaults to `null`.

### `CS_CW_KEYWORDS`

(Not listed on Admin > Diagnostics.) Comma-separated list of keywords to add warnings. Defaults to `null`.

### `CS_UNLISTED_KEYWORDS`

(Not listed on Admin > Diagnostics.) Comma-separated list of keywords to remove from public timelines. Defaults to `null`.

### `CS_BLOCKED_ACTOR`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

### `CS_CW_ACTOR`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

### `CS_UNLISTED_ACTOR`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

## DATABASE

### `DB_CONNECTION`

Here you may specify which of the database connections below you wish to use as your default connection for all database work. Of course you may use many connections at once using the Database library. Possible values:

- `"sqlite"`
- `"mysql"` (default)
- `"pgsql"`
- `"sqlsrv"`

### SQLITE

(Not listed on Admin > Diagnostics.) When using `sqlite` for `DB_CONNECTION`.

#### `DB_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `"database.sqlite"`.

### MYSQL

(Not listed on Admin > Diagnostics.) When using `"mysql"` for `DB_CONNECTION`.

#### `DB_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"127.0.0.1"`.

#### `DB_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `"3306"`.

#### `DB_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `"forge"`

#### `DB_USERNAME`

(Not listed on Admin > Diagnostics.) Defaults to `"forge"`

#### `DB_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

#### `DB_SOCKET`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

### PGSQL

(Not listed on Admin > Diagnostics.) When using `"pgsql"` for `DB_CONNECTION`.

#### `DB_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"127.0.0.1"`.

#### `DB_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `"5432"`.

#### `DB_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `forge`.

#### `DB_USERNAME`

(Not listed on Admin > Diagnostics.) Defaults to `forge`.

#### `DB_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

### SQLSRV

When using `"sqlsrv"` for `DB_CONNECTION`.

#### `DB_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"localhost"`.

#### `DB_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `"1433"`.

#### `DB_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `forge`.

#### `DB_USERNAME`

(Not listed on Admin > Diagnostics.) Defaults to `forge`.

#### `DB_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

### `REDIS_CLIENT`

- `"predis"` (default)
- `"phpredis"`

#### `REDIS_SCHEME`

(Not listed on Admin > Diagnostics.) Defaults to `"tcp"`.

#### `REDIS_PATH`

(Not listed on Admin > Diagnostics.) No default value.

#### `REDIS_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"127.0.0.1"`.

#### `REDIS_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

#### `REDIS_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `6379`.

#### `REDIS_DATABASE`

(Not listed on Admin > Diagnostics.) Defaults to `0`.

## EXP

Experimental configuration options. (Use at your own risk.)

### `EXP_LC`

Hidden like counts (deprecated). Defaults to `false`.

### `EXP_REC`

(Variable is ignored.) Recommendations (deprecated). Defaults to `false`.

### `EXP_LOOPS`

(Variable is ignored.) Loops feature (deprecated). Defaults to `false`.

### `EXP_TOP`

Text only posts (alpha). Defaults to `false`.

### `EXP_POLLS`

Poll statuses (alpha). Defaults to `false`.

### `EXP_CPT`

Cached public timeline for larger instances (beta). Defaults to `false`.

### `EXP_GPS`

Groups (unreleased). Defaults to `false`.

### `spa`

(Variable is ignored.) Single page application (beta). Defaults to `true`.

### `EXP_EMC`

Enforce Mastoapi Compatibility (alpha). Defaults to `true`.

## FEDERATION

### ACTIVITYPUB

ActivityPub configuration.

#### `ACTIVITY_PUB`

Defaults to `false`.

#### `AP_OUTBOX`

Defaults to `true`.

#### `AP_INBOX`

Defaults to `true`.

#### `AP_SHAREDINBOX`

Defaults to `true`.

#### `AP_REMOTE_FOLLOW`

Defaults to `true`.

#### `ACTIVITYPUB_DELIVERY_TIMEOUT`

Defaults to `30.0`.

#### `ACTIVITYPUB_DELIVERY_CONCURRENCY`

Defaults to `10`.

#### `AP_LOGGER_ENABLED`

Defaults to `false`.

### `ATOM_FEEDS`

Defaults to `true`.

### `REMOTE_AVATARS`

Defaults to `true`.

### `NODEINFO`

Defaults to `true`.

### `WEBFINGER`

Defaults to `true`.

### `PF_NETWORK_TIMELINE`

Defaults to `true`.

### `PF_NETWORK_TIMELINE_DAYS_FALLOFF`

Defaults to `2`.

### `CUSTOM_EMOJI`

Defaults to `false`.

### `CUSTOM_EMOJI_MAX_SIZE`

Defaults to `2000000` (2MB).

## FILESYSTEMS

### `FILESYSTEM_DRIVER`

Here you may specify the default filesystem disk that should be used by the framework. The "local" disk, as well as a variety of cloud based disks are available to your application. Just store away! Possible options:

- `"local"` (default)
- `"public"`
- `"s3"`
- `"spaces"`
- `"backup"`

### `FILESYSTEM_CLOUD`

Many applications store files both locally and in the cloud. For this reason, you may specify a default "cloud" driver here. This driver will be bound as the Cloud disk implementation in the container. Defaults to `"s3"`.

### S3

(Not listed on Admin > Diagnostics.)

#### `AWS_ACCESS_KEY_ID`

(Not listed on Admin > Diagnostics.)

#### `AWS_SECRET_ACCESS_KEY`

(Not listed on Admin > Diagnostics.)

#### `AWS_DEFAULT_REGION`

(Not listed on Admin > Diagnostics.)

#### `AWS_BUCKET`

(Not listed on Admin > Diagnostics.)

#### `AWS_URL`

(Not listed on Admin > Diagnostics.)

#### `AWS_ENDPOINT`

(Not listed on Admin > Diagnostics.)

#### `AWS_USE_PATH_STYLE_ENDPOINT`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### SPACES

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_KEY`

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_SECRET`

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_ENDPOINT`

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_REGION`

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_BUCKET`

(Not listed on Admin > Diagnostics.)

#### `DO_SPACES_ROOT`

(Not listed on Admin > Diagnostics.)

### BACKUP

(Not listed on Admin > Diagnostics.)

#### `PF_BACKUP_DRIVER`

(Not listed on Admin > Diagnostics.) Defaults to `"s3"`.

#### `PF_BACKUP_ROOT`

(Not listed on Admin > Diagnostics.) Defaults to `"/"`.

#### `PF_BACKUP_KEY`

(Not listed on Admin > Diagnostics.)

#### `PF_BACKUP_SECRET`

(Not listed on Admin > Diagnostics.)

#### `PF_BACKUP_ENDPOINT`

(Not listed on Admin > Diagnostics.)

#### `PF_BACKUP_REGION`

(Not listed on Admin > Diagnostics.)

#### `PF_BACKUP_BUCKET`

(Not listed on Admin > Diagnostics.)

## HASHIDS

(Not listed on Admin > Diagnostics.)

### `APP_HASHID_SALT`

(Not listed on Admin > Diagnostics.) Defaults to `"v3MsJ1Hgnlma8YPrD3f4sW6vAn6zLnkuh6vOpKnR5IKkLqDGIk7TCADS2igpEN4ADrtXkkzV2E8HBfzpz7BreDzQqVOYDMeb4cJ1xhDhDwDeicZVUPyrxihHDaMWpTsP"`.

## HASHING

This option controls the default hash driver that will be used to hash passwords for your application. By default, the bcrypt algorithm is used; however, you remain free to modify this option if you wish. Possible drivers are `bcrypt` and `argon`, but this requires manual editing of `driver` (which is hardcoded as `bcrypt`).

### BCRYPT

#### `BCRYPT_COST`

How many rounds of hashing to use. Defaults to `10`.

### ARGON

(Not listed on Admin > Diagnostics.)

#### `ARGON_MEM`

(Not listed on Admin > Diagnostics.) Defaults to `1024`.

#### `ARGON_THREADS`

(Not listed on Admin > Diagnostics.) Defaults to `2`.

#### `ARGON_TIME`

(Not listed on Admin > Diagnostics.) Defaults to `2`.

## HORIZON

### `HORIZON_PREFIX`

This prefix will be used when storing all Horizon data in Redis. You may modify the prefix when you are running multiple installations of Horizon on the same server so that they don't have problems. Defaults to `"horizon-"`.

### `HORIZON_MEMORY_LIMIT` (MB)

This value describes the maximum amount of memory (in MB) the Horizon worker may consume before it is terminated and restarted. You should set this value according to the resources available to your server. Defaults to `64`.

### `HORIZON_BALANCE_STRATEGY`

Defaults to `"auto"`.

### `HORIZON_MIN_PROCESSES`

Defaults to `1`.

### `HORIZON_MAX_PROCESSES`

Defaults to `20`.

### `HORIZON_SUPERVISOR_MEMORY`

Defaults to `64`.

### `HORIZON_SUPERVISOR_TRIES`

Defaults to `3`.

### `HORIZON_SUPERVISOR_NICE`

Defaults to `0`.

### `HORIZON_SUPERVISOR_TIMEOUT`

Defaults to `300`.

### `HORIZON_DARKMODE`

Defaults to `false`.

## IMAGE

### `IMAGE_DRIVER`

Pixelfed supports [GD](https://libgd.github.io/) or [ImageMagick](https://imagemagick.org/) to process images. Defaults to `gd`. Set `IMAGE_DRIVER=imagick` to use ImageMagick instead.

## INSTANCE

### `FORCE_HTTPS_URLS`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `INSTANCE_DESCRIPTION`

Defaults to `"Pixelfed - Photo sharing for everyone"`.

### `INSTANCE_CONTACT_FORM`

Defaults to `false`.

### `INSTANCE_CONTACT_MAX_PER_DAY`

Defaults to `1`.

### `INSTANCE_DISCOVER_PUBLIC`

Defaults to `false`.

### `EXP_LOOPS`

See [`EXP`](#exp), although here it actually is used. Defaults to `false`.

### `INSTANCE_PUBLIC_HASHTAGS`

Defaults to `false`.

### `INSTANCE_CONTACT_EMAIL`

Defaults to `""`.

### `PF_HOME_TIMELINE_CACHE`

Defaults to `false`.

### `PF_HOME_TIMELINE_CACHE_TTL`

Defaults to `900`.

### `INSTANCE_PUBLIC_LOCAL_TIMELINE`

Defaults to `false`.

### `INSTANCE_NETWORK_TIMELINE_CACHED`

Defaults to `true`. Only used when [`PF_NETWORK_TIMELINE`](#pf_network_timeline) is `true`.

### `INSTANCE_NETWORK_TIMELINE_CACHE_DROPOFF`

Defaults to `100`.

### `INSTANCE_NETWORK_TIMELINE_CACHE_MAX_HOUR_INGEST`

Defaults to `6`.

### `PAGE_404_HEADER`

Defaults to `"Sorry, this page isn't available."`.

### `PAGE_404_BODY`

Defaults to `""The link you followed may be broken, or the page may have been removed. <a href="/">Go back to Pixelfed.</a>""`.

### `PAGE_503_HEADER`

Defaults to `"Service Unavailable"`.

### `PAGE_503_BODY`

Defaults to `"Our service is in maintenance mode, please try again later."`.

### `BANNED_USERNAMES`

Defaults to `""`.

### `USERNAME_REMOTE_FORMAT`

Possible values:

- `"@"` (default)
- `"from"`
- `"custom"`

### `USERNAME_REMOTE_CUSTOM_TEXT`

Used when `USERNAME_REMOTE_FORMAT="custom"`. Defaults to `null`.

### `STORIES_ENABLED`

Defaults to `false`.

### `RESTRICTED_INSTANCE`

Defaults to `false`. Level is hardcoded to `1`.

### `OAUTH_TOKEN_DAYS`

Defaults to `365`.

### `OAUTH_REFRESH_DAYS`

Defaults to `400`.

### `OAUTH_PAT_ENABLED`

Defaults to `false`.

### `OAUTH_PAT_ID`

Defaults to `""`.

### `ENABLE_COVID_LABEL`

Defaults to `true`.

### `COVID_LABEL_URL`

Defaults to `"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"`.

### `COVID_LABEL_ORG`

Defaults to `"visit the WHO website"`.

### `ENABLE_CONFIG_CACHE`

Whether Admin > Settings can be used to override your `.env`. Defaults to `false`.

### `INSTANCE_LEGAL_NOTICE`

Defaults to `false`.

### `INSTANCE_PROFILE_EMBEDS`

Defaults to `true`.

### `INSTANCE_POST_EMBEDS`

Defaults to `true`.

### `PF_HIDE_NSFW_ON_PUBLIC_FEEDS`

Defaults to `false`.

### `PF_LOCAL_AVATAR_TO_CLOUD`

Defaults to `false`.

### `PF_ADMIN_INVITES_ENABLED`

Defaults to `true`.

## LDAP

Here you may specify which of the LDAP connections below you wish to use as your default connection for all LDAP operations. Of course you may add as many connections you'd like below.

### `LDAP_CONNECTION`

Defaults to `"default"`.

### DEFAULT

(Not listed on Admin > Diagnostics.)

#### `LDAP_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `"127.0.0.1"`.

#### `LDAP_USERNAME`

(Not listed on Admin > Diagnostics.) Defaults `"cn=user,dc=local,dc=com"`.

#### `LDAP_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `"secret"`.

#### `LDAP_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `389`.

#### `LDAP_BASE_DN`

(Not listed on Admin > Diagnostics.) Defaults to `"dc=local,dc=com"`.

#### `LDAP_TIMEOUT`

(Not listed on Admin > Diagnostics.) Defaults to `5`.

#### `LDAP_SSL`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

#### `LDAP_TLS`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### `LDAP_LOGGING`

When LDAP logging is enabled, all LDAP search and authentication operations are logged using the default application logging driver. This can assist in debugging issues and more. Defaults to `true`.

### CACHE

LDAP caching enables the ability of caching search results using the
query builder. This is great for running expensive operations that
may take many seconds to complete, such as a pagination request.

#### `LDAP_CACHE`

Defaults to `false`.

#### `CACHE_DRIVER`

See [`CACHE`](#cache). Defaults to `"file"`.

## LIVESTREAMING

(Not listed on Admin > Diagnostics.)

### `HLS_LIVE`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### `HLS_LIVE_HOST`

(Not listed on Admin > Diagnostics.) Defaults to `APP_DOMAIN` or `"localhost"`.

### `HLS_LIVE_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `1935`.

### `HLS_LIVE_PATH`

(Not listed on Admin > Diagnostics.) Defaults to `"live"`.

### `HLS_LIVE_BROADCAST_DELETE_TOKEN_AFTER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `HLS_LIVE_BROADCAST_MAX_DURATION`

(Not listed on Admin > Diagnostics.) Defaults to `60`.

### `HLS_LIVE_BROADCAST_MAX_ACTIVE`

(Not listed on Admin > Diagnostics.) Defaults to `10`.

### `HLS_LIVE_BROADCAST_LIMITS`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `HLS_LIVE_BROADCAST_LIMITS_MIN_FOLLOWERS`

(Not listed on Admin > Diagnostics.) Defaults to `100`.

### `HLS_LIVE_BROADCAST_LIMITS_MIN_ACCOUNT_AGE`

(Not listed on Admin > Diagnostics.) Defaults to `14`.

### `HLS_LIVE_BROADCAST_LIMITS_ADMINS_ONLY`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `HLS_LIVE_BROADCAST_SOURCE_APP`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### `HLS_LIVE_BROADCAST_SOURCE_WEB`

(Not listed on Admin > Diagnostics.) Defaults to `false`.

### `HLS_LIVE_COMMENTS_MAX_FALLOFF`

(Not listed on Admin > Diagnostics.) Defaults to `50`.

## LOGGING

### `LOG_CHANNEL`

Possible values:

- `"stack"` (default)
- `"single"`
- `"daily"`
- `"slack"`
- `"stderr"`
- `"syslog"`
- `"errorlog"`
- `"null"`
- `"emergency"`
- `"media"`

### `LOG_LEVEL`

Used by `single`, `stderr` and `syslog`. Defaults to `"debug"` for all of those.

### `LOG_SLACK_WEBHOOK_URL`

(Not listed on Admin > Diagnostics.) Used by `slack`. Defaults to `""`.

### `LOG_STDERR_FORMATTER`

(Not listed on Admin > Diagnostics.) Used by `stderr`. Defaults to `""`.

## MAIL

### `MAIL_DRIVER`

Laravel supports both SMTP and PHP's "mail" function as drivers for the sending of e-mail. You may specify which one you're using throughout your application here. Possible values:

- `"smtp"` (default)
- `"sendmail"`
- `"mailgun"`
- `"mandrill"`
- `"ses"`
- `"sparkpost"`
- `"log"`
- `"array"`

### `MAIL_HOST`

Here you may provide the host address of the SMTP server used by your applications. A default option is provided that is compatible with the Mailgun mail service which will provide reliable deliveries. Defaults to `"smtp.mailgun.org"`.

### `MAIL_PORT`

This is the SMTP port used by your application to deliver e-mails to users of the application. Like the host we have set this value to stay compatible with the Mailgun e-mail application by default. Defaults to `587`.

### `MAIL_FROM_ADDRESS`

You may wish for all e-mails sent by your application to be sent from the same address. Here, you may specify a name and address that is used globally for all e-mails that are sent by your application. Defaults to `"hello@example.com"`.

### `MAIL_FROM_NAME`

Defaults to `"Example"`.

### `MAIL_ENCRYPTION`

Here you may specify the encryption protocol that should be used when the application send e-mail messages. A sensible default using the transport layer security protocol should provide great security. Defaults to `"tls"`.

### `MAIL_USERNAME`

(Not listed on Admin > Diagnostics.) If your SMTP server requires a username for authentication, you should set it here. This will get used to authenticate with your server on connection. You may also set the "password" value below this one. Defaults to `""`.

### `MAIL_PASSWORD`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

## MEDIA

### `MEDIA_DELETE_LOCAL_AFTER_CLOUD`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `MEDIA_EXIF_DATABASE`

Defaults to `false`.

## PASSPORT

(Not listed on Admin > Diagnostics.) Passport uses encryption keys while generating secure access tokens for your application. By default, the keys are stored as local files but can be set via environment variables when that is more convenient.

### `PASSPORT_PRIVATE_KEY`

(Not listed on Admin > Diagnostics.)

### `PASSPORT_PUBLIC_KEY`

(Not listed on Admin > Diagnostics.)

## PIXELFED

### `ADMIN_DOMAIN`

Application domains used for routing.

### `APP_DOMAIN`

Application domains used for routing.

### `MEMORY_LIMIT`

This `memory_limit` value is only used for image processing. The default `memory_limit` in `php.ini` is used for the rest of the app. Defaults to `"1024M"`.

### `OPEN_REGISTRATION`

Enable/disable new local account registrations. Defaults to `true`.

### `MAX_ACCOUNT_SIZE` (kB)

Update the max account size, the per user limit of files in kB. Defaults to `1000000` (1GB).

### `MAX_PHOTO_SIZE` (kB)

Update the max photo size, in kB. Defaults to `15000` (15MB).

### `MAX_AVATAR_SIZE` (kB)

Update the max avatar size, in kB. Defaults to `2000` (2MB).

### `MAX_CAPTION_LENGTH`

Change the caption length limit for new local posts. Defaults to `500`.

### `MAX_BIO_LENGTH`

Change the bio length limit for user profiles. Defaults to `125`.

### `MAX_NAME_LENGTH`

Change the length limit for user names. Defaults to `30`.

### `MIN_PASSWORD_LENGTH`

Change the minimum length limit for user passwords. Defaults to `8`.

### `MAX_ALBUM_LENGTH`

The max number of photos allowed per post. Defaults to `4`.

### `ENFORCE_EMAIL_VERIFICATION`

Require email verification before a new user can do anything. Defaults to `true`.

### `IMAGE_QUALITY`

Set the image optimization quality, must be a value between 1-100. Defaults to `80`.

### `ACCOUNT_DELETION`

Enable account deletion. Defaults to `true`.

### `ACCOUNT_DELETE_AFTER`

Set account deletion queue after X days, set to false to delete accounts immediately. Defaults to `false`.

### `PF_ENABLE_CLOUD`

Store media on object storage like S3, Digital Ocean Spaces, Rackspace Defaults to `false`.

### `PF_MAX_USERS`

Allow a maximum number of user accounts. Defaults to `false`.

### `PF_OPTIMIZE_IMAGES`

Resize and optimize image uploads. Defaults to `true`.

### `PF_OPTIMIZE_VIDEOS`

Resize and optimize video uploads. Defaults to `true`.

### `PF_USER_INVITES`

Allow users to invite others via email. Will respect max user limit and prevent invites after the limit is reached. Defaults to `false`.

### `PF_USER_INVITES_TOTAL_LIMIT`

Defaults to `0`.

### `PF_USER_INVITES_DAILY_LIMIT`

Defaults to `0`.

### `PF_USER_INVITES_MONTHLY_LIMIT`

Defaults to `0`.

### `PF_MAX_COLLECTION_LENGTH`

Defaults to `100`.

### `MEDIA_TYPES`

Defaults to `"image/jpeg,image/png,image/gif"`.

### `LIMIT_ACCOUNT_SIZE`

Defaults to `true`.

### `IMPORT_INSTAGRAM`

Defaults to `false`.

### `IMPORT_INSTAGRAM_POST_LIMIT`

Defaults to `100`.

### `IMPORT_INSTAGRAM_SIZE_LIMIT`

Defaults to `5000`.

### `OAUTH_ENABLED`

Defaults to `false`.

### `PF_BOUNCER_ENABLED`

Defaults to `false`.

### `PF_MEDIA_FAST_PROCESS`

Don't require photos & video to finish optimization & upload to S3 if enabled before posting. If disabled users will have to wait until processed before posting, sacrificing the user experience to ensure media is federated using S3 urls (if enabled). Defaults to `true`.

### `PF_MEDIA_MAX_ALTTEXT_LENGTH`

Defaults to `1000`.

### `PF_ALLOW_APP_REGISTRATION`

Defaults to `true`.

## PORTFOLIO

(Not listed on Admin > Diagnostics.)

### `PORTFOLIO_DOMAIN`

(Not listed on Admin > Diagnostics.) This value is the domain used for the portfolio feature. Only change the default value if you have a subdomain configured. You must use a subdomain on the same app domain. Defaults to `APP_DOMAIN`.

### `PORTFOLIO_PATH`

(Not listed on Admin > Diagnostics.) This value is the path used for the portfolio feature. Only change the default value if you have a subdomain configured. If you want to use the root path of the subdomain, leave this value empty.

WARNING: SETTING THIS VALUE WITHOUT A SUBDOMAIN COULD BREAK YOUR INSTANCE, SO ONLY CHANGE THIS IF YOU KNOW WHAT YOU'RE DOING.

Defaults to `"/i/portfolio"`.

## PURIFY

### `RESTRICT_HTML_TYPES`

Defaults to `true`.

## QUEUE

### `QUEUE_DRIVER`

- `"sync"` (default)
- `"database"`
- `"beanstalkd"`
- `"sqs"`
- `"redis"`
- `"null"`

### SQS

(Not listed on Admin > Diagnostics.)

#### `SQS_KEY`

(Not listed on Admin > Diagnostics.) Defaults to `"your-public-key"`.

#### `SQS_SECRET`

(Not listed on Admin > Diagnostics.) Defaults to `"your-secret-key"`.

#### `SQS_PREFIX`

(Not listed on Admin > Diagnostics.) Defaults to `"https://sqs.us-east-1.amazonaws.com/your-account-id"`.

#### `SQS_QUEUE`

(Not listed on Admin > Diagnostics.) Defaults to `"your-queue-name"`.

#### `SQS_REGION`

(Not listed on Admin > Diagnostics.) Defaults to `"us-east-1"`.

### DB_CONNECTION

(Not listed on Admin > Diagnostics.) See [`DB_CONNECTION`](#db_connection). These options configure the behavior of failed queue job logging so you can control which database and table are used to store the jobs that have failed. You may change them to any database / table you wish. Defaults to `"mysql"`.

## SERVICES

(Not listed on Admin > Diagnostics.)

### MAILGUN

(Not listed on Admin > Diagnostics.)

#### `MAILGUN_DOMAIN`

(Not listed on Admin > Diagnostics.)

#### `MAILGUN_SECRET`

(Not listed on Admin > Diagnostics.)

### SES

(Not listed on Admin > Diagnostics.)

#### `SES_KEY`

(Not listed on Admin > Diagnostics.)

#### `SES_SECRET`

(Not listed on Admin > Diagnostics.)

#### `SES_REGION`

(Not listed on Admin > Diagnostics.) Defaults to `"us-east-1"`.

### SPARKPOST

(Not listed on Admin > Diagnostics.)

#### `SPARKPOST_SECRET`

(Not listed on Admin > Diagnostics.)

### STRIPE

(Not listed on Admin > Diagnostics.)

#### `STRIPE_KEY`

(Not listed on Admin > Diagnostics.)

#### `STRIPE_SECRET`

(Not listed on Admin > Diagnostics.)

## SESSION

### `SESSION_DRIVER`

This option controls the default session "driver" that will be used on requests. By default, we will use the lightweight native driver but you may specify any of the other wonderful drivers provided here.

- `"file"`
- `"cookie"`
- `"database"` (default)
- `"apc"`
- `"memcached"`
- `"redis"`
- `"array"`

### `SESSION_LIFETIME`

Here you may specify the number of minutes that you wish the session to be allowed to remain idle before it expires. If you want them to immediately expire on the browser closing, set that option. Defaults to `86400`.

### `SESSION_DOMAIN`

Here you may change the domain of the cookie used to identify a session in your application. This will determine which domains the cookie is available to in your application. A sensible default has been set. Defaults to the value of `APP_DOMAIN`, or `null`.

## TELESCOPE

(Not listed on Admin > Diagnostics.)

### `TELESCOPE_DRIVER`

(Not listed on Admin > Diagnostics.) This configuration options determines the storage driver that will be used to store Telescope's data. In addition, you may set any custom options as needed by the particular driver you choose. Defaults to `"database"`.

### `TELESCOPE_ENABLED`

(Not listed on Admin > Diagnostics.) This option may be used to disable all Telescope watchers regardless of their individual configuration, which simply provides a single and convenient way to enable or disable Telescope data storage. Defaults to `false`.

### `TELESCOPE_CACHE_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_COMMAND_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_DUMP_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_EVENT_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_EXCEPTION_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_JOB_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_LOG_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_MAIL_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_MODEL_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_NOTIFICATION_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_QUERY_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_REDIS_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_REQUEST_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_RESPONSE_SIZE_LIMIT`

(Not listed on Admin > Diagnostics.) Defaults to `64`.

### `TELESCOPE_GATE_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

### `TELESCOPE_SCHEDULE_WATCHER`

(Not listed on Admin > Diagnostics.) Defaults to `true`.

## TRUSTEDPROXY

### `TRUST_PROXIES`

Set trusted proxy IP addresses.

Both IPv4 and IPv6 addresses are supported, along with CIDR notation.

The "*" character is syntactic sugar within TrustedProxy to trust any proxy that connects directly to your server, a requirement when you cannot know the address of your proxy (e.g. if using Rackspace balancers).

The "**" character is syntactic sugar within TrustedProxy to trust not just any proxy that connects directly to your server, but also proxies that connect to those proxies, and all the way back until you reach the original source IP. It will mean that $request->getClientIp() always gets the originating client IP, no matter how many proxies that client's request has subsequently passed through.

Defaults to `"*"`.

## WEBSOCKETS

(Not listed on Admin > Diagnostics.)

### DASHBOARD SETTINGS

(Not listed on Admin > Diagnostics.) You can configure the dashboard settings from here.

#### `LARAVEL_WEBSOCKETS_PORT`

(Not listed on Admin > Diagnostics.) Defaults to `6001`.

#### `LARAVEL_WEBSOCKETS_DOMAIN`

(Not listed on Admin > Diagnostics.) Defaults to `""`.

#### `LARAVEL_WEBSOCKETS_PATH`

(Not listed on Admin > Diagnostics.) Defaults to `"laravel-websockets"`.

### APPLICATIONS REPOSITORY

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_ID`

(Not listed on Admin > Diagnostics.) See [PUSHER](#pusher).

#### `APP_NAME`

(Not listed on Admin > Diagnostics.) See [APP](#app).

#### `PUSHER_APP_HOST`

(Not listed on Admin > Diagnostics.)

#### `PUSHER_APP_KEY`

(Not listed on Admin > Diagnostics.) See [PUSHER](#pusher).

#### `PUSHER_APP_SECRET`

(Not listed on Admin > Diagnostics.) See [PUSHER](#pusher).

#### `PUSHER_APP_PATH`

(Not listed on Admin > Diagnostics.)

### BROADCASTING REPLICATION PUBSUB

(Not listed on Admin > Diagnostics.) You can enable replication to publish and subscribe to messages across the driver.

By default, it is set to `"local"`, but you can configure it to use drivers like Redis to ensure connection between multiple instances of WebSocket servers. Just set the driver to `"redis"` to enable the PubSub using Redis.

#### `WEBSOCKETS_REPLICATION_MODE`

(Not listed on Admin > Diagnostics.) Defaults to `"local"`.

#### `WEBSOCKETS_REDIS_REPLICATION_CONNECTION`

(Not listed on Admin > Diagnostics.) See [REDIS](#redis). Defaults to `"default"`.

### SSL CONFIGURATION

(Not listed on Admin > Diagnostics.) By default, the configuration allows only on HTTP. For SSL, you need to set up the the certificate, the key, and optionally, the passphrase for the private key. You will need to restart the server for the settings to take place.

#### `LARAVEL_WEBSOCKETS_SSL_LOCAL_CERT`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

#### `LARAVEL_WEBSOCKETS_SSL_CA`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

#### `LARAVEL_WEBSOCKETS_SSL_LOCAL_PK`

(Not listed on Admin > Diagnostics.) Defaults to `null`.

#### `LARAVEL_WEBSOCKETS_SSL_PASSPHRASE`

(Not listed on Admin > Diagnostics.) Defaults to `null`.
