---
title = "Pixelfed Push Notifications"
summary = "Instructions on Push Notifications support"
weight = 20
[menu]
[menu.docs]
---

# Push Notifications

::: warning
Push Notifications are experimental and only supported on our official mobile apps.
:::

[[toc]]

## Overview

Push notifications enhance the Pixelfed experience by delivering real-time updates directly to users' devices. These notifications inform users about new followers, likes, comments, and other important interactions, keeping them engaged with their community.

## Availability

Currently, push notifications are limited to the official Pixelfed mobile applications. We plan to support web push and 3rd party applications in the future.


## Instance Approval and API Key Requirement

To enable push notifications on your Pixelfed instance, you must obtain manual approval and a unique API key from the Pixelfed team. This process helps maintain the integrity and performance of the push notification service across the network.

### Steps to Enable Push Notifications for Your Instance

1) **Contact the Pixelfed Team**: Reach out to us at hello@pixelfed.org with your request to enable push notifications for your instance. Please include the following information:
	- Email subject should contain "**Push Notification Gateway Request**"
	- Your instance's domain name
	- Administrator contact details
	- Mention you will abide by our [Code of Conduct](https://github.com/pixelfed/pixelfed/blob/dev/CODE_OF_CONDUCT.md)
	- Brief description of your instance and community

2) **Await Approval**: The Pixelfed team will review your request and may reach out for additional information. Approval is granted on a case-by-case basis to ensure compliance with our guidelines.

3) **Receive Your API Key**: Once approved, you will be provided with a unique API key specific to your instance.

4) **Configure Your Instance**: Update your instance settings to include the provided API key. Refer to the [Configuration](#configuration) docs.

## Configuration

Once you recieve your API key, you need to perform the following steps to enable Push Notification support on your server.

1) Add your API key to your `.env`
```
PIXELFED_PUSHGATEWAY_KEY=XXXXXXXXXX
```

2) Re-cache config by running the following command:
```
php artisan config:cache
```

3) Run the following command and force a re-check:
```
php artisan app:push-gateway-refresh
```

4) Re-deploy or run the following command (if you are using the Horizon job queue):
```
php artisan horizon:terminate
```

## Contact Us

For any questions or to begin the approval process for push notifications on your instance, please reach out:

- Email: hello@pixelfed.org
- Website: https://pixelfed.org

We appreciate your cooperation as we work towards supporting third-party apps while maintaining a secure and efficient network for all Pixelfed users.