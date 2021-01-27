git branch -f gh-pages

git checkout gh-pages

git reset --hard origin/master

npm run build

cp -r dist/* .

echo 'navgurukul.org' > CNAME

git add -A .

git commit -a -m 'gh-pages update'

git push origin gh-pages --force

git checkout master