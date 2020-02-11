# Prerequisites

Before you install Pixelfed, you will need to setup a webserver that meets the requirements:

- **Apache** (with mod_rewrite enabled) or **Nginx**
- **MySQL 5.6+**, **PostgreSQL 10+** or **MariaDB 10.2.7+**
- **PHP 7.2+** with the following extensions: bcmath, ctype, curl, exif, iconv, intl, json, mbstring, openssl, tokenizer, xml and zip
- **Redis** for in-memory caching and background task queueing
- **ImageMagick** for image processing
- **ffmpeg** for video processing

::: tip Image Optimization
If you want to enable image optimization including striping exif data, make sure you have ```JPEGOptim```, ```OptiPNG``` , ```PNGQuant``` and ```gifsicle``` installed (```Svgo``` Optional).
:::

::: tip Shared Hosting
At this stage, it's not possible to install Pixelfed by downloading a ZIP file and uploading the files to your web server. This is because Pixelfed uses a dependency-management system called [Composer](https://getcomposer.org) which needs to run on the command line.

This doesn't necessarily mean you need a VPS. Some shared hosts give you SSH access, through which you should be able to install Composer and Pixelfed just fine.
:::
