#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build

# navigate into the build output directory
cd .vuepress/dist

git add -A
git commit -m 'deploy'

git push origin gh-pages

cd -