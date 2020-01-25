# Configuring Scheduler

The Task Scheduler is used to run periodic commands in the background. 

## Starting The Scheduler

When using the scheduler, you only need to add the following Cron entry to your server.

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

## Scheduled Commands

The following commands are used in the scheduler:

- ```media:optimize``` - Finds any un-optimized media and performs optimization
- ```media:gc``` - Finds any media not used in statuses older than 1 hour and deletes them
- ```horizon:snapshot``` - Generates Horizon analytics snapshot
- ```story:gc``` - Finds expired Stories and deletes them