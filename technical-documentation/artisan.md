# Laravel Artisan

Laravel Artisan je komand line alat koji koristite za pokretanje migracija, cache konfiguracije i još mnogo toga.

Korištenje:
```bash
$ command [options] [arguments]
```


Primjer:
```bash
$ php artisan cache:clear
```

Ovo će u terminalu pokazati na engleskom, ali možete ovde pogledati šta sve znači.


| Opcije:| Informacije |
| ------ | ------ |
|  -h, --help            | Prikažite ovu poruku pomoći |
|  -q, --quiet           | Ne izlazite nijednu poruku |
|  -V, --version         | Prikažite verziju ove aplikacije |
|      --ansi            | Prisili ANSI izlaz |
|      --no-ansi         | Onemogući ANSI izlaz |
|  -n, --no-interaction  | Ne postavljajte interaktivna pitanja |
|      --env[=ENV]       | Okruženje pod kojim bi komanda trebala raditi |
|  -v vv vvv, --verbose  | Povećajte preopširnost poruka: 1 za normalni izlaz, 2 za više detaljnih rezultata i 3 za debug |
                        

| Dostupne komande: | Informacije |
| ------ | ------ |
|  down                    | Stavite aplikaciju u mode za održavanje |
|  env                     | Prikažite trenutno okruženje okvira |
|  help                    | Prikazuje pomoć za komande |
|  migrate                 | Pokrenite migracije database-a |
|  optimize                | Cache framework bootstrap datoteke |
|  self-diagnosis          | Izvršite samodijagnozu |
|  tinker                  | Interaktiraj sa vašom aplikacijom |
|  up                      | Izbacite aplikaciju iz mode za održavanje |
| **auth** |  | 
|  auth:clear-resets       | Izbriši istekle lozinke i resetiraj tokene |
| **backup** |  | 
|  backup:clean            | Uklonite sve kopije starije od određenog broja dana u konfiguraciji |
|  backup:list             | Prikažiti listu svih kopija |
|  backup:monitor          | Nadgledajte zdravlje svih kopija |
|  backup:run              | Pokrenite kopiranje |
| **cache** |  | 
|  cache:clear             | Izbrišite aplikacijski cache | 
|  cache:forget            | Uklonite stavku iz cache | 
| **config** |  | 
|  config:cache             | Stvorite cache za brže učitavanje konfiguracije | 
|  config:clear             | Uklonite konfiguracijiski cache fajl | 
| **email** | | 
|  email:bancheck          | Provjeravi korisničku e-poštu za zabranjene domene | 
| **fix** | | 
|  fix:avatars             | Zamjeni stare svg identicon avatars sa zadanim png avatar | 
|  fix:hashtags            | Popravi Hashtags | 
|  fix:likes               | Popravi Like counts | 
|  fix:profile:duplicates   | Popravi duplicirane račune | 
|  fix:usernames           | Popravi neispravne korisnička imena | 
| **horizon** |  | 
|  horizon:assets           | Ponovno objavite sredstva Horizon-a | 
|  horizon:continue         | Uputite glavnog supervisor-a da nastavi obradu poslova | 
|  horizon:install          | Instalirajte sve resurse od programa Horizon | 
|  horizon:list             | Navedite sve postavljene mašine | 
|  horizon:pause            | Pauziraj glavni supervisor | 
|  horizon:purge            | Završite bilo koji nevaljali Horizon proces | 
|  horizon:snapshot         | Pohranite snimak mjernih podataka | 
|  horizon:status           | Dohvatite trenutni status Horizon-a | 
|  horizon:supervisors      | Navedi sve supervisors | 
|  horizon:terminate        | Završite glavnog supervisor-a kako bi ste mogli ponovo pokrenuti | 
| **import** |  | 
|  import:cities            | Uvoz gradova u bazu podataka | 
| **key** |  | 
|  key:generate             | Postavite aplikacijski ključ | 
| **media** |  | 
|  media:gc                 | Izbrišite prijenose medija koji nisu pridruženi nijednom aktivnom statusu | 
|  media:optimize           | Pronađite i optimizirajte medije koji još nisu optimizirani | 
| **migrate** |  | 
|  migrate:install          | Izradi migracijski repository | 
| **optimize** |  | 
|  optimize:clear           | Uklonite cached bootstrap fajlove | 
| **passport** |  | 
|  passport:client          | Kreirajte klijenta za izdavanje pristupnih tokena | 
|  passport:install         | Pokrenite naredbe potrebne za pripremu Passport-a za upotrebu | 
|  passport:keys            | Stvorite ključeve za šifriranje za autentifikaciju API-ja | 
| **queue** |  | 
|  queue:failed             | Navedite sve neuspjele poslove reda | 
|  queue:flush              | Izbrišite sve neuspjele poslove reda | 
|  queue:forget             | Izbrišite neuspjeli posao u redu | 
|  queue:listen             | Slušajte zadati red | 
|  queue:restart            | Ponovo pokrenite daemon radnika u redu čekanja nakon njihovog trenutnog posla | 
|  queue:retry              | Pokušajte ponovo sa neuspjelim zadatkom reda | 
|  queue:work               | Počnite obrađivati poslove u redu kao daemon | 
| **regenerate** |  | 
|  regenerate:thumbnails    | Obnovite sličice | 
| **route** |  | 
|  route:cache              | stvorite datoteku cache route za bržu registraciju route | 
|  route:clear              | Uklonite datoteku cache route | 
|  route:list               | Navedi sve registrovane routes | 
| **schedule** |  | 
|  schedule:run             | Pokrenite zakazane komande | 
| **status** |  | 
|  status:dedup            | Uklanja duplikate statusa prije jedinstvene migracije uri-ja | 
| **storage** | | 
|  storage:link            | Stvorite simboličku vezu od "public/storage" na "storage/app/public" | 
| **user** |  |
|  user:admin              | Postavite korisnika za administratora ili uklonite administratorske privilegije | 
|  user:create             | Napravite novog korisnika | 
|  user:delete             | Izbrišite korisnika | 
|  user:show               | Prikaži informacije od korisnika | 
|  user:suspend            | Suspendirajte lokalnog korisnika | 
|  user:table              | Prikaži najnovije korisnike | 
|  user:unsuspend          | Probudite lokalnog korisnika | 
| **video** |  | 
|  video:thumbnail         | Generirajte sličice videozapisa koje nedostaju | 
| **view** |  |
|  view:cache              | Kompajlirajte sve Blade predloške aplikacije | 
|  view:clear              | Obriši sve kompajlirane datoteke prikaza | 
