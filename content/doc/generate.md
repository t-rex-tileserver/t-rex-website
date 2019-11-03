+++
title = "Generating vector tiles"
weight = 3
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
    -c, --config <FILE>                             Load from custom config file
        --extent <minx,miny,maxx,maxy>              Extent of tiles
        --loglevel <error|warn|info|debug|trace>    Log level (Default: info)
        --maxzoom <LEVEL>                           Maximum zoom level
        --minzoom <LEVEL>                           Minimum zoom level
        --nodeno <NUM>                              Number of this nodes (0 <= n < nodes)
        --nodes <NUM>                               Number of generator nodes
        --overwrite <false|true>                    Overwrite previously cached tiles
        --progress <true|false>                     Show progress bar
        --tileset <NAME>                            Tileset name
```

Usage
-----

Generate tiles for cache:

    t_rex generate --config config.toml


### MBTiles creation

To create MBTiles files with vector tiles from a local cache you can use [MBUtil](https://github.com/mapbox/mbutil).

Example:

    mb-util --image_format=pbf /tmp/mvtcache/streets streets.mbtiles


Drilldown
---------

For analyzing and testing tileset configurations, a `drilldown` command collects statistics at given coordinates.

The statistics are printed to standard output and formatted as CSV.

```java
USAGE:
    t_rex drilldown [OPTIONS] --config <FILE>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -c, --config <FILE>                             Load from custom config file
        --loglevel <error|warn|info|debug|trace>    Log level (Default: info)
        --maxzoom <LEVEL>                           Maximum zoom level
        --minzoom <LEVEL>                           Minimum zoom level
        --points <x1,y1,x2,y2,..>                   Drilldown points
        --progress <true|false>                     Show progress bar
        --tileset <NAME>                            Tileset name
```

Example:

    t_rex drilldown --config mvtbench.toml --points 8.528674,47.370217,9.437237,47.050807 >stats.csv
