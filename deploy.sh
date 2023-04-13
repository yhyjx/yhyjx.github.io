!/bin/sh

set -e

npm run docs:build

git add -A
npm run commit
git push

cd docs/.vitepress
cp public/* dist
cd -
cd docs/.vitepress/dist

git init
git add -A
npm run commit
git push -f git@github.com:yhyjx/yhyjx.github.io.git master:pages

cd -


