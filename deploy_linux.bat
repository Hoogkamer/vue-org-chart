npm run build
rm -r docs
cp -r dist docs
rm orgchart.zip
zip -r orgchart.zip docs
git add *
git commit -am "update"
git push