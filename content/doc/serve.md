+++
title = "Serving vector tiles"
order = 2
+++

Serving vector tiles
====================

Usage
-----

    t_rex serve --dbconn postgresql://user:pass@localhost/dbname

Tiles are then served at `http://localhost:6767/{layer}/{z}/{x}/{y}.pbf`

A list of all detected layers is available at [http://localhost:6767/](http://localhost:6767/)

Use a tile cache:

    t_rex serve --dbconn postgresql://user:pass@localhost/dbname --cache /tmp/mvtcache

Run server with configuration file:

    t_rex serve --config config.toml


Server options
--------------

```java
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
