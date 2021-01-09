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
|  down                    | Put the application into maintenance mode |
|  env                     | Display the current framework environment |
|  help                    | Displays help for a command |
|  migrate                 | Run the database migrations |
|  optimize                | Cache the framework bootstrap files |
|  self-diagnosis          | Perform application self diagnosis. |
|  tinker                  | Interact with your application |
|  up                      | Bring the application out of maintenance mode |
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
| **config** |  | 
|  config:cache             | Create a cache file for faster configuration loading | 
|  config:clear             | Remove the configuration cache file | 
| **email** | | 
|  email:bancheck          | Checks user emails for banned domains | 
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
| **media** |  | 
|  media:gc                 | Delete media uploads not attached to any active statuses | 
|  media:optimize           | Find and optimize media that has not yet been optimized. | 
| **migrate** |  | 
|  migrate:install          | Create the migration repository | 
| **optimize** |  | 
|  optimize:clear           | Remove the cached bootstrap files | 
| **passport** |  | 
|  passport:client          | Create a client for issuing access tokens | 
|  passport:install         | Run the commands necessary to prepare Passport for use | 
|  passport:keys            | Create the encryption keys for API authentication | 
| **queue** |  | 
|  queue:failed             | List all of the failed queue jobs | 
|  queue:flush              | Flush all of the failed queue jobs | 
|  queue:forget             | Delete a failed queue job | 
|  queue:listen             | Listen to a given queue | 
|  queue:restart            | Restart queue worker daemons after their current job | 
|  queue:retry              | Retry a failed queue job | 
|  queue:work               | Start processing jobs on the queue as a daemon | 
| **regenerate** |  | 
|  regenerate:thumbnails    | Regenerate thumbnails | 
| **route** |  | 
|  route:cache              | Create a route cache file for faster route registration | 
|  route:clear              | Remove the route cache file | 
|  route:list               | List all registered routes | 
| **schedule** |  | 
|  schedule:run             | Run the scheduled commands | 
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
| **video** |  | 
|  video:thumbnail         | Generate missing video thumbnails | 
| **view** |  |
|  view:cache              | Compile all of the application's Blade templates | 
|  view:clear              | Clear all compiled view files | 
