
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

## app
### `APP_NAME`
`Pixelfed`
### `APP_ENV`
`production`
### `APP_DEBUG`
`false`
### `APP_URL`
`https://localhost`
### `APP_TIMEZONE`
`UTC`
### `APP_LOCALE`
`en`
### `APP_FALLBACK_LOCALE`
`en`
### `APP_KEY`
A random 32-character string to be used as an encryption key. No default value; use `php artisan key:generate` to generate.

## broadcasting
### `BROADCAST_DRIVER`
Possible values:
- `pusher`
- `redis`
- `log`
- `null` (default)
### `PUSHER_APP_KEY`
### `PUSHER_APP_SECRET`
### `PUSHER_APP_ID`
### `PUSHER_APP_CLUSTER`



## cache
### `CACHE_DRIVER`
Defaults to `file`.
### `CACHE_PREFIX`
Defaults to `APP_NAME_cache`, or `laravel_cache` if no `APP_NAME` is set.
### `MEMCACHED_PERSISTENT_ID`
### `MEMCACHED_USERNAME`
### `MEMCACHED_PASSWORD`
### `MEMCACHED_HOST`
`127.0.0.1`
### `MEMCACHED_PORT`
`11211`
### `REDIS_CLIENT`
`predis`
### `REDIS_SCHEME`
`tcp`
### `REDIS_PATH`
No default value.
### `REDIS_HOST`
`localhost`
### `REDIS_PASSWORD`
`null`
### `REDIS_PORT`
`6379`
### `REDIS_DATABASE`
`0`

## costar
### `CS_BLOCKED_DOMAINS`
Comma-separated list of domains to block. Defaults to `null`.
### `CS_CW_DOMAINS`
Comma-separated list of domains to add warnings. Defaults to `null`.
### `CS_UNLISTED_DOMAINS`
Comma-separated list of domains to remove from public timelines. Defaults to `null`.
### `CS_BLOCKED_KEYWORDS`
Comma-separated list of keywords to block. Defaults to `null`.
### `CS_CW_KEYWORDS`
Comma-separated list of keywords to add warnings. Defaults to `null`.
### `CS_UNLISTED_KEYWORDS`
Comma-separated list of keywords to remove from public timelines. Defaults to `null`.
### `CS_BLOCKED_ACTOR`
### `CS_CW_ACTOR`
### `CS_UNLISTED_ACTOR`

## database
### `DB_CONNECTION`
Sets the database driver. Defaults to `mysql`.
### `DB_DATABASE`
When using `sqlite` for `DB_CONNECTION`. Defaults to `database.sqlite`
### `DB_HOST`
Defaults to `127.0.0.1` when using `mysql` or `pgsql` for `DB_CONNECTION`, or `localhost` when using `sqlsrv`.
### `DB_PORT`
Defaults to `3306` for `mysql`, `5432` for `pgsql`, or `1433` for `sqlsrv`.
### `DB_DATABASE`
Defaults to `forge`
### `DB_USERNAME`
Defaults to `forge`
### `DB_PASSWORD`
Defaults to an empty string.
### `DB_SOCKET`
Defaults to an empty string.
### `REDIS_CLIENT`
`predis`
### `REDIS_SCHEME`
`tcp`
### `REDIS_PATH`
No default value.
### `REDIS_HOST`
`127.0.0.1`
### `REDIS_PASSWORD`
`null`
### `REDIS_PORT`
`6379`
### `REDIS_DATABASE`
`0`

## exp
### `EXP_LC`
`false`
### `EXP_REC`
`false`
### `EXP_LOOPS`
`false`

## federation
### `ACTIVITY_PUB`
`false`
### `AP_OUTBOX`
`true`
### `AP_INBOX`
`true`
### `AP_SHARED_INBOX`
`false`
### `AP_REMOTE_FOLLOW`
`false`
### `ACTIVITYPUB_DELIVERY_TIMEOUT`
`2.0`
### `ACTIVITYPUB_DELIVERY_CONCURRENCY`
`10`
### `AP_LOGGER_ENABLED`
`false`
### `ATOM_FEEDS`
`true`
### `NODEINFO`
`true`
### `WEBFINGER`
`true`

## filesystem
### `FILESYSTEM_DRIVER`
`local`
### `FILESYSTEM_CLOUD`
`s3`
### `AWS_ACCESS_KEY_ID`
### `AWS_SECRET_ACCESS_KEY`
### `AWS_DEFAULT_REGION`
### `AWS_BUCKET`
### `AWS_URL`
### `AWS_ENDPOINT`
### `AWS_USE_PATH_STYLE_ENDPOINT`
`false`
### `DO_SPACES_KEY`
### `DO_SPACES_SECRET`
### `DO_SPACES_ENDPOINT`
### `DO_SPACES_REGION`
### `DO_SPACES_BUCKET`
### `DO_SPACES_ROOT`
`/`

## hashids
### `APP_HASHID_SALT`
`v3MsJ1Hgnlma8YPrD3f4sW6vAn6zLnkuh6vOpKnR5IKkLqDGIk7TCADS2igpEN4ADrtXkkzV2E8HBfzpz7BreDzQqVOYDMeb4cJ1xhDhDwDeicZVUPyrxihHDaMWpTsP`

## hashing
Possible drivers are `bcrypt` and `argon`, but this requires manual editing of `driver` (which is hardcoded as `bcrypt`).
### `BCRYPT_COST`
How many rounds of hashing to use. Defaults to `10`.
### `ARGON_MEM`
`1024`
### `ARGON_THREADS`
`2`
### `ARGON_TIME`
`2`

## horizon
### `HORIZON_PREFIX`
Defaults to `horizon-xxxxxxxx:`, where `xxxxxxxx` is a random 8-character string.
### `HORIZON_DARKMODE`
`false`

## image
### `IMAGE_DRIVER`
Pixelfed supports GD or ImageMagick to process images. Defaults to `gd`. Set `IMAGE_DRIVER='imagick'` to use ImageMagick instead.

## instance
### `INSTANCE_DESCRIPTION`
`null`
### `INSTANCE_CONTACT_FORM`
`false`
### `INSTANCE_CONTACT_MAX_PER_DAY`
`1`
### `EXP_LOOPS`
`false`
### `INSTANCE_PUBLIC_HASHTAGS`
`false`
### `INSTANCE_CONTACT_EMAIL`
No default value.
### `INSTANCE_PUBLIC_LOCAL_TIMELINE`
`false`
### `PAGE_404_HEADER`
`'Sorry, this page isn\'t available.'`
### `PAGE_404_BODY`
### `PAGE_503_HEADER`
### `PAGE_503_BODY`
### `BANNED_USERNAMES`
### `USERNAME_REMOTE_FORMAT`
### `USERNAME_REMOTE_CUSTOM_TEXT`
### `STORIES_ENABLED`
`false`
### `RESTRICTED_INSTANCE`
`false`. Level is hardcoded to `1`.
### `OAUTH_PAT_ENABLED`
`false`
### `OAUTH_PAT_ID`
No default value.

## logging
### `LOG_CHANNEL`
Possible values:
- `single`
- `daily`
- `slack`
- `syslog`
- `errorlog`
- `monolog`
- `custom`
- `stack` (default)
### `LOG_SLACK_WEBHOOK_URL`
No default value.

## mail
### `MAIL_DRIVER`
Possible values:
- `smtp` (default)
- `sendmail`
- `mailgun`
- `mandrill`
- `ses`
- `sparkpost`
- `log`
- `array`
### `MAIL_HOST`
`smtp.mailgun.org`
### `MAIL_PORT`
`587`
### `MAIL_FROM_ADDRESS`
`hello@example.com`
### `MAIL_FROM_NAME`
`Example`
### `MAIL_ENCRYPTION`
`tls`
### `MAIL_USERNAME`
No default value.
### `MAIL_PASSWORD`
No default value.

## media
### `MEDIA_EXIF_DATABASE`
`false`

## passport
By default, encryption keys are stored as local files, but can be set as environment variables if that is more convenient.
### `PASSPORT_PRIVATE_KEY`
### `PASSPORT_PUBLIC_KEY`

## pixelfed
### `ADMIN_DOMAIN`
### `APP_DOMAIN`
### `MEMORY_LIMIT`
`1024M`
### `OPEN_REGISTRATION`
`true`
### `MAX_ACCOUNT_SIZE`
Per-user file-size limit in KB. Defaults to `1000000` (1GB).
### `MAX_PHOTO_SIZE`
Per-file file-size limit in KB. Defaults to `15000` (15MB).
### `MAX_AVATAR_SIZE`
`2000` (2MB)
### `MAX_CAPTION_LENGTH`
`500`
### `MAX_BIO_LENGTH`
`125`
### `MAX_NAME_LENGTH`
`30`
### `MAX_ALBUM_LENGTH`
`4`
### `ENFORCE_EMAIL_VERIFICATION`
`true`
### `IMAGE_QUALITY`
0-100 value for optimization level. Defaults to `80`.
### `ACCOUNT_DELETION`
`true`
### `ACCOUNT_DELETE_AFTER`
Queue account deletion for X days. Defaults to `false`, i.e., immediately.
### `PF_ENABLE_CLOUD`
`false`
### `PF_MAX_USERS`
`false`
### `PF_OPTIMIZE_IMAGES`
`true`
### `PF_OPTIMIZE_VIDEOS`
`true`
### `PF_USER_INVITES`
`false`
### `PF_USER_INVITES_TOTAL_LIMIT`
`0`
### `PF_USER_INVITES_DAILY_LIMIT`
`0`
### `PF_USER_INVITES_MONTHLY_LIMIT`
`0`
### `MEDIA_TYPES`
`'image/jpeg,image/png,image/gif'`
### `LIMIT_ACCOUNT_SIZE`
`true`
### `IMPORT_INSTAGRAM`
`false`
### `IMPORT_INSTAGRAM_POST_LIMIT`
`100`
### `IMPORT_INSTAGRAM_SIZE_LIMIT`
`5000`
### `OAUTH_ENABLED`
`false`
### `ADMIN_ENV_EDITOR`
`false

## purify
### `RESTRICT_HTML_TYPES`
`true`

## queue
### `QUEUE_DRIVER`
- `sync` (default)
- `database`
- `beanstalkd`
- `sqs`
- `redis`
- `null`
### `SQS_KEY`
`your-public-key`
### `SQS_SECRET`
`your-secret-key`
### `SQS_PREFIX`
`https://sqs.us-east-1.amazonaws.com/your-account-id`
### `SQS_QUEUE`
`your-queue-name`
### `SQS_REGION`
`us-east-1`
### DB_CONNECTION
`mysql`

## services
### `MAILGUN_DOMAIN`
### `MAILGUN_SECRET`
### `SES_KEY`
### `SES_SECRET`
### `SES_REGION`
`us-east-1`
### `SPARKPOST_SECRET`
### `STRIPE_KEY`
### `STRIPE_SECRET`

## session
### `SESSION_DRIVER`
- `file`
- `cookie`
- `database` (default)
- `apc`
- `memcached`
- `redis`
- `array`
### `SESSION_LIFETIME`
`86400`
### `SESSION_DOMAIN`
Defaults to the value of `APP_DOMAIN`, or null.

## trustedproxy
### `TRUST_PROXIES`
Defaults to empty string.

## websockets
### `PUSHER_APP_ID`
### `APP_NAME`
### `PUSHER_APP_KEY`
### `PUSHER_APP_SECRET`
### `WSS_CM`
### `WSS_STATS`
### `WSS_LOCAL_CERT`
### `WSS_LOCAL_PK`
### `WSS_PASSPHRASE`
### `WSS_VERIFY_PEER`
