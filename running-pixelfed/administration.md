# Upravljanje svojom web stranicom

[[toc]]

## Ažuriranje Pixelfed-a

Nakon što si instaliro Pixelfed, možes ažurirati na najnoviji commits povlačenjem dev branch i obavljanjem potrebnih ažuriranja/migracije/caching

```bash
cd /path/to/pixelfed
git pull origin dev
composer install
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```

## Artisan komande

### Upravljanje korisnicima

- `user:admin`	Napraviti od korisnika administratora, ili ukloniti administrativne privilegije.
- `user:create`	Napravite novog korisnika
- `user:delete`	Izbriši korisnika
- `user:show`	Pokaži informacije korisnika
- `user:suspend`	Suspendirajte lokalnog korisnika.
- `user:unsuspend`	Unsuspendiraj lokalnog korisnika.
- `user:table`	Prikaži najnovije korisnike


Na primjer, možete korisniku dati administratorsku ulogu pomoću sljedeće komande:

```bash
php artisan user:admin username_here
```


### Popravite račune s rezerviranim imenima

Ovu komandu možete koristiti da popravite račune kreirane prije rezerviranja tog korisničkog imena.

```bash
php artisan fix:usernames
``` 

### Ukloni neiskorištene medije

Sa ovom komandom možeš da pokreneš kolekciju smeća na medijskim fajlovima. Ovo oslobađa prostor na disku. Sve datoteke koje su starije od sat vremena i koje se ne koriste u bilo kom statusu su uklonjene.

```bash
php artisan media:gc
```
