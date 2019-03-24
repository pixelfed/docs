#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build

# navigate into the build output directory
cd .vuepress/dist

git add -A
git commit -m 'deploy'

git push -f git@github.com:pixelfed/docs.git master:gh-pages

cd -