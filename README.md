<p align="center"><img src="https://pixelfed.nyc3.cdn.digitaloceanspaces.com/logos/pixelfed-full-color.svg" width="300px"></p>

<p align="center">
<a href="https://circleci.com/gh/pixelfed/pixelfed"><img src="https://circleci.com/gh/pixelfed/pixelfed.svg?style=svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/pixelfed/pixelfed"><img src="https://poser.pugx.org/pixelfed/pixelfed/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/pixelfed/pixelfed"><img src="https://poser.pugx.org/pixelfed/pixelfed/license.svg" alt="License"></a>
</p>

## Introduction

A free and ethical photo sharing platform, powered by ActivityPub federation.

<p align="center">
<img src="https://pixelfed.nyc3.cdn.digitaloceanspaces.com/media/pixelfed-screenshot.jpg">
</p>

Pixelfed is freely licensed under the AGPL license.

## Communication

The ways you can communicate on the project are below. Before interacting, please
read through the [Code Of Conduct](CODE_OF_CONDUCT.md).

* Project on Mastodon: [@pixelfed@mastodon.social](https://mastodon.social/@pixelfed)
* E-mail: [hello@pixelfed.org](mailto:hello@pixelfed.org)


## Pixelfed Sponsors

We would like to extend our thanks to the following sponsors for funding Pixelfed development. If you are interested in becoming a sponsor, please visit the Pixelfed [Patreon Page](https://www.patreon.com/dansup/overview)

- [NLnet Foundation](https://nlnet.nl) and [NGI0
Discovery](https://nlnet.nl/discovery/), part of the [Next Generation
Internet](https://ngi.eu) initiative.

## Development

This documentation is built using [Hugo](https://gohugo.io/) and uses the [Paradox theme](https://github.com/trwnh/hugo-theme-paradox).

1. Install Hugo, following the [instructions for your environment](https://gohugo.io/getting-started/installing/)
2. Clone the repository `git clone git@github.com:pixelfed/docs.git`
3. Initiate the git submodules   
    ```
    cd docs
    git submodule init
    git submodule update
    ```
4. Run `hugo serve` to start a live development server on [localhost:1313](http://localhost:1313/)