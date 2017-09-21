serve:
	gutenberg serve

gh-pages:
	gutenberg build
	git checkout gh-pages && cp -r public/* .

theme:
	cd semantic && ../node_modules/.bin/gulp build
	rm -rf static/components static/themes static/semantic*
	cp -r semantic/dist/* static/
