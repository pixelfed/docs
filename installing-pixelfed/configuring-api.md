# Configuring API

If you want mobile application to be able to connect to your server, you must follow these few steps.
```bash
Run php artisan passport:keys
Add OAUTH_ENABLED=true to .env
Run php artisan config:cache
Run php artisan route:cache
Run php artisan passport:client --personal
```

