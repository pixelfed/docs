# CLI Cheatsheet

<!-- ## Admin accounts

Toggle admin status by username.   

For example, you can give a user the admin role with the following command:

```bash
php artisan user:admin username_here
```

## Disable 2FA

Disable two-factor authentication (2FA) for a specific account with the following command:

```bash
php artisan user:2fa
``` 

## Create User Account

Create a new user account:

```bash
php artisan user:create
``` 

## Verify Email

Verify email address of a specific account:

```bash
php artisan user:verifyemail
``` 

## Fix accounts with reserved names

You can run this command to fix accounts created before that username was reserved.
```bash
php artisan fix:usernames
``` 

## Remove unused media

With this command you can trigger the garbage collection on the media files. This frees up disk space. All files being older than one hour and which are not used in any status are removed.

```bash
php artisan media:gc
```

## Create an OAuth client

You can create an OAuth client from the command line using this command:

```bash
php artisan passport:client --personal
``` -->

## CLI Commands

All commands are prefixed with `php artisan`

## Basic
### clear-compiled
Remove the compiled class file
### db
Start a new database CLI session
### down
Put the application into maintenance / demo mode
### env
Display the current framework environment
### help
Displays help for a command
### horizon
Start a master supervisor in the foreground
### install
CLI Installer
### list
Lists commands
### migrate
Run the database migrations
### optimize
Cache the framework bootstrap files
### serve
Serve the application on the PHP development server
### test
Run the application tests
### tinker
Interact with your application
### ui
Swap the front-end scaffolding for the application
### up
Bring the application out of maintenance mode
### update
Run pixelfed schema updates between versions.

## auth
### auth:clear-resets
Flush expired password reset tokens
## backup
### backup:clean
Remove all backups older than specified number of days in config.
### backup:list
Display a list of all backups.
### backup:monitor
Monitor the health of all backups.
### backup:run
Run the backup.
## cache
### cache:clear
Flush the application cache
### cache:forget
Remove an item from the cache
### cache:table
Create a migration for the cache database table
## config
### config:cache
Create a cache file for faster configuration loading
### config:clear
Remove the configuration cache file
## db
### db:seed
Seed the database with records
### db:wipe
Drop all tables, views, and types
## email
### email:bancheck
Checks user emails for banned domains
## event
### event:cache
Discover and cache the application's events and listeners
### event:clear
Clear all cached events and listeners
### event:generate
Generate the missing events and listeners based on registration
### event:list
List the application's events and listeners
## fix
### fix:avatars
Replace old svg identicon avatars with default png avatar
### fix:hashtags
Fix Hashtags
### fix:likes
Fix Like counts
### fix:profile:duplicates
Fix duplicate profiles
### fix:statuscount
fix profile status count
### fix:usernames
Fix invalid usernames
## gc
### gc:failedjobs
Delete failed jobs over 1 month old
### gc:passwordreset
Delete password reset tokens over 24 hours old
## horizon
### horizon:clear
Delete all of the jobs from the specified queue
### horizon:continue
Instruct the master supervisor to continue processing jobs
### horizon:continue-supervisor
Instruct the supervisor to continue processing jobs
### horizon:forget
Delete a failed queue job
### horizon:install
Install all of the Horizon resources
### horizon:list
List all of the deployed machines
### horizon:pause
Pause the master supervisor
### horizon:pause-supervisor
Pause a supervisor
### horizon:publish
Publish all of the Horizon resources
### horizon:purge
Terminate any rogue Horizon processes
### horizon:snapshot
Store a snapshot of the queue metrics
### horizon:status
Get the current status of Horizon
### horizon:supervisors
List all of the supervisors
### horizon:terminate
Terminate the master supervisor so it can be restarted
## import
### import:cities
Import Cities to database
## instance
### instance:actor
Generate instance actor
## key
### key:generate
Set the application key
## make
Shortcuts to create new Laravel framework files. Useful for dev.
### make:cast
Create a new custom Eloquent cast class
### make:channel
Create a new channel class
### make:command
Create a new Artisan command
### make:component
Create a new view component class
### make:controller
Create a new controller class
### make:event
Create a new event class
### make:exception
Create a new custom exception class
### make:factory
Create a new model factory
### make:job
Create a new job class
### make:listener
Create a new event listener class
### make:mail
Create a new email class
### make:middleware
Create a new middleware class
### make:migration
Create a new migration file
### make:model
Create a new Eloquent model class
### make:notification
Create a new notification class
### make:observer
Create a new observer class
### make:policy
Create a new policy class
### make:provider
Create a new service provider class
### make:request
Create a new form request class
### make:resource
Create a new resource
### make:rule
Create a new validation rule
### make:seeder
Create a new seeder class
### make:test
Create a new test class
## media
### media:fix
Fix media on v0.10.8+
### media:gc
Delete media uploads not attached to any active statuses
### media:optimize
Find and optimize media that has not yet been optimized.
## migrate
### migrate:fresh
Drop all tables and re-run all migrations
### migrate:install
Create the migration repository
### migrate:refresh
Reset and re-run all migrations
### migrate:reset
ollback all database migrations
### migrate:rollback
Rollback the last database migration
### migrate:status
Show the status of each migration
## notifications
### notifications:table
Create a migration for the notifications table
### optimize
### optimize:clear
Remove the cached bootstrap files
## package
### package:discover
Rebuild the cached package manifest
## passport
### passport:client
Create a client for issuing access tokens
### passport:hash
Hash all of the existing secrets in the clients table
### passport:install
Run the commands necessary to prepare Passport for use
### passport:keys
Create the encryption keys for API authentication
### passport:purge
Purge revoked and / or expired tokens and authentication codes
## queue
Commands related to the queue worker.
### queue:batches-table
Create a migration for the batches database table
### queue:clear
Delete all of the jobs from the specified queue
### queue:failed
List all of the failed queue jobs
### queue:failed-table
Create a migration for the failed queue jobs database table
### queue:flush
Flush all of the failed queue jobs
### queue:forget
Delete a failed queue job
### queue:listen
Listen to a given queue
### queue:prune-batches
Prune stale entries from the batches database
### queue:restart
Restart queue worker daemons after their current job
### queue:retry
Retry a failed queue job
### queue:retry-batch
Retry the failed jobs for a batch
### queue:table
Create a migration for the queue jobs database table
### queue:work
Start processing jobs on the queue as a daemon
## regenerate
### regenerate:thumbnails
Regenerate thumbnails
## route
### route:cache
Create a route cache file for faster route registration
### route:clear
Remove the route cache file
### route:list
List all registered routes
## schedule
### schedule:list
List the scheduled commands
### schedule:run
Run the scheduled commands
### schedule:test
Run a scheduled command
### schedule:work
Start the schedule worker
## schema
### schema:dump
Dump the given database schema
## seed
### seed:follows
Seed follows for testing
## session
### session:table
Create a migration for the session database table
## status
### status:dedup
Removes duplicate statuses from before unique uri migration
## storage
### storage:link
Create the symbolic links configured for the application
## story
### story:gc
Clear expired Stories
## stub
### stub:publish
Publish all stubs that are available for customization
## ui
### ui:auth
Scaffold basic login and registration views and routes
### ui:controllers
Scaffold the authentication controllers
## user
### user:admin
Make a user an admin, or remove admin privileges.
### user:create
Create a new user
### user:delete
Delete account
### user:show
Show user info
### user:suspend
Suspend a local user.
### user:table
Display latest users
### user:unsuspend
Unsuspend a local user.
## vendor
### vendor:publish
Publish any publishable assets from vendor packages
## video
### video:thumbnail
Generate missing video thumbnails
## view
### view:cache
Compile all of the application's Blade templates
### view:clear
Clear all compiled view files