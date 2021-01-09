# Konfiguracija

Sve konfiguracijske datoteke nalaze se u `config/` folderu vaše Pixelfed instalacije. Ovo su varijable od enviorment-a koje možete postaviti u datoteci `.env`; imajte na umu da se neke varijable trenutno ne koriste i ne rade ništa.

::: tip Sažetak važnih varijabli
Za korisnički vodič kroz koje biste varijable okruženja možda željeli postaviti, pogledajte [installation guide](../running-pixelfed/installation.md#configure-environment-variables).
:::

[[toc]]

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
Slučajni niz od 32 znaka koji će se koristiti kao ključ za šifriranje. Nema zadane vrijednosti; koristite `php artisan key:generate` za generisanje.

## broadcasting
### `BROADCAST_DRIVER`
Moguće vrijednosti:
- `pusher`
- `redis`
- `log`
- `null` (zadano)
### `PUSHER_APP_KEY`
### `PUSHER_APP_SECRET`
### `PUSHER_APP_ID`
### `PUSHER_APP_CLUSTER`



## cache
### `CACHE_DRIVER`
Zadano na `file`.
### `CACHE_PREFIX`
Zadano na `APP_NAME_cache`, ili `laravel_cache` ako ne `APP_NAME` je stavit.
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
Lista domena koje treba odvojiti zarezom. Zadano je `null`.
### `CS_CW_DOMAINS`
Lista domena odvojenih zarezom za dodavanje upozorenja. Zadano je`null`.
### `CS_UNLISTED_DOMAINS`
Lista domena odvojenih zarezom za uklanjanje s javnih vremenskih traka. Zadano je `null`.
### `CS_BLOCKED_KEYWORDS`
Lista ključnih riječi odvojenih zarezom koje treba blokirati. Zadano je `null`.
### `CS_CW_KEYWORDS`
Lista ključnih riječi odvojenih zarezom za dodavanje upozorenja. Zadano je `null`.
### `CS_UNLISTED_KEYWORDS`
Popis ključnih riječi odvojenih zarezom za uklanjanje s javnih vremenskih linija. Zadano je `null`.
### `CS_BLOCKED_ACTOR`
### `CS_CW_ACTOR`
### `CS_UNLISTED_ACTOR`

## database
### `DB_CONNECTION`
Postavlja database driver. Zadano je`mysql`.
### `DB_DATABASE`
Kad koristite `sqlite` za `DB_CONNECTION`. Zadano je `database.sqlite`
### `DB_HOST`
Zadano je `127.0.0.1` kad koristite `mysql` ili `pgsql` za `DB_CONNECTION`, ili `localhost` kad koristite `sqlsrv`.
### `DB_PORT`
Zadano je `3306` za `mysql`, `5432` za `pgsql`, ili `1433` za `sqlsrv`.
### `DB_DATABASE`
Zadano je `forge`
### `DB_USERNAME`
Zadano je `forge`
### `DB_PASSWORD`
Zadan je prazan string.
### `DB_SOCKET`
Zadan je prazan string.
### `REDIS_CLIENT`
`predis`
### `REDIS_SCHEME`
`tcp`
### `REDIS_PATH`
nema zadane vrijednosti
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
Moguć driveri su `bcrypt` i `argon`, ali ovo zahtijeva ručno uređivanje `driver` (koji je hardkodiran kao `bcrypt`).
### `BCRYPT_COST`
Koliko rundi heširanja koristiti. Zadano je `10`.
### `ARGON_MEM`
`1024`
### `ARGON_THREADS`
`2`
### `ARGON_TIME`
`2`

## horizon
### `HORIZON_PREFIX`
Zadano je `horizon-xxxxxxxx:`, gdje `xxxxxxxx` ide jedan slučajni niz od 8 znakova.
### `HORIZON_DARKMODE`
`false`

## image
### `IMAGE_DRIVER`
Pixelfed podržava GD ili ImageMagick da procesira slike. Zadano je `gd`. Postavi `IMAGE_DRIVER='imagick'` da koristite ImageMagick.

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
Moguće vrijednosti:
- `single`
- `daily`
- `slack`
- `syslog`
- `errorlog`
- `monolog`
- `custom`
- `stack` (Zadano)
### `LOG_SLACK_WEBHOOK_URL`
Nije zadano.

## mail
### `MAIL_DRIVER`
Moguće vrijednosti:
- `smtp` (Zadano)
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
Nije zadano.
### `MAIL_PASSWORD`
Nije zadano.

## media
### `MEDIA_EXIF_DATABASE`
`false`

## passport
Ključevi za šifriranje se prema zadanim postavkama pohranjuju kao lokalne datoteke, ali se mogu postaviti kao varijable okruženja ako je to prikladnije.
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
Ograničenje veličine datoteke po korisniku u KB. Zadana vrijednost je `1000000` (1GB).
### `MAX_PHOTO_SIZE`
Ograničenje veličine datoteke po datoteci u KB. Zadana vrijednost je `15000` (15MB).
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
### ENFORCE_EMAIL_VERIFICATION
`true`
### `IMAGE_QUALITY`
Vrijednost 0-100 za nivo optimizacije. Zadana vrijednost je `80`.
### `ACCOUNT_DELETION`
`true`
### `ACCOUNT_DELETE_AFTER`
Brisanje računa u redu čekanja za X dana. Zadana vrijednost je "false", npr. istog trena.
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
Zadana vrijednost je "APP_DOMAIN" ili null.

## trustedproxy
### `TRUST_PROXIES`
Zadan je prazan string.

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
