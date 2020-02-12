# v1 API

[[toc]]

Our v1 API is based on the [mastodon v1 API](https://docs.joinmastodon.org/methods/apps/). You can reference the Mastodon documentation, we listed the differences below.

## Authorization
We use OAuth for api authentication, you can create an OAuth app or Personal Access Token in the Account Settings on Pixelfed.

## Differences with Mastodon API
- Some endpoints return empty arrays as they are not applicable to Pixelfed
- Link Header Pagination is not supported
- Custom limits for captions and albums, they are listed on the /api/v1/instance endpoint
- OAuth Tokens will expire after 15 days, and must be refreshed after that

## Libraries
### PHP
- [dansup/pixelfed-php](https://github.com/dansup/pixelfed-php)