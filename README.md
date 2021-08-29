t-rex website
=============

The [t-rex website](https://t-rex.tileserver.ch/) is created with [Zola](https://www.getzola.org/), a static site generator.

When pushing a branch, Github Actions generates the static pages, writes them into the `gh-pages` branch and pushes the repo. This updates the site on Github pages.

The `master` branch follows the `master` branch of [t-rex](https://github.com/t-rex-tileserver/t-rex) and is published on https://t-rex.tileserver.ch/dev/. The `release` branch documents the latest release and is published on https://t-rex.tileserver.ch/.

Update documentation after a release:

```
git checkout master
make bump oldversion=0.9.0 version=0.9.1
git commit -a -m "v0.9.1"
git checkout release
git merge master
git push
git checkout master
git push
```

Updating semantic-ui theme:

    npm install
    # edit theme
    make theme
