+++
title = "Livestreaming (Pixelfed Live)"
summary = "Pixelfed Live is a mobile based livestreaming feature."
weight = 41
[menu]
[menu.docs]
identifier = "admin/optional/live"
parent = "admin/optional"
+++

## Installing and Configuring Nginx-RTMP

Begin by running the following commands as a non-root user to update your package listings and install the Nginx module:

```bash
sudo apt update
sudo apt install libnginx-mod-rtmp
```

Installing the module won’t automatically start providing a stream. You’ll need to add a configuration block to your Nginx configuration file that defines where and how the stream will be available.

Using nano or your favorite text editor, open Nginx’s main configuration file, /etc/nginx/nginx.conf, and add this configuration block to the end of the file:

```bash
sudo nano /etc/nginx/nginx.conf
```

Make sure you edit lines **16**, **17** with your domain (leave http:// and the path as is), and line **29** with the path to your `storage/app/public/live-hls` directory

```bash
rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            record off;
            interleave on;
            wait_key on;
            
            deny play all;

            push rtmp://127.0.0.1:1935/hls-live flashver=FMLE/3.0;
            
            on_publish http://localhost/api/live/broadcast/publish;
            on_publish_done http://localhost/api/live/broadcast/finish;
        }

        application hls-live {
            live on;
            hls on;
            interleave on;

            deny play all;
            allow publish 127.0.0.1;
            deny publish all;

            hls_path /home/pixelfed/storage/app/public/live-hls;
        
            hls_nested on;
            hls_fragment 5s;
            hls_playlist_length 30s;
            hls_fragment_naming system;
        }
    }
}
```

Save and close the file. If you are using `nano`, press <kbd>Ctrl+X</kbd>, then when prompted, <kbd>Y</kbd> and <kbd>Enter</kbd>.

This provides the beginning of your RTMP configuration. By default, it listens on port 1935, which means you’ll need to open that port in your firewall. If you configured ufw as part of your initial server setup run the following command.

```bash
sudo ufw allow 1935/tcp
```

Now you can reload Nginx with your changes:

```bash
sudo systemctl reload nginx.service
```

You should now have a working RTMP server. In the next section, we’ll configure the environment settings.

## Configure Livestreaming Settings

Now you have the RTMP server setup, you can proceed to add the following environment variables to your `.env` file.

### Basic configuration

```bash
// Enable Pixelfed Live
HLS_LIVE=true

// RTMP server domain
HLS_LIVE_HOST=pixelfed.social

// Enable livestreaming from the Pixelfed Live app
HLS_LIVE_BROADCAST_SOURCE_APP=true
```

### Advanced configuration

In addition to the basic configuration variables, the following variables can be used optionally

#### Stream Limits

```bash
// Max concurrent live streams
HLS_LIVE_BROADCAST_MAX_ACTIVE=10

// Max stream duration in minutes
HLS_LIVE_BROADCAST_MAX_DURATION=60
```

#### User Limits

Advanced control over who can livestream

```bash
// Enable broadcast limits
HLS_LIVE_BROADCAST_LIMITS=true

// Only allow users with over 1000 followers to go live
HLS_LIVE_BROADCAST_LIMITS_MIN_FOLLOWERS=1000

// Only allow users with accounts older than 90 days to go live
HLS_LIVE_BROADCAST_LIMITS_MIN_ACCOUNT_AGE=90

// Only allow admin accounts to go live
HLS_LIVE_BROADCAST_LIMITS_ADMINS_ONLY=true
```
