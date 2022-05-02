# Ogólny proces instalacji

::: warning WARNING
Pixelfed jest wciąż w fazie rozwoju. Nie polecamy uruchamiania instancji na produkcji w tym etapie, chyba że na pewno wiesz co robisz!
:::

Upewnij się, że spełniasz wszystkie wymagania wstępne i wymagane usługi są włączone.

[[toc]]

## Pobieranie źródła z Gita

Pixelfed Beta obecnie używa gałęzi `dev` dla kodu mającego być wdrażany. Po wydaniu v1.0, stabilną gałęzią zostanie `master`, a `dev` będzie używana do rozwoju i testów.

```bash{1}
$ cd /home # lub tam, gdzie wolisz instalować aplikacje webowe
$ git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # pobierz gałąź dev do folderu „pixelfed”
```

## Ustawienie odpowiednich uprawnień

Serwer webowy i procesy aplikacji muszą mieć możliwość zapisu w katalogu Pixelfeda. Upewnij się, że nadasz im odpowiednie uprawnienia. Na przykład, jeżeli te procesy są uruchamiane przez użytkownika/grupę `http`, wykonaj następujące polecenie:

```bash{2}
$ cd pixelfed
$ sudo chown -R http:http . # zmień użytkownika/grupę na użytkownika http i grupę http
$ sudo find . -type d -exec chmod 755 {} \; # ustaw wszystkie katalogi jako rwx dla użytkownika/grupy
$ sudo find . -type f -exec chmod 644 {} \; # ustaw wszystkie pliki jako rw dla użytkownika/grupy
```

::: danger Uprawnienia użytkownika i grupy
Upewnij się, że użyjesz prawidłowej nazwy użytkownika/grupy dla swojego systemu. Może to być `http`, `www-data` lub `pixelfed` (jeżeli używasz oddzielnego konta).

Jeżeli utworzono dedykowanego użytkownika dla aplikacji, musi zostać dodany do grupy sieci, lub użytkownik sieci musi zostać dodany do grupy aplikacji. Musisz też ustawić 775 dla katalogów i 664 dla plików, aby zarówno użytkownik aplikacji, jak i użytkownik sieci mogli odczytywać i zapisywać pliki instalacji Pixelfeda.
:::

## Inicjalizacja zależności PHP

Wykonaj `composer install`, aby uzyskać zależności wymagane przez Pixelfed. Zalecane jest wykonanie polecenia z następującymi flagami:

```bash
$ composer install --no-ansi --no-interaction --optimize-autoloader
```

## Konfiguracja Pixelfeda

Domyślnie Pixelfed zawiera plik `.env.example` dla wdrażania produkcyjnego i `.env.testing` dla wdrażania przy debugowaniu. Musisz zmienić nazwę lub skopiować jeden z nich do `.env`, niezależnie w jakim środowisku pracujesz.

```bash
$ cp .env.example .env # dla wdrażania na produkcji
$ cp .env.testing .env # dla wdrażania do debugowania
```

Możesz teraz edytować `.env` i zmienić wartości pod swoją konfigurację.

::: tip Lista zmiennych środowiskowych
Możesz znaleźć dogłębną listę dodatkowych opcji konfiguracyjnych na stronie [Konfiguracja](../technical-documentation/env.md), ale te ważniejsze zostaną wypisany w poniższych sekcjach.
:::

### Zmienne aplikacji

- Ustaw `APP_NAME` jako wybraną nazwę, np. `Pixelfed`. Będzie wyświetlana w nagłówku i innych miejscach.
- Upewnij się, że `APP_DEBUG` jest równe `false` w środowisku produkcyjnym, a `true` w środowisku debugowania.
- Ustaw `APP_URL` na adres URL HTTPS, pod którym chcesz, aby dostępny był Pixelfed, np. `https://pixelfed.example`
- Ustaw `APP_DOMAIN`, `ADMIN_DOMAIN` i `SESSION_DOMAIN` na nazwę domeny, którą użyjesz dla Pixelfeda, np. `pixelfed.example`

### Zmienne bazy danych

Domyślnie, dostarczone wartości pozwolą na połączenie z MySQL lub MariaDB pod domyślnym połączeniem localhost przez TCP.

Jeżeli używasz Postgresa:

- Ustaw `DB_CONNECTION` na `pgsql` zamiast `mysql`.

Jeżeli masz serwer SQL na innym urządzeniu lub pod innym portem:

- Ustaw `DB_HOST` na adres IP urządzenia
- Ustaw `DB_PORT` na port, pod którym dostępny jest serwer bazy danych

Aby połączyć się z utworzoną bazą danych:

- Ustaw `DB_DATABASE` na nazwę bazy danych utworzonej dla Pixelfeda
- Ustaw `DB_USERNAME` na nazwę użytkownika z przydzielonymi uprawnieniami do tej bazy danych
- Ustaw `DB_PASSWORD` na hasło użytkownika z uprawnieniami do bazy danych

### Zmienne Redisa

Jeżeli masz uruchomionego Redisa przez TCP na urządzeniu razzem z Pixelfedem, domyślne ustawienia zadziałają.

Jeżeli Redis jest uruchomiony na innym urządzeniu:

- Ustaw `REDIS_HOST` na adres IP urządzenia na którym uruchomiony jest Redis
- Ustaw `REDIS_PORT` na port na którym dostępny jest Redis
- Ustaw `REDIS_PASSWORD` na hasło tego serwera Redisa

Jeżeli używasz Redisa przez socket UNIX:

- Ustaw `REDIS_SCHEME` na `unix`
- Ustaw `REDIS_PATH` na adres tego socketu, np. `/run/redis/redis.sock`

::: tip Serwer TCP vs. socket UNIX
Redis zwykle jest domyślnie skonfigurowany na żądzania TCP na lokalnym urządzeniu po porcie 6379. W konfiguracji Redisa, zwykle w pliku `/etc/redis.conf`, odpowiednie wiersze to `bind 127.0.0.1` i `port 6379`.

Changing the latter line to `port 0` will disable TCP listening, in which case Redis must be configured for socket access. Lines such as `unixsocket /run/redis/redis.sock` and `unixsocketperm 770` must be set to enable socket access. Additionally, both the app user and web user should have permission to access the socket, e.g. by being added to the `redis` group.

Using a UNIX socket is optional, but may provide faster access since it does not have to create TCP packets. TCP is usually used over a network, and would be required if Redis were running on a different machine than your web server.
:::

### Email variables

By default, Pixelfed will not send any emails, but will instead write messages to the Laravel log. 

To setup a mailer for production deployments, you have several options for supported mail services. [Configuration#mail](../technical-documentation/env.md)

### Additional variables

If you are using ImageMagick, then:

- Set `IMAGE_DRIVER` to `imagick`

For testing environments:

- Set `ENFORCE_EMAIL_VERIFICATION` to `false`

For production environments, you will probably want to set various config values related to your deployment. A full list of environment variables can be found [here.](../technical-documentation/env.md)

## Final steps

If you copied `.env.testing` to set up a development environment, the application secret is pre-generated for you. If you copied `.env.example` to set up a production environment, then you need to generate the secret `APP_KEY`:

```bash
$ php artisan key:generate
```

Every time you edit your .env file, you must run this command to have the changes take effect:

```bash
$ php artisan config:cache
```

One time only, the `storage/` directory must be linked to the application:

```bash
$ php artisan storage:link
```

Database migrations must be run:

```bash
$ php artisan migrate --force
```

If you want to access the Horizon web dashboard:

```bash
$ php artisan horizon:install
$ php artisan horizon:assets
```

Routes should be cached whenever the source code changes:
```bash
$ php artisan route:cache
```
