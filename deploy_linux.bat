npm run generate
rm -r docs
cp -r dist docs

# bug in nuxt https://github.com/nuxt/nuxt.js/issues/8906
# replace absolute paths by relative paths

sed -i 's/e.p+"fonts/".\/fonts/g' docs/*.js
sed -i 's/n.p+"fonts/".\/fonts/g' docs/*.js
sed -i 's/src="\//src=".\//g' docs/index.html

rm orgchart.zip
zip -r orgchart.zip docs
git add *
git commit -am "update"
git push