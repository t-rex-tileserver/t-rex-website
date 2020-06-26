+++
title = "Configuration Reference"
weight = 5
+++

Configuration Reference
=======================

service
-------

### mvt

Mapbox Vector Tile service.

`viewer`: true | false

Enable/Disable built-in viewer

Example:
```toml
[service.mvt]
viewer = true
```

datasource
----------

`name`: string

Name of datasource

`default`: true | false

Use as default datasource when no name is given in layer datasource.

If no datasource is marked as `default`, the first one will be used.

`dbconn`: <Rust-Postgres connection URL>

DB connection URL in the form "`postgres://user:pass@host:port/database`".

`pass` may be omitted if not needed. `port` defaults to `5432` and `database` defaults to the value of `user` if not specified. The driver supports `trust`, `password`, and `md5` authentication. Unix domain sockets can be used as well. The `host` portion of the URI should be set to the absolute path to the directory containing the socket file.

Special URI characters (even in the password!) have to be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters). See Rust-Postgres [connection](https://github.com/sfackler/rust-postgres/tree/postgres-v0.15.2#connecting) for more details.

`pool`: integer

Connection pool size.

Example:
```toml
[[datasource]]
name = "buildings"
dbconn = "postgresql://postgres@127.0.0.1/osm_buildings"
```

`path`: <file path or GDAL datasource spec>

GDAL datasource specification.

Example:
```toml
[[datasource]]
name = "natural_earth"
path = "natural_earth.gpkg"
```

grid
----

`predefined`: "web_mercator" | "wgs84"

Use a built-in grid.

Example:
```toml
[grid]
predefined = "web_mercator"
```

### user

Custom grid definition.

`width`: integer

Width of an individual tile in pixels.

`height`: integer

Height of an individual tile in pixels.

`extent`: { minx: float, miny: float, maxx: float, maxy: float }

Geographical extent covered by the grid, in ground units (e.g. meters, degrees, feet, etc.).

The (minx,miny) point defines the origin of the grid, i.e. the pixel at the bottom left of the
bottom-left most tile is always placed on the (minx,miny) geographical point.
The (maxx,maxy) point is used to determine how many tiles there are for each zoom level.

`srid`: number

Spatial reference system (PostGIS SRID).

`units` : "m" | "dd" | "ft"

Grid units (m: meters, dd: decimal degrees, ft: feet)

`resolutions`: [float, ...]

List of resolutions for each of the zoom levels defined by the grid, ordered from largest to smallest.

The largest value will correspond to the grid’s zoom level 0. Resolutions
are expressed in “units-per-pixel”, depending on the unit used by the grid
(e.g. resolutions are in meters per pixel for most grids used in webmapping).

`origin`: "TopLeft" | "BottomLeft"

Grid origin

Example:
```toml
[grid.user]
width = 256
height = 256
extent = { minx = 2420000.0, miny = 1030000.0, maxx = 2900000.0, maxy = 1350000.0 }
srid = 2056
units = "m"
resolutions = [4000.0,3750.0,3500.0,3250.0,3000.0,2750.0,2500.0,2250.0,2000.0,1750.0,1500.0,1250.0,1000.0,750.0,650.0,500.0,250.0,100.0,50.0,20.0,10.0,5.0,2.5,2.0,1.5,1.0,0.5]
origin = "TopLeft"
```

tileset
-------

`name`: string

Tileset name.

`extent`: { minx: float, miny: float, maxx: float, maxy: float }

Extent covered by tileset.

`minzoom`: integer

Minimum zoom level for which tiles are available (Default: 0).  
If unset, minzoom is deduced from layer and query minzoom limits.

`maxzoom`: integer

Maximum zoom level for which tiles are available (Default: 22).  
If unset, maxzoom is deduced from layer and query maxzoom limits.  
Viewers use data from tiles at the maxzoom when displaying the map at higher zoom levels.

`center`: float, float

Longitude, latitude of map center (in WGS84).  
Viewers can use this value to set the default location.

`start_zoom`: integer

Start zoom level. Must be between `minzoom` and `maxzoom`.

`cache_limits`: { minzoom: integer, maxzoom: integer, no_cache: boolean }

Optional limits of zoom levels which should be cached. Tiles in other zoom levels,
or all if `no_cache` is `true`, are served from live data.

Default: `cache_limits = {minzoom = 0, maxzoom = 22, no_cache = false}`

`attribution`: string

Acknowledgment of ownership, authorship or copyright.

Example:
```toml
[[tileset]]
name = "osm"
attribution = "© OpenStreetMap contributors"
```

### layer

`name`: string

Layer name.

`datasource`: string

Name of datasource (see `[[datasource]]`). Default datasource is used, when name is undefined.

`geometry_field`: string

Name of geometry field.

`geometry_type`:  "POINT" | "MULTIPOINT" | "LINESTRING" | "MULTILINESTRING" | "POLYGON" | "MULTIPOLYGON" | "COMPOUNDCURVE" | "CURVEPOLYGON"

Type of geometry in PostGIS database or in GDAL layer.  
Curve geometry types are supported for PostGIS layers only.

`srid`: integer

Spatial reference system (PostGIS SRID).  
For GDAL layers this setting is ignored and always determined from the data source.

`no_transform`: true | false

Handle geometries as they were in grid SRS (Default: false).

`fid_field`: string

Field name to be used as the feature ID.

`table_name`: string

Name of database table or GDAL layer.
  
`query_limit`: integer

Maximal number of features to read for a single tile. 

`minzoom`: integer

Minimum zoom level for which tiles are available (Default: 0).  
If unset, minzoom is deduced from query minzoom limits.

`maxzoom`: integer

Maximum zoom level for which tiles are available.  
If unset, maxzoom is deduced from query maxzoom limits.

`tile_size`: integer

Width and height of the tile (Default: 4096. Grid default size is 256)

`simplify`: true | false

Simplify geometry (lines and polygons). Can be overridden in a layer's query configuration.

Supported for PostGIS layer only.

`tolerance`: string

Simplification tolerance (Default: !pixel_width!/2)

Supported for PostGIS layer only.

`buffer_size`: integer

Tile buffer size in pixels.  
When undefined, line and polygon geometries are not clipped.  
Supported for PostGIS layer only.

`make_valid`: true | false

Fix invalid geometries (lines and polygons) before clipping. (Default: false)  
Supported for PostGIS layer only.

`shift_longitude`: true | false

Apply `ST_ShiftLongitude` to (transformed) bbox. (Default: false)
Supported for PostGIS layer only.

Example:
```toml
[[tileset.layer]]
name = "points"
datasource = "natural_earth"
# Select all attributes of table:
table_name = "ne_10m_populated_places"
geometry_field = "wkb_geometry"
geometry_type = "POINT"
```

#### query

`minzoom`: integer

Minimal zoom level for using this query.

`maxzoom`: integer

Maximal zoom level for using this query.

`simplify`: true | false

Simplify geometry (lines and polygons). Overrides layer simplification, if set.

Supported for PostGIS layer only.


`sql`: string
  
Explicit SQL query.

The following variables are replaced at runtime:

* `!bbox!`: Bounding box of tile
* `!zoom!`: Zoom level of tile request
* `!scale_denominator!`: Map scale of tile request
* `!pixel_width!`: Width of pixel in grid units

Example:
```toml
[[tileset.layer.query]]
minzoom = 17
maxzoom = 22
sql = """
  SELECT name, type, osm_id, geometry
  FROM osm_buildings
  WHERE geometry && !bbox!"""
```

cache
-----

### file

File system based tile cache.

Directory layout: `<base path>/<tileset name>/<z>/<x>/<y>.pbf`

`base`: string

Base path for storing tiles.

`baseurl`: string

Base URL of tile cache server published in metadata.

Example:
```toml
[cache.file]
base = "/var/cache/mvtcache"
```

webserver
---------

`bind`: "\<IP adress\>"

IP address of interface to bind web server (`0.0.0.0` for all).

Default: `127.0.0.1`

`port`: integer

Web server port number.

Default: `6767`

`threads`: integer

Number of parallel web server threads. Defaults to number of available logical CPUs.

`cache_control_max_age`: integer

Cache-Control headers set by web server.


Example:
```toml
[webserver]
bind = "0.0.0.0"
port = 8080
```

### static

`dir`: string

Directory to serve static files from.

`path`: string

HTTP path for accessing static files.


Example:
```toml
[[webserver.static]]
dir = "./public/"
path = "/static"
```
