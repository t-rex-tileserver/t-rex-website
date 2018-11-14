t-rex website
=============

The [t-rex website](https://t-rex.tileserver.ch/) is created with
[gutenberg](https://github.com/Keats/gutenberg), a static site generator. The UI is styled with the [Semantic UI](https://semantic-ui.com/) library.

When pushing a branch, Travis CI generates the static pages, writes them into the `gh-pages` branch and pushes the repo. This updates the site on Github pages.

The `master` branch follows the `master` branch of [t-rex](https://github.com/t-rex-tileserver/t-rex) and is published on https://t-rex.tileserver.ch/dev/. The `release` branch documents the latest release and is published on https://t-rex.tileserver.ch/.

Some tasks are automated in a [Justfile](https://github.com/casey/just/).

* `just`: Serve site
* `just --list`: List all tasks

Updating semantic-ui theme:

    npm install
    # edit theme
    just theme
