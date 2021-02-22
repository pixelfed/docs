# Wymagania wstępne

Zanim zainstalujesz Pixelfeda, musisz skonfigurować serwer z następującymi zależnościami:

- Serwer HTTP
- Serwer bazy danych SQL
- Serwer PHP-FPM
- [Composer](https://getcomposer.org/) zarządzający zależnościami PHP
- [Git](https://git-scm.com/), aby pobierać aktualizacje
- [Redis](https://redis.io/), aby używać pamięci podręcznej i kontrolować kolejkę zadań w tle
- [GD](https://libgd.github.io/) lub [ImageMagick](https://imagemagick.org), do przetwarzania obrazów
- [JPEGOptim](https://github.com/tjko/jpegoptim), do optymalizacji plików JPG
- [OptiPNG](http://optipng.sourceforge.net/), do kompresji bezstratnej PNG
- [PNGQuant](https://pngquant.org/), do kompresji stratnej PNG


## Serwer HTTP
Następujące serwery webowe są oficjalnie wspierane:
- Apache
- nginx

Pixelfed korzysta z adresów URI HTTPS, więc musisz skonfigurować HTTPS na poziomie sieci.

## Bazy danych

Możesz wybrać jeden z trzech obsługiwanych sterowników bazy danych:
- MySQL (5.7+)
- MariaDB (10.2.7+ -- zalecana 10.3.5+)
- PostgreSQL (10+)

::: warning Dla użytkowników PostgreSQL:
Obsługa PostgreSQL nie jest na pierwszym planie -- mogą występować błędy dotyczące wyłącznie Postgre. Jeżeli napotkasz na problemy podczas korzystania z Postgre jako bazy danych, zgłoś je na naszym [Githubie](https://github.com/pixelfed/pixelfed/issues).
:::

Musisz utworzyć bazę danych i udzielić uprawnień użytkownikowi SQL uwierzytelnianemu hasłem. Aby to zrobić używając MySQL lub MariaDB, wykonaj następujące polecenie:

```bash
$ sudo mysql -u root -p
```

Teraz możesz utworzyć bazę danych i udzielić uprawnień użytkownikowi SQL. Następujące polecenia SQL utworzą bazę danych o nazwie `pixelfed` i pozwoli na modyfikację jej użytkownikowi `pixelfed` z hasłem `silne_haslo`:

```sql{1,2}
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'silne_haslo';
flush privileges;
```

::: tip Zmiana sterownika bazy danych:
Jeżeli zdecydujesz się później na zmianę sterownika bazy danych, wykonaj wcześniej kopię zapasową! Możesz to zrobić poleceniem `php artisan backup:run --only-db`
:::

## PHP

Możesz sprawdzić zainstalowaną obecnie wersję PHP poleceniem `php -v`. Upewnij się, że używasz **PHP >= 7.3**.

Możesz sprawdzić obecnie załadowane rozszerzenia poleceniem `php -m`. Moduły zwykle aktywuje się edytując plik konfiguracyjny PHP i odkomentowując odpowiednie wiersze w sekcji „Dynamic extensions”. Upewnij się, że zainstalowane i załadowane są następujące rozszerzenia:
- `bcmath`
- `ctype`
- `curl`
- `iconv`
- `intl`
- `json`
- `mbstring`
- `openssl`
- `tokenizer`
- `xml`
- `zip`

Musisz też aktywować rozszerzenie dla używanego sterownika przetwarzania obrazów:
- W przypadku GD: włącz `gd`
- Dla ImageMagick: włącz `imagick`

Dodatkowo musisz aktywować rozszerzenie sterownika bazy danych:
- Dla MySQL i MariaDB: włącz `pdo_mysql` i `mysqli`
- Dla PostgreSQL: włącz `pdo_pgsql` i `pgsql`

::: danger Informacja o php-redis vs. predis:
Upewnij się, że NIE masz zainstalowanego/włączonego rozszerzenia PHP `redis`! Pixelfed używa wewnętrznie biblioteki [predis](https://github.com/nrk/predis), więc obecność innego rozszerzenia Redisa może spowodować problemy.
:::

Na koniec, pamiętaj o ustawieniu oczekiwanych limitów wysyłania dla procesów PHP. Musisz sprawdzić następujące:
- `post_max_size` (domyślnie 8M, ustaw na trochę więcej, niż ustawisz ograniczenie rozmiaru wysyłanych zdjęć)
- `file_uploads` (domyślnie On, tak ma zostać)
- `upload_max_filesize` (domyślnie 2M, ustaw na mniejsze lub równe `post_max_size`)
- `max_file_uploads` (domyślnie 20, ale upewnij się że jest większe lub równe limitowi załączników)
- `max_execution_time` (domyślnie 30, pomyśl o podniesieniu do 600 lub więcej, aby dłuższe zadania nie były przerywane)