+++
title = "Generating vector tiles"
order = 3
+++

Generating vector tiles
=======================

Cache generation
----------------

A tile cache can be generated with the `t_rex generate` command:

```java
USAGE:
    t_rex generate [OPTIONS] --config <FILE>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -c, --config <FILE>                   Load from custom config file
        --extent <minx,miny,maxx,maxy>    Extent of tiles
        --maxzoom <LEVEL>                 Maximum zoom level
        --minzoom <LEVEL>                 Minimum zoom level
        --nodeno <NUM>                    Number of this nodes (0 <= n < nodes)
        --nodes <NUM>                     Number of generator nodes
        --progress <true|false>           Show progress bar
        --tileset <NAME>                  Tileset name
```

Usage
-----

Generate tiles for cache:

    t_rex generate --config config.toml


### MBTiles creation

To create MBTiles files with vector tiles from a local cache you can use [MBUtil](https://github.com/mapbox/mbutil).

Example:

    mb-util --image_format=pbf --scheme=tms /tmp/mvtcache/streets streets.mbtiles
