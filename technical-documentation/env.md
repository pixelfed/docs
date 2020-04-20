# Configuration

Pixelfed uses the ```.env``` environment configuration file, it is created automatically by the installer, otherwise you need to copy the ```.env.example``` file to ```.env``` manually. Some of these values do not exist in .env.example but you can add them to .env.

::: warning
Whenever you edit the ```.env``` file, you must run ```php artisan config:cache``` in the root directory for the changes to take effect. If you changed route related configuration (url, domains), you must also run ```php artisan route:cache```.
:::

<br>

[[toc]]

<br>

### Application Configuration

| name | description | default value | required |
| --- | --- | --- | --- |
| ```APP_NAME``` | **Application name** | ```Pixelfed``` | y |
| ```APP_ENV``` | **Application Environment**  <br> This value determines the "environment" your application is currently running in. This may determine how you prefer to configure various services your application utilizes. Set this in your ".env" file. We recommend you set it to ```production``` if you are running a public instance in production. | ```dev``` | y |
| ```APP_KEY``` | **Encryption Key** <br> This key is used by the Illuminate encrypter service and should be set to a random, 32 character string, otherwise these encrypted strings will not be safe. Please do this before deploying an application! | | y |
| ```APP_DEBUG``` | **Application Debug Mode** <br> This is only used for development, for security reasons it should always be set to ```false``` on production or public instances since this can expose all configuration settings | ```true``` | y |
| ```APP_URL``` | **Application URL** <br> This is used to generate URLs, set this to your instance URL. | ```https://example.org``` | y |
| ```APP_DOMAIN``` | **Application Domain** <br> This value is used for routing, set it to the domain of your instance. | ```example.org``` | y |
| ```ADMIN_DOMAIN``` | **Admin Dashboard Domain** <br> This value is used for your admin dashboard domain, its possible to use the same value as ```APP_DOMAIN``` or use a sub-domain. | ```example.org``` | y |
| ```LOG_CHANNEL``` | **Log Channel** <br> This option defines the default log channel that gets used when writing messages to the logs. The name specified in this option should match one of the channels defined in the "channels" configuration array. | ```stack``` | n |

### Database Configuration
| name | description | default value | required |
| --- | --- | --- | --- |
| ```DB_CONNECTION``` | **Database Driver** <br> Supported drivers: ```mysql sqlite pgsql```  | ```mysql``` | y |
| ```DB_HOST``` | **Database Host** <br> The database host address. | ```127.0.0.1``` | y |
| ```DB_PORT``` | **Database Port** <br> The database host port. | ```3306``` | y |
| ```DB_DATABASE``` | **Database Name** <br> The database name. | ```pixelfed``` | y |
| ```DB_USERNAME``` | **Database Username** <br> The database username. |  | y |
| ```DB_PASSWORD``` | **Database Password** <br> The database user password. |  | y |

### Redis Configuration
Using redis for the ```QUEUE_DRIVER```, ```CACHE_DRIVER``` and ```SESSION_DRIVER``` is optional.

| name | description | default value | required |
| --- | --- | --- | --- |
| ```REDIS_SCHEME``` | **Redis Scheme** <br> Type of connection to the redis server (```tcp``` or ```unix```-socket). | ```tcp``` | n |
| ```REDIS_HOST``` | **Redis Host** <br> The redis server host address (only needed for ```REDIS_SCHEME=tcp```). | ```localhost``` | n |
| ```REDIS_PASSWORD``` | **Redis Password** <br> The redis server host password (only needed for ```REDIS_SCHEME=tcp```). | ```null``` | n |
| ```REDIS_PORT``` | **Redis Port** <br> The redis server port (only needed for ```REDIS_SCHEME=tcp```). | ```6379``` | n |
| ```REDIS_PATH``` | **Redis Socket** <br> Path to the redis socket (only needed for ```REDIS_SCHEME=unix```). | ```null``` | n |
| ```REDIS_DB```| **Redis Database** <br> The redis server database index number. | ```0``` | n |


### Pixelfed Configuration

| name | description | default value | required |
| --- | --- | --- | --- |
| ```OPEN_REGISTRATION``` | **Open Registration** <br> Allow new user registrations. | ```true``` | n |
| ```ENFORCE_EMAIL_VERIFICATION``` | **Enforce Email Verification** <br> Require new users to verify their email before they can do anything. | ```true``` | n |
| ```MAX_ACCOUNT_SIZE``` | **Account file size limit** <br> Update the max account size, the per user limit of files in KB. Requires ```LIMIT_ACCOUNT_SIZE``` to be set to ```true```. | ```1000000``` (1GB) | n |
| ```MAX_PHOTO_SIZE``` | **Photo file size limit** <br> Update the max photo size, in KB. | ```15000``` (15MB) | n |
| ```MAX_CAPTION_LENGTH``` | **Caption limit** <br> Change the caption length limit for new local posts. | ```500``` | n |
| ```MAX_BIO_LENGTH``` | **Bio length limit** <br> Change the bio length limit for user profiles. | ```125``` | n |
| ```MAX_NAME_LENGTH``` | **User name length limit** <br> Change the length limit for user names. | ```30``` | n |
| ```MAX_ALBUM_LENGTH``` | **Album size limit** <br> The max number of photos allowed per post. | ```4``` | n |
| ```IMAGE_QUALITY``` | **Image Quality** <br> Set the image optimization quality, must be a value between 1-100. | ```80``` | n |

### ActivityPub Configuration

| name | description | default value | required |
| --- | --- | --- | --- |
| ```ACTIVITY_PUB``` | Enable ActivityPub federation. | ```false``` | n |


