# Laravel Artisan

TODO

::: warning WIP
This page is a stub.
:::

## Laravel Framework 6.6.0

Usage:
```bash{1}
$ command [options] [arguments]
```


Example:
```bash{1}
$ sudo -u www-data /usr/bin/php7.3 /var/www/pixelfed/artisan cache:clear
```




| Options:| Info |
| ------ | ------ |
|  -h, --help            | Display this help message |
|  -q, --quiet           | Do not output any message |
|  -V, --version         | Display this application version |
|      --ansi            | Force ANSI output |
|      --no-ansi         | Disable ANSI output |
|  -n, --no-interaction  | Do not ask any interactive question |
|      --env[=ENV]       | The environment the command should run under |
|  -v vv vvv, --verbose  | Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug |



| Available commands: | Info |
| ------ | ------ |
|  clear-compiled          | Remove the compiled class file |
|  down                    | Put the application into maintenance mode |
|  env                     | Display the current framework environment |
|  help                    | Displays help for a command |
|  insights                | Analyze the code quality |
|  install                 | CLI Installer |
|  list                    | Lists commands |
|  migrate                 | Run the database migrations |
|  optimize                | Cache the framework bootstrap files |
|  preset                  | Swap the front-end scaffolding for the application |
|  self-diagnosis          | Perform application self diagnosis. |
|  serve                   | Serve the application on the PHP development server |
|  tinker                  | Interact with your application |
|  up                      | Bring the application out of maintenance mode |
|  update                  | Run pixelfed schema updates between versions. |
| **auth** |  | 
|  auth:clear-resets       | Flush expired password reset tokens |
| **backup** |  | 
|  backup:clean            | Remove all backups older than specified number of days in config. |
|  backup:list             | Display a list of all backups. |
|  backup:monitor          | Monitor the health of all backups. |
|  backup:run              | Run the backup. |
| **cache** |  | 
|  cache:clear             | Flush the application cache | 
|  cache:forget            | Remove an item from the cache | 
|  cache:table             | Create a migration for the cache database table | 
| **config** |  | 
|  config:cache             | Create a cache file for faster configuration loading | 
|  config:clear             | Remove the configuration cache file | 
| **db** | | 
|  db:seed                 | Seed the database with records | 
|  db:wipe                 | Drop all tables, views, and types | 
| **debugbar** | | 
|  debugbar:clear          | Clear the Debugbar Storage | 
| **email** | | 
|  email:bancheck          | Checks user emails for banned domains | 
| **event** | | 
|  event:cache             | Discover and cache the application's events and listeners | 
|  event:clear             | Clear all cached events and listeners | 
|  event:generate          | Generate the missing events and listeners based on registration | 
|  event:list              | List the application's events and listeners | 
| **fix** | | 
|  fix:avatars             | Replace old svg identicon avatars with default png avatar | 
|  fix:hashtags            | Fix Hashtags | 
|  fix:likes               | Fix Like counts | 
|  fix:profile:duplicates   | Fix duplicate profiles | 
|  fix:usernames           | Fix invalid usernames | 
| **horizon** |  | 
|  horizon:assets           | Re-publish the Horizon assets | 
|  horizon:continue         | Instruct the master supervisor to continue processing jobs | 
|  horizon:install          | Install all of the Horizon resources | 
|  horizon:list             | List all of the deployed machines | 
|  horizon:pause            | Pause the master supervisor | 
|  horizon:purge            | Terminate any rogue Horizon processes | 
|  horizon:snapshot         | Store a snapshot of the queue metrics | 
|  horizon:status           | Get the current status of Horizon | 
|  horizon:supervisors      | List all of the supervisors | 
|  horizon:terminate        | Terminate the master supervisor so it can be restarted | 
| **import** |  | 
|  import:cities            | Import Cities to database | 
| **key** |  | 
|  key:generate             | Set the application key | 
| **make** |  | 
|  make:channel             | Create a new channel class | 
|  make:command             | Create a new Artisan command | 
|  make:controller          | Create a new controller class | 
|  make:event               | Create a new event class | 
|  make:exception           | Create a new custom exception class | 
|  make:factory             | Create a new model factory | 
|  make:job                 | Create a new job class | 
|  make:listener            | Create a new event listener class | 
|  make:mail                | Create a new email class | 
|  make:middleware          | Create a new middleware class | 
|  make:migration           | Create a new migration file | 
|  make:model               | Create a new Eloquent model class | 
|  make:notification         | Create a new notification class | 
|  make:observer            | Create a new observer class | 
|  make:policy              | Create a new policy class | 
|  make:provider            | Create a new service provider class | 
|  make:request             | Create a new form request class | 
|  make:resource            | Create a new resource | 
|  make:rule                | Create a new validation rule | 
|  make:seeder              | Create a new seeder class | 
|  make:test                | Create a new test class | 
| **media** |  | 
|  media:gc                 | Delete media uploads not attached to any active statuses | 
|  media:optimize           | Find and optimize media that has not yet been optimized. | 
| **migrate** |  | 
|  migrate:fresh            | Drop all tables and re-run all migrations | 
|  migrate:install          | Create the migration repository | 
|  migrate:refresh          | Reset and re-run all migrations | 
|  migrate:reset            | Rollback all database migrations | 
|  migrate:rollback         | Rollback the last database migration | 
|  migrate:status           | Show the status of each migration | 
| **notifications** |  | 
|  notifications:table       | Create a migration for the notifications table | 
| **optimize** |  | 
|  optimize:clear           | Remove the cached bootstrap files | 
| **package** |  | 
|  package:discover         | Rebuild the cached package manifest | 
| **passport** |  | 
|  passport:client          | Create a client for issuing access tokens | 
|  passport:install         | Run the commands necessary to prepare Passport for use | 
|  passport:keys            | Create the encryption keys for API authentication | 
| **queue** |  | 
|  queue:failed             | List all of the failed queue jobs | 
|  queue:failed-table       | Create a migration for the failed queue jobs database table | 
|  queue:flush               | Flush all of the failed queue jobs | 
|  queue:forget             | Delete a failed queue job | 
|  queue:listen             | Listen to a given queue | 
|  queue:restart            | Restart queue worker daemons after their current job | 
|  queue:retry              | Retry a failed queue job | 
|  queue:table              | Create a migration for the queue jobs database table | 
|  queue:work               | Start processing jobs on the queue as a daemon | 
| **regenerate** |  | 
|  regenerate:thumbnails    | Regenerate thumbnails | 
| **route** |  | 
|  route:cache              | Create a route cache file for faster route registration | 
|  route:clear              | Remove the route cache file | 
|  route:list               | List all registered routes | 
| **schedule** |  | 
|  schedule:run             | Run the scheduled commands | 
| **seed** |  | 
|  seed:follows             | Seed follows for testing | 
| **session** |  | 
|  session:table            | Create a migration for the session database table | 
| **status** |  | 
|  status:dedup            | Removes duplicate statuses from before unique uri migration | 
| **storage** | | 
|  storage:link            | Create a symbolic link from "public/storage" to "storage/app/public" | 
| **user** |  |
|  user:admin              | Make a user an admin, or remove admin privileges. | 
|  user:create             | Create a new user | 
|  user:delete             | Delete account | 
|  user:show               | Show user info | 
|  user:suspend            | Suspend a local user. | 
|  user:table              | Display latest users | 
|  user:unsuspend          | Unsuspend a local user. | 
| **vendor** |  |
|  vendor:publish          | Publish any publishable assets from vendor packages | 
| **video** |  | 
|  video:thumbnail         | Generate missing video thumbnails | 
| **view** |  |
|  view:cache              | Compile all of the application's Blade templates | 
|  view:clear              | Clear all compiled view files | 
