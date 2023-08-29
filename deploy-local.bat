npm run generate

# bug in nuxt https://github.com/nuxt/nuxt.js/issues/8906
# replace absolute paths by relative paths

sed -i 's/e.p+"fonts/".\/fonts/g' dist/*.js
sed -i 's/n.p+"fonts/".\/fonts/g' dist/*.js
sed -i 's/src="\//src=".\//g' dist/index.html
