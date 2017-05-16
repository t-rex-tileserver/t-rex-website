+++
title = "Serving vector tiles"
+++

Serving vector tiles
====================

Usage
-----

    t_rex serve --dbconn postgresql://user:pass@localhost/osm2vectortiles

Tiles are then served at `http://localhost:6767/{layer}/{z}/{x}/{y}.pbf`

A list of all detected layers is available at [http://localhost:6767/](http://localhost:6767/)

Use a tile cache:

    t_rex serve --dbconn postgresql://user:pass@localhost/osm2vectortiles --cache /tmp/mvtcache

Run server with configuration file:

    t_rex serve --config osm2vectortiles.cfg


Server options
--------------

```
USAGE:
    t_rex serve [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --cache <DIR>              Use tile cache in DIR
        --clip <true|false>        Clip geometries
    -c, --config <FILE>            Load from custom config file
        --dbconn <SPEC>
            PostGIS connection postgresql://USER@HOST/DBNAME
        --simplify <true|false>    Simplify geometries
```
