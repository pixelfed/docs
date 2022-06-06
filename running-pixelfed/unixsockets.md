* Add pixelfed to the redis group
```
usermod -aG redis pixelfed
```
* Add pixelfed to the mysql group
```
usermod -aG mysql pixelfed
```
* Test - Confirm the pixelfed user is in those two new groups
```
groups pixelfed
```
![image](https://user-images.githubusercontent.com/17537000/171838222-466f774a-fa04-4011-b8d3-29c16cf3a93e.png)

----

## Part 9.1 - Unix Socket (Redis and MariaDB)
* Coming soon
* Edit these lines to match your new instance
```
    REDIS_SCHEME=unix
    REDIS_PATH=/var/run/redis/redis-server.sock
    REDIS_HOST=null
    REDIS_PASSWORD=null
    REDIS_PORT=null
```
![image](https://user-images.githubusercontent.com/17537000/171834219-cb27183d-374d-4c61-b987-c09bfa29b797.png)
