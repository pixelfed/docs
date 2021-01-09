# Rješavanje problema

## Horizon ne radi
Ovo znači da tvoje dozvole su pogrešne negdje. Budite sigurni da si pokrenuo `php artisan horizon` kao korisnik koji ima dozvole za repo i za Redis.

## Horizon seems to be working, but it's still showing as inactive.
Pokrenite `php artisan package:discover` ili `composer install`, i onda pokrenite `php artisan horizon:install` i `php artisan horizon:assets` i onda `php artisan route:cahce`. Ponovo pokrenite systemd servis ili ponovo pokrenite Horizon. Trebalo bi sada pokazati kao aktivno 
