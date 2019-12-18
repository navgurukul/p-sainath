gulp build
cp -r dist/* ../dikhava/
cd ../dikhava/
git add *
git pull
git commit -am "New Version"
git push
