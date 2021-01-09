# Priprema vašeg uređaja

Prije neg što instalirate Pixelfed, trebaćete postaviti jedan webserver sa potrebnim zavisnostima:

- HTTP server
- SQL database server
- PHP-FPM server
- [Composer](https://getcomposer.org/), za PHP upravljanje zavisnošćima
- [Git](https://git-scm.com/), za preuzimanje ažuriranja
- [Redis](https://redis.io/), za in-memory cachanja i pozadinsko čekanje zadataka
- [GD](https://libgd.github.io/) ili [ImageMagick](https://imagemagick.org), za obradu slika
- [JPEGOptim](https://github.com/tjko/jpegoptim), za optimiziranje JPG
- [OptiPNG](http://optipng.sourceforge.net/), za gubitak PNG
- [PNGQuant](https://pngquant.org/), kompresija s gubicima PNG
- [ffmpeg](https://ffmpeg.org/), za generiranje video sličica

::: tip Zajednički hosting
U ovoj stazi nije moguće instalirati Pixelfed kroz preuzimanje ZIP fajla i prenositi ga na faljove od vašeg web servera. Ovo je zato što Composer treba da se pokreće na komand liniji.
Ovo neznači obavezno da vam treba VPS. Neki zajednički hosts daju ti SSH pristup, kroz koji bi trebao moći instalirati Composer i Pixelfed bez problema.
:::

## HTTP Web server
Sljedeći web serveri su službeno podržani:
- Apache (sa `mod_rewrite` uključeno)
- nginx

Pixelfed koristi HTTPS URLs, to znači da morate imati HTTPS na obodu vaše mreže prije nego što interno zatražite proxy.

## Database

Možete izabrati jedan od ovih tri podržani database drivera:

- MySQL (5.7+)
- MariaDB (10.2.7+ -- 10.3.5+ preporučeno)
- PostgreSQL (10+)

Trebaćete napraviti jedan database i odobriti dozvolu za jednog SQL korisnika koji je identificiran od lozinke. Da uradite ovo sa MySQL ili MariaDB, uradite kao što sljedi:

```bash
sudo mysql -u root -p
```

Onda možete napraviti jedan database i dati privilegije na tvoj SQL korisnik. Sljedeće SQL komande će napraviti jedan database sa imenom `pixelfed` i dopustiti da njime upravlja korisnik `pixelfed` sa lozinkom `strong_password`:

```sql{1,2}
create database pixelfed;
grant all privileges on pixelfed.* to 'pixelfed'@'localhost' identified by 'strong_password';
flush privileges;
```

Da uradite ovo sa PostgreSQL uradite kao što sljedi:

```bash
sudo -u postgres psql
```

Kad ste u psql shell, uradite kao što sljedi:

```
CREATE USER pixelfed CREATEDB;
\q
```

::: tip Mjenjanje database drivera:
Ako odlučite da zamjenite database drivere kasnije, molimo vas da napravite kopiju kao prvo! To možete uraditi sa `php artisan backup:run --only-db`
:::

## PHP-FPM

Možete provjeriti svoju instaliranu verziju PHP-FPM sa `php-fpm -v`. Budite sigurni da koristite verziju **PHP >= 7.3**.

Možete provjeriti svoje trenutno učitane ekstenzije sa `php-fpm -m`. Moduli su obično omogućeni kroz uređivanje PHP konfiguriracijski fajl i unkomentirati odgovarajuće linije u odjeljku "Dinamička proširenja". Obavezno instalirajte i učitajte sljedeća ekstenzije:

- `bcmath`
- `ctype`
- `curl`
- `exif`
- `iconv`
- `intl`
- `json`
- `mbstring`
- `openssl`
- `redis`
- `tokenizer`
- `xml`
- `zip`

Trebaće te isto uključiti ekstenzije za obradu slika:

- Za GD: uključi `gd`
- Za ImageMagick: uključi `imagick`

Pored toga, trebat ćete omogućiti ekstenzije za database drivere:

- Za MySQL ili MariaDB: uključi `pdo_mysql` i `mysqli`
- Za PostgreSQL: uključi `pdo_pgsql` i `pgsql`

Na kraju, budite sigurni da stavite želju za ograničenje prijenosa za vaš PHP proces. Morali biste provjeriti sljedeće:

- `post_max_size` (zadano je 8M, postavite ovo oko ili malo veće od vaše željene granice veličine posta)
- `file_uploads` (zadano je On, kao što treba biti)
- `upload_max_filesize` (zadano je 2M, set this <= `post_max_size`)
- `max_file_uploads` (zadano je 20, ali budite sigurni da je >= vaše željeno ograničenje privitka)
- `max_execution_time` (zadano je 30, razmislite o podizanju ovog broja na 600 ili više tako da se duži zadaci ne bi prekidali)

## Stvaranje namjenskog korisnika aplikacije i korištenje UNIX sockets (opcionalno)

Za dodatnu sigurnost, možda ćete htjeti stvoriti namjenskog korisnika posebno za pokretanje Pixelfed-a. Da biste to učinili:

```bash
useradd -rU -s /bin/bash pixelfed
```

### Konfiguriranje PHP-FPM pool i socket

```bash{1}
cd /etc/php/php-fpm.d/
cp www.conf pixelfed.conf
$EDITOR pixelfed.conf
```

::: tip Gdje definirati prilagođeni PHP-FPM pools
Tačan direktorij u kojem biste trebali `cd` razlikovat će se ovisno o vašoj distribuciji:
- Arch Linux koristi `/etc/php/php-fpm.d`
- Debian i Ubuntu koriste `/etc/php/7.3/fpm/pool.d/` (zavisi na verziju od PHP)
- Za ostale distribucije, provjerite svoj php-fpm.conf da vidite gdje tačno možete definirati `* .conf` sa` include =`
:::

Napravite sljedeće promjene u PHP-FPM pool:

```
;     koristite ime korisnika aplikacije kao ime pool-a, npr. pixelfed
[pixelfed]
user = pixelfed
group = pixelfed
;    da koristite TCP socket, npr. ako pokrećete php-fpm na mašini koji je drugačiji od tvoga APP-a:
;    (imajte na umu da se koristi port 9001, jer php-fpm po defaultu radi na portu 9000;)
;    (međutim, otaj port može biti šta god želite)
; listen = 127.0.0.1:9001;
;    ali bolje je koristiti socket ako lokalno radite na istoj mašini:
listen = /run/php-fpm/pixelfed.sock
listen.owner = http
listen.group = http
listen.mode = 0660
[...]
```

### Konfiguriranje Redis socket-a

Uredi `redis.conf` i uredite sljedeće redove
```
port 6379                           # uredite ovo na "port 0" da ugasite mrežne pakete
unixsocket /run/redis/redis.sock    # 
unixsocketperm 770                  # dati dozvolu "redis" korisniku i grupi
```

::: tip Gdje naći redis.conf
Tačna lokacija ovisit će o vašoj distribuciji:
- Arch Linux koristi `/etc/redis.conf`
- Debian i Ubuntu koriste `/etc/redis/redis.conf`
- Za ostale distribucije provjerite svoje dokumentacije
:::
