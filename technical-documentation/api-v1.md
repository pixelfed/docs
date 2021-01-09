# v1 API

[[toc]]

Naš v1 API temelji se na [mastodon v1 API](https://docs.joinmastodon.org/methods/apps/). Možete se pozvati na dokumentacije od Mastodon, razlike smo naveli u nastavku.

## Autorizacije
Mi koristimo OAuth za autentifikaciju putem API-ja, u postavkama računa na Pixelfedu možete stvoriti OAuth aplikaciju ili token ličnog pristupa.

Da biste kreirali klijenta za lični pristup:

Dodajte `OAUTH_ENABLED=true` na .env
```bash
php artisan passport:keys
php artisan config:cache
php artisan route:cache
php artisan passport:client --personal
```
Možete kreirati novi token na ovoj stranici `/settings/applications`

## Razlike s Mastodon API-jem
- Neki endpoints vraćaju prazne nizove jer nisu primjenjive na Pixelfed
- Link Header Pagination nije podržana
- Prilagođena ograničenja za naslove i albume, navedene su na endpoint /api/v1/instance
- OAuth tokeni ističu nakon 15 dana, a nakon toga se moraju osvježiti

## Libraries
### PHP
- [dansup/pixelfed-php](https://github.com/dansup/pixelfed-php)
