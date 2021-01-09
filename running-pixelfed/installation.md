# Generički vodič za instalaciju

::: warning UPOZORENJE
Pixelfed je još u toku proizvodnje. Ne preporučujemo da se u ovoj fazi vodi slučaj osim ako znate šta radite!
:::

Prije nastavka provjerite jesu li instalirani svi preduslovi i odgovarajuće usluge pokrenute/omogućene.

[[toc]]

## Postavljanje Pixelfed datoteka

### Preuzmi izvor putem Git-a

Pixel fed Beta trenutno koristi `dev` branch za raspoređivanje koda. Kada v1.0 je pušten, stabilan branch će biti promijenit u `stable`, sa `dev` branch koristi za razvoj i testiranje.

```bash{1}
cd /usr/share/webapps # or wherever you choose to install web applications
git clone -b dev https://github.com/pixelfed/pixelfed.git pixelfed # checkout dev branch into "pixelfed" folder
```

### Postavite tačne dozvole

Vaš web server i proces aplikacije mora imati mogućnost da piše u direktorij sa Pixelfed. Obavezno postavite odgovarajuće dozvole. Na primjer, ako pokrenete svoje procese preko `http` korisnika/grupe, onda pokrenite sljedeće:

```bash{2}
cd pixelfed
sudo chown -R http:http . # change user/group to http user and http group
sudo find . -type d -exec chmod 755 {} \; # set all directories to rwx by user/group
sudo find . -type f -exec chmod 644 {} \; # set all files to rw by user/group
```

::: danger Dozvole za korisnike i grupe
Provjerite da li koristite ispravno korisničko/grupno ime za vaš sistem. Ovo može biti `http`, `www-data`, ili `pixelfed` (ako koristite posvećen korisnik).
:::

### Inicijaliziraj ovisnosti PHP

Pokrenite `composer install` da biste dobili ovisnosti potrebne od pixelfed-a. Preporučuje se da se radi uz sljedeće zastave:

```bash
composer install --no-ansi --no-interaction --optimize-autoloader
```

## Konfiguriši varijable okruženja

Uobičajeno Pixel polje dolazi sa `.env.primjer` fajl za izradu produkcije, i `.env.testing` datoteku za odstranjivanje debug. Moraćete preimenovati ili kopirati jednu od ovih datoteka u `.env` bez obzira na koje okruženje radite.

```bash
cp .env.example .env # za proizvodnju razmještanja
cp .env.testing .env # za debug razmještanja
```

Sada možete urediti `.env` i promijenite vrijednosti za vaše postavljanje.

::: tip Lista od environment varijabli
Možete naći listu dodatni konfiguracija postavke u dubinu na [Configuration](../technical-documentation/env.md) stranici, ali važne varijable će biti napisane ispod podsekcijama.
:::

### App varijable

- Postavite `APP_NAME` na željeni naslov, npr. `Pixelfed`. To će biti prikazano na traci zaglavlja i na drugim mjestima.
- Provjerite je li `APP_DEBUG` `false` za proizvodnju environments, ili `true` za debug environments.
- Postavite svoj `APP_URL` na HTTPS URL putem kojeg želite posluživati Pixelfed, npr. `https://pixelfed.example`
- Postavite `APP_DOMAIN`,` ADMIN_DOMAIN` i `SESSION_DOMAIN` na ime domene koje ćete koristiti za Pixelfed, npr. `pixelfed.example`

### Varijable bazu datoteka

Uobičajeno, navedene vrijednosti će omogućiti povezivanje sa MySQL ili MariaDB oko uobičajene localhost TCP konekcije.
If you are running Postgres:

- Postavi `DB_CONNECTION` na `pgsql` umjesto `mysql`.

Ako koristite svoj SQL server na drugoj mašini ili portu:

- Postavi `DB_HOST` na IP od mašine
- Postavi `DB_PORT` port na kojem je vaš server podataka izložen

Da se povežete na database koju ste napravili:

- Postavi `DB_DATABASE` na ime od database napravljen za Pixelfed
- Postavi `DB_USERNAME` na koristnika koji ima privilegije za taj database
- Postavi `DB_PASSWORD` na lozinku koja identifikuje korisnika sa privilegije za database

### Redis varijable

Ako koristiš Redis preko TCP na istoj mašini kao Pixelfed, onda će uobičajene postavke raditi

Ako Ako koristiš Redis na drugoj mašini:

- Postavi `REDIS_HOST` na IP od mašine na kojoj tvoj Redis server koristi
- Postavi `REDIS_PORT` na port na kojoj Redis je izložen
- Postavi `REDIS_PASSWORD` na lozinku od tog Redis servera

Ako koristiš UNIX socket za Redis, onda:

- Postavi `REDIS_SCHEME` na `unix`
- Postavi `REDIS_PATH` do puta socket-a, npr. `/run/redis/redis.sock`

::: tip TCP server vs. UNIX socket
Redis inače dodje unaprijed konfiguriran za sluša za TCP zahtjeve na lokalnoj mašini kroz port 6379. U tvojoj Redis configuraciji, inače kod `etc/redis.conf`, relevantne linije su `bind 127.0.0.1` i `port 6379`

Mjenjanje druge linije na `port 0` će ugasiti TCP slušanje, onda će se morati Redis configurirati da ima pristup na socket. Linije kao `unixsocket /run/redis/redis.sock` i `unixsocketperm 770` mora biti postavljeno da omogući pristup socket-u. Dodatno, app korisnik i web korisnik trebali bi imati permisije da pristupe socket-u.

korištenje UNIX socket je optionalno, ali može dati brži pristup zato što ne mora da pravi TCP pakete. TCP je inače korišten preko mreže, i bilo bi potrebno ako je Redis korišten na drugoj mašini od tvoga web servera.
:::

### Email varijable 

Po defaultu, Pixelfed neće slati nikakve e-mailove, nego će pisati poruke na Laravel log.
Da postavite jedan mailer za produktivne delpoyments, imaš vise opcija za podržane mail usluge. Pixelfed trenutno podržava SMTP, Mailgun, Postmark, Amazon SES, i `sendmail` za slati e-mailova korisnikama 

- Postavi `MAIL_FROM_ADDRESS` na email adresu od kojeg želite slati e-mailove
- Postavi `MAIL_FROM_NAME` na ime koje želite da se pokažuje na e-mailu
- Postavi `MAIL_ENCRYPTION` na `tls` da se e-mailovi pravilno pošalju

#### SMTP (Mailtrap)

Napravi svoj SMTP server. Ili, napravi račun sa [Mailtrap](https://mailtrap.io).

- Postavi `MAIL_DRIVER` na `smtp`
- Postavi `MAIL_HOST` na tvoj host, npr. `smtp.mailtrap.io`
- Postavi `MAIL_PORT` na tvoj port, npr. `587` ili `2525`
- Postavi `MAIL_USERNAME` i `MAIL_PASSWORD` ako tvoj SMTP server treba autorizaciju. (Mailtrap.io ne treba.)

#### Mailgun

Napravi račun sa [Mailgun](https://mailgun.com/).

- Postavi `MAIL_DRIVER` na `mailgun`
- Postavi `MAIL_HOST` na `smtp.mailgun.org`
- Postavi `MAIL_PORT` na `587`
- Postavi `MAIL_USERNAME` na tvoj Mailgun domena
- Postavi `MAIL_PASSWORD` na tvoj Mailgun API key

Ako ne koristiš "US" [Mailgun region](https://documentation.mailgun.com/en/latest/api-intro.html#mailgun-regions), možes definirati tvoj regijonalni endpoint u `services.php` konfiguracijskoj datoteki koja se nalazi kod `config/` direktorij:

```php{4}
'mailgun' => [
    'domain' => env('MAILGUN_DOMAIN'),
    'secret' => env('MAILGUN_SECRET'),
    'endpoint' => 'api.eu.mailgun.net',
],
```

#### Postmark

Da koristiš Postmark drajver, instaliraj Postmark-ov SwiftMailer transport kroz Composer:

```bash
composer require wildbit/swiftmailer-postmark
```

Sljedeće, instaliraj Guzzle i stavi `driver` opciju u tvoj `config/mail.php` konfiguracijskom fajlu na `postmark`. Kao zadnje, potvrdi da tvoj `config/services.php` konfiguracijski fajl sadrži sljedeće opcije:

```php
'postmark' => [
    'token' => 'your-postmark-token',
],
```

#### Amazon SES

Napravi račun sa Amazon AWS.

- Postavi `MAIL_DRIVER` na `ses`
- Postavi `SES_KEY`
- Postavi `SES_SECRET`
- Postavi `SES_REGION` (ako se ne koristi zadana vrijednost kao `us-east-1`)

#### sendmail

- Postavi `MAIL_DRIVER` na `sendmail`

### Dodatne varijable

Ako koristiš  ImageMagick, onda:

- Postavi `IMAGE_DRIVER` na `imagick`

Ako želite omogućiti ActivityPub federaciju:

- Postavi `ACTIVITY_PUB` na `true`
- Postavi `AP_REMOTE_FOLLOW` na `true`

## Postavljanje usluga

### Jednokratni zadaci postavljanja

Samo jednom, trebate generirati tajnu `APP_KEY`:

```bash
php artisan key:generate
```

Samo jednom `storage/` direktorij mora biti povezan na aplikaciji:

```bash
php artisan storage:link
```

Database migracije moraju biti pokrenute:

```bash
php artisan migrate --force
```

Ako želite omogućiti podršku za podatke o lokaciji:

```bash
php artisan import:cities
```

Ruutes treba cechati kad god se promijeni izvorni kod ili kad promijenite routes:

```bash
php artisan route:cache
php artisan view:cache
```

Svaki put kad uredite svoj .env fajl, moraš pokrenuti ovu komandu da promjene stupe na snagu:

```bash
php artisan config:cache
```


::: tip Korištenje Pixelfed bez cache

Moguće je da se ne koristi cache ako ne koristite gornje cache komande, ali je preporučeno da se koriste za produktivne implementacije. Ako se odlučis da ne koristiš ove komande, možes uređivati .env fajl i izvorni kod, i tvoje urede će odmah se odraziti, ali tvoj performanse će biti relativno sporiji. Možete isto poništi ove komande ako koristite `:clear` koamndu: 

```bash
php artisan route:clear
php artisan view:clear
php artisan config:clear
```
:::

### Redovi posla

Pixelfed podržava oboje [Laravel Horizon](https://laravel.com/docs/6.x/horizon) i [Queue Workers](https://laravel.com/docs/6.x/queues) za pokretanje reda poslova. 

Glavna razlika između Horizon i Queue Worker je dashboard obezbjeđeno od Horizon-a također i napredni balansiranje tereta. Mi preporučujemo da koristite Horizon. Horizon obezbjeđeva preljepi dashboard koji ti dozvoljava da možeš lako nadgledati glavne metrike od tvog sistemnog redova, poput propusnosti posla, vrjeme izvođenja i neuspjeha posla

#### Korištenje Laravel Horizon

Ako želite da administratori imaju dostup Horzon-ovu web dashboard, morate koristiti sljedeće komande:

```bash
php artisan horizon:install
php artisan horizon:assets
```

Ako tvoj korisnik ima tačne dozvole da dostupi Redis i Pixelfed instalacijski folder, onda jednostavno pokrenite `php artisan horizon` kao taj korisnik u terminalu. Ovo može biti uredu, ali ako zatvorite taj terminal onda će i Horizon prekinuti. Pokrećanje direktno je preporučeno samo u implementacije gdje terminal može raditi bez prekida, npr. u VM ili korištenje GNU Screen ili tmux.

Ako koristite u produkciji, više je idealno da napravite pozadinsku usluga za pokrećanje Pixelfed-ov red zadataka. Trebaćes koristiti upravitelj zadataka kao systemd ili Supervisor. Za više informacija, uputite se kod [Laravel Documentation](https://laravel.com/docs/6.x/horizon#deploying-horizon).

Puno distribucija danas koriste već systemd, tako da možete postaviti unit fajl kod `/etc/systemd/system/pixelfed.service`:

```{4-7,11-12}
[Unit]
Description=Pixelfed task queueing via Laravel Horizon
After=network.target
Requires=mariadb
Requires=php-fpm
Requires=redis
Requires=nginx

[Service]
Type=simple
ExecStart=/usr/bin/php /usr/share/webapps/pixelfed/artisan horizon
User=http
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

::: tip Korištenje tačni puteva i naziv usluga
The example above assumes you are using MariaDB and Nginx, that your distribution's PHP packages do not have versioned names, and that your distribution uses the `http` user to serve Nginx. It also assumes that you have installed Pixelfed in /home/pixelfed in accordance with the rest of the installation process documentation. Some changes you may need to make include:

Gornji primjer pretpostavlja da koristite MariaDB i Nginx, da u tvojoj distribuciji PHP paketi nemaju verzijski imena, i da tvoja distribucija koristi `http` koristnika da služi Nginx. Ono također pretpostavlja da si Pixelfed instaliro kod /home/pixelfed u skladu s ostatkom dokumentacije procesa instalacije.
Neke promjene koje ćete možda morati uraditi:

- Zamjenite `mariadb` sa `postgresql` ili `mysql`.
- Zamjenite `php-fpm` sa nazivom vašeg PHP-FPM paketa za distribuciju, npr. `php7.3-fpm`.
- Zamjenite `nginx` sa `apache`, ili zamjenite `Requires` sa `Wants` ako ne radite u proizvodnom enviorment.
- Zamjenite `/usr/bin/php` or `/usr/share/webapps/pixelfed/artisan` with the correct paths, e.g. `/usr/bin/php7.3` or `/path/to/pixelfed/artisan`.
- Zamjenite `User=http` da reflektira app korisnika, npr. `User=pixelfed` ili komentiranje ove linije kako bi se pokrenuo u sistemskom odsječku.
:::

Sad možete koristiti systemd da upravljate Pixelfed kao svaku drugu pozadinsku uslugu

```bash
sudo systemctl enable --now pixelfed
```

alternativno, ako neželite korisititi systemd, onda možete instalirati Supervisor da napravite ovaj primjerni Supervisor konfiguracijski fajl kod `/etc/supervisor/conf.d/pixelfed.conf`, obavezno koristite ispravan put do vaše Pixelfed instalacije i odgovarajućeg korisnika aplikacije:

```{2,3,6}
[program:pixelfed]
command=/usr/bin/php /usr/share/webapps/pixelfed/artisan horizon
user=http
autorestart=true
redirect_stderr=true
stdout_logfile=/usr/share/webapps/pixelfed/horizon.log
stopwaitsecs=3600
```
:::tip Korištenje pravih paths
Možda ćete trebati zamijeniti `/usr/bin/php` ili `/usr/share/webapps/pixelfed/artisan` sa tačnim paths, npr. `/usr/bin/php7.3` ili `/path/to/pixelfed/artisan`
:::

Moraćete koristiti ove komande:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start pixelfed
```

#### Korištenje Queue Worker
Pixelfed također uključuje radnika u redu koji će obrađivati nove poslove kad ih se gurne u red. Možete pokrenuti radnike pomoću `queue:work` komande. imajte na umu da kad pokrenete ovu komandu, nastavit će raditi dok se ručno ne zaustavi ili zatvorite terminal:

```bash
php artisan queue:work
```

Opet možete koristiti Supervisor ili systemd kako je gore opisano, zamjenjujući `horizon` za `red:work`.

### Zakazivanje periodičnih zadataka

Planer zadataka koristi se za pokretanje periodičnih komandi u pozadini, kao što su optimizacija medija, prikupljanje smeća i drugi zadaci što su vezani za vrijeme koji bi se trebalo svako malo izvoditi.

Za postavljanje planiranih zadataka pomoću Cron:

```bash
EDITOR=nano crontab -e
```

Zalijepite ovaj cronjob u svoj crontab:

```
* * * * * /usr/bin/php /usr/share/webapps/pixelfed/artisan schedule:run >> /dev/null 2>&1
```

:::tip Korištenje tačni paths
Možda ćete trebati zamijeniti `/usr/bin/php` ili `/usr/share/webapps/pixelfed/artisan` sa tačnim paths, npr. `/usr/bin/php7.3` ili `/path/to/pixelfed/artisan`
:::

### Baratanje web zahtjeva

Da biste prevodili HTTPS web zahtjeve radnicima PHP-a, morat ćete konfigurirati obrnuti proxy.

#### Apache

Pixelfed uključuje `public/.htaccess` fajl koji je korišten da obezbijediti URL-ove bez index.php prednji kontroler u path-u. Prije služenje Pixelfed sa Apache, omogući `mod_rewrite` modul u tvojem Apache konfiguraciji tako da `.htaccess` fajl bit će počašćen od strane servera.

Ako `.htaccess` fajl koji se isporučuje s Pixelfed-om ne radi s vašom Apache instalacijom, isprobajte ovu alternativu:

```php
Options +FollowSymLinks -Indexes
RewriteEngine On

RewriteCond %{HTTP:Authorization} .
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

#### Nginx

Pixelfed uključuje primjerne NGINX konfiguracije na `contrib/nginx.conf`. Možete kopirati sadržaj ovoga fajla ili ga uključite ga u svoj `nginx.conf`. Zabilježite komentare i pobrinite se da postavite ispravno ime domene i root path.

```nginx{4,5,7,8,33,36,45}
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixelfed.example;                    # promjeni ovo na svoj fqdn
    root /usr/share/webapps/pixelfed/public;         # path do repo/public

    ssl_certificate /etc/nginx/ssl/server.crt;       # generiraj svoj
    ssl_certificate_key /etc/nginx/ssl/server.key;   # ili koristi letsencrypt

    ssl_protocols TLSv1.2;
    ssl_ciphers EECDH+AESGCM:EECDH+CHACHA20:EECDH+AES;
    ssl_prefer_server_ciphers on;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php-fpm/php-fpm.sock; # Budite sigurni da je ovo tačno
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; # ili $request_filename
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

server {                                             # Preusmjeri http na https
    server_name pixelfed.example;                    # promjeni ovo na tvoj fqdn
    listen 80;
    listen [::]:80;
    return 301 https://$host$request_uri;
}
```

::: tip FastCGI path
Budi siguran da koristiš tačan `fastcgi_pass` socket path za tvoju distribuciju i verziju od PHP-FPM. Na primjer, na Arch-u, ovo je `/run/php-fpm/php-fpm.sock`, ali na Ubuntu može biti `/run/php/php7.3-fpm.sock`, na Debian-u može biti `/var/run/php/php7.3-fpm.sock`, i tako dalje. Ako si konfiguriro PHP server preko TCP, možes isto proslijediti na njegov IP port, npr. `localhost:9000` po defaultu.
:::

::: tip Nginx web root
Budite sigurni da koristite `/public` direktoriju kao vaš server root, npr. `server {root /var/www/pixelfed/public;)`.
Ako ste stavili root za instalacijski direktorij (npr. `server {root /var/www/pixelfed;)` Pixelfed neće raditi.
:::

#### Dobivanje HTTPS certifikata

Za testiranje implementacije, možete generirati samopotpisani SSL certifikat. Na primjer:

```bash
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt
```

Za proizvodne implementacije morat ćete pribaviti certifikat od tijela za izdavanje certifikata. Možete automatizirati certificiranje od LetsEncrypt, besplatni izdavač certifikata, pomoću uslužnog programa kao što je [EFF Certbot](https://certbot.eff.org/) ili [acme.sh](https://acme.sh).

Primjer upotrebe certbot-a:
```bash
certbot --nginx -d pixelfed.example
```
