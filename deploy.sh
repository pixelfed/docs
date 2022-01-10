#!/bin/bash

# abort on errors
set -e

# build
vuepress build

# navigate into the build output directory
cd .vuepress/dist

echo 'docs.pixelfed.org' > CNAME

git init
git add .
git commit -m 'deploy'

git push -f https://github.com/pixelfed/docs.git master:gh-pages

cd -