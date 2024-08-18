---
title = "Pixelfed Configuration"
summary = "A list of configuration settings for Pixelfed"
weight = 20
[menu]
[menu.docs]
identifier = "admin/installation"
parent = "admin"
---

# Configuration

Pixelfed, a platform built on the Laravel framework, uses Laravel's efficient configuration system. Sensitive settings like database credentials are stored in a .env file, separate from the codebase for security. These values are then loaded into PHP configuration files (`config/*.php`) for easy access within the application. 

::: warning
Laravel also caches these configurations to improve performance, avoiding the need to read the .env file on every request. This is why you need to run `php artisan config:cache && php artisan cache:clear` after updating `.env` or `config/*.php` files
:::

This setup allows Pixelfed to manage its settings effectively across different environments (development, staging, production) while keeping sensitive data secure. Changes to the .env file may require clearing Laravel's configuration cache to ensure the application uses the updated values.

---

[[toc]]

## config/app.php

| .env key      | Default |  Description | Type |
| ------------- | :-----------: | :----: | :----: |
| APP_NAME | "Pixelfed" | The name of your server | String |
| APP_ENV | "production" | The app environment, keep it set to "production" | String |
| APP_URL | "https://localhost" | The app url of your server, used for generating urls. Should start with "https://" | String |
| APP_LOCALE | "en" | The locale of your server | String |

## config/instance.php

| .env key      | Default |  Description | Type |
| ------------- | :-----------: | :----: | :----: |
| FORCE_HTTPS_URLS | true | Force https url generation | Boolean |
| INSTANCE_DESCRIPTION | "Pixelfed - Photo sharing for everyone" | Your server description | String |
| INSTANCE_CONTACT_FORM | false | Enable the contact form | Boolean |
| INSTANCE_DISCOVER_PUBLIC | false | Enable public access to the Discover feature | Boolean |
| INSTANCE_PUBLIC_HASHTAGS | false | Allow anonymous access to hashtag feeds | Boolean |
| INSTANCE_CONTACT_EMAIL | NULL | The public contact email for your server | String |
| STORIES_ENABLED | false | Enable the Stories feature | Boolean |
| ENABLE_CONFIG_CACHE | true | Enable the config cache to allow you to manage settings via the admin dashboard | Boolean |
| INSTANCE_PROFILE_EMBEDS | true | Enable the profile embed feature | Boolean |
| INSTANCE_POST_EMBEDS | true | Enable the post embed feature | Boolean |
| PF_HIDE_NSFW_ON_PUBLIC_FEEDS | false | Hide sensitive posts from public/network feeds | Boolean |
| PF_LOCAL_AVATAR_TO_CLOUD | false | Store local avatars on S3 (Requires S3) | Boolean |
| PF_ADMIN_INVITES_ENABLED | true | Enable the Admin Invites feature | Boolean |
| PF_MAX_USER_BLOCKS | 50 | The max number of user blocks per account | Integer |
| PF_MAX_USER_MUTES | 50 | The max number of user mutes per account | Integer |
| PF_MAX_DOMAIN_BLOCKS | 50 | The max number of domain blocks per account | Integer |
| INSTANCE_REPORTS_EMAIL_ENABLED | false | Send a report email to the admin account for new autospam/reports | Boolean |
| INSTANCE_REPORTS_EMAIL_ADDRESSES | NULL | A comma separated list of email addresses to deliver admin reports to | String |
| INSTANCE_REPORTS_EMAIL_AUTOSPAM | false | Enable autospam reports (require INSTANCE_REPORTS_EMAIL_ENABLED) | Boolean |
| INSTANCE_LANDING_SHOW_DIRECTORY | true | Enable the profile directory on the landing page | Boolean |
| INSTANCE_LANDING_SHOW_EXPLORE | true | Enable the popular post explore on the landing page | Boolean |
| INSTANCE_CUR_REG | false | Enable Curated Registration | Boolean |
| INSTANCE_SHOW_PEERS | false | Enable the api/v1/peers API endpoint | Boolean |


## config/pixelfed.php

| .env key      | Default |  Description | Type |
| ------------- | :-----------: | :----: | :----: |
| APP_DOMAIN | NULL | The domain of your server, without `https://` | String |
| OPEN_REGISTRATION | true | Enable open registration for new accounts | Boolean |
| MAX_ACCOUNT_SIZE | 1000000 | The max allowed account size in KB | Integer |
| MAX_PHOTO_SIZE | 15000 | The max photo/video size in KB | Integer |
| MAX_AVATAR_SIZE | 2000 | The max user avatar size in KB | Integer |
| MAX_CAPTION_LENGTH | 500 | The max post caption length | Integer |
| MAX_BIO_LENGTH | 125 | The max user bio length | Integer |
| MAX_NAME_LENGTH | 30 | The max user display name length | Integer |
| MIN_PASSWORD_LENGTH | 8 | The min password length | Integer |
| MAX_ALBUM_LENGTH | 4 | The max number of media per post album | Integer |
| ENFORCE_EMAIL_VERIFICATION | true | Enforce email verification | Boolean |
| IMAGE_QUALITY | 80 | Set the image optimization quality, between 1-100. Lower uses less space, higher more quality | Integer |
| ACCOUNT_DELETION | true | Enable account deletion (may be a requirement in some jurisdictions) | Integer |
| PF_ENABLE_CLOUD | false | Enable S3/Object Storage | Boolean |
| PF_MAX_USERS | 1000 | Limit max user registrations | Integer |
| PF_ENFORCE_MAX_USERS | 2000 |  in KB | Integer |
| PF_OPTIMIZE_IMAGES | true | Enable image optimization | Boolean |
| PF_OPTIMIZE_VIDEOS | true | Enable video optimization | Boolean |
| PF_MAX_COLLECTION_LENGTH | 100 | Max collection post limit | Integer |
| OAUTH_ENABLED | true | Enable oAuth support, required for mobile/3rd party apps | Boolean |
