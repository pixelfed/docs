+++
title = "Setting up your environment"
summary = "Download and install the pre-requisites, then run these commands."
weight = 10
[menu]
[menu.docs]
identifier = "development/intro"
parent = "development"
+++

## Requirements
- Git
- PHP
- Composer
- Node
- NPM

## Development Setup
For local/non-production use only.
```bash
git clone https://github.com/pixelfed/pixelfed
cd pixelfed
composer install
php artisan install
php artisan serve

# Laravel development server started: http://127.0.0.1:8000
```