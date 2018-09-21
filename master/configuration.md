# Configuration

Pixelfed uses the ```.env``` environment configuration file, it is created automatically by the installer, otherwise you need to copy the ```.env.example``` file to ```.env``` manually.

[[toc]]

### config/app.php

| name | description | default value | required |
| --- | --- | --- | --- |
| ```APP_NAME``` | Application name | ```Pixelfed``` | y |
| ```APP_ENV``` | **Application Environment**  <br> This value determines the "environment" your application is currently running in. This may determine how you prefer to configure various services your application utilizes. Set this in your ".env" file. We recommend you set it to ```production``` if you are running a public instance in production. | ```dev``` | y |
| ```APP_KEY``` | **Encryption Key** <br> This key is used by the Illuminate encrypter service and should be set to a random, 32 character string, otherwise these encrypted strings will not be safe. Please do this before deploying an application! | | y |
| ```APP_DEBUG``` | **Application Debug Mode** <br> This is only used for development, for security reasons it should always be set to ```false``` on production or public instances since this can expose all configuration settings | ```true``` | y |