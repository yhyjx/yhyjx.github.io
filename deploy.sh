set -e

npm run docs:build

cd docs/.vitepress/dist

git init
git add -A
git commit -m '自动构建发布'
git push -f git@github.com:WorkaholicYuHao/WorkaholicYuHao.github.io.git master:pages

cd -