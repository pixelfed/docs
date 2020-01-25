# Configuring Mail

Pixelfed currently supports SMTP, Mailgun, Postmark, Amazon SES, and ```sendmail``` for sending emails to users.

[[toc]]

Your ```.env``` file will need to include the following setting keys depending on which ```MAIL_DRIVER``` you use.

```bash
MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ADDRESS=null
MAIL_NAME=null
MAIL_ENCRYPTION=tls
```

After making changes to your mail configuration you'll need to run the following command within your Pixelfed installation directory.

```bash
$ php artisan config:cache

# If you experience any issues after running this command, run this too:
$ rm -rf bootstrap/cache/*
```

## Mailgun
Create an account with [Mailgun](https://mailgun.com/).

```MAIL_USERNAME``` should be Mailgun **domain**.    
```MAIL_PASSWORD``` should be Mailgun **API Key**.

Edit your ```.env``` file with the following variables.

```bash
MAIL_DRIVER="mailgun"
MAIL_HOST="smtp.mailgun.org"
MAIL_PORT="587"
MAIL_USERNAME="example.org"
MAIL_PASSWORD="xxxx"
MAIL_ADDRESS="support@example.org"
MAIL_NAME="Pixelfed"
MAIL_ENCRYPTION="tls"
```

The ```tls``` encryption setting is required to have e-mails be properly delivered.

If you are not using the "US" [Mailgun region](https://documentation.mailgun.com/en/latest/api-intro.html#mailgun-regions), you may define your region's endpoint in the ```services``` configuration file located in the ```config/``` directory:

```php
'mailgun' => [
    'domain' => 'your-mailgun-domain',
    'secret' => 'your-mailgun-key',
    'endpoint' => 'api.eu.mailgun.net',
],
```

## AWS SES
Create an account with Amazon AWS.

Then set the ```MAIL_DRIVER``` option in your ```.env``` configuration file to ```ses``` and verify that your ```config/services.php``` configuration file contains the following options:

```php
'ses' => [
    'key' => 'your-ses-key',
    'secret' => 'your-ses-secret',
    'region' => 'ses-region',  // e.g. us-east-1
],
```

## Postmark
To use the Postmark driver, install Postmark's SwiftMailer transport via Composer:

```bash
composer require wildbit/swiftmailer-postmark
```

Next, install Guzzle and set the ```driver``` option in your ```config/mail.php``` configuration file to ```postmark```. Finally, verify that your ```config/services.php``` configuration file contains the following options:

```php
'postmark' => [
    'token' => 'your-postmark-token',
],
```

## SMTP
To use SMTP driver, set the following ```.env``` variables accordingly.

```bash
MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ADDRESS=null
MAIL_NAME=null
MAIL_ENCRYPTION=tls
```