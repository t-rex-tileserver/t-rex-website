+++
title = "Serving vector tiles"
weight = 2
+++

Serving vector tiles
====================

Usage
-----

```
t_rex serve --dbconn postgresql://user:pass@localhost/dbname
```

Tiles are then served at `http://localhost:6767/{layer}/{z}/{x}/{y}.pbf`

A list of all detected layers is available at [http://localhost:6767/](http://localhost:6767/)

GDAL examples:

```
t_rex serve --datasource natural_earth.gpkg
t_rex serve --datasource ne_110m_coastline.shp
t_rex serve --datasource liechtenstein-latest.osm.pbf
t_rex serve --datasource route.gpx
t_rex serve --datasource spreadsheet.vrt
```

Use a tile cache:

```
t_rex serve --dbconn postgresql://user:pass@localhost/dbname --cache /tmp/mvtcache
```

Run server with configuration file:

```
t_rex serve --config config.toml
```


Server options
--------------

```java
USAGE:
    t_rex serve [OPTIONS]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --bind <IPADDRESS>                          Bind web server to this address (0.0.0.0 for all)
        --cache <DIR>                               Use tile cache in DIR
        --clip <true|false>                         Clip geometries
    -c, --config <FILE>                             Load from custom config file
        --datasource <FILE_OR_GDAL_DS>              GDAL datasource specification
        --dbconn <SPEC>                             PostGIS connection postgresql://USER@HOST/DBNAME
        --detect-geometry-types <true|false>        Detect geometry types when undefined
        --loglevel <error|warn|info|debug|trace>    Log level (Default: info)
        --no-transform <true|false>                 Do not transform to grid SRS
        --openbrowser <true|false>                  Open backend URL in browser
        --port <PORT>                               Bind web server to this port
        --qgs <FILE>                                QGIS project file
        --simplify <true|false>                     Simplify geometries
```


Production environments
-----------------------

Usually, generated tiles are served as static files from a web server like Apache or Nginx. If real-time updates are needed, Apache or Nginx can be configured to act as a proxy webserver.

Configuration examples:

### Nginx

```
location / {
    root /var/cache/mvtcache;

    try_files $uri $uri/ =204;
}

location /tilesetname/ {
    # CORS
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET';
}

location ~ /tilesetname/.+pbf$ {
    # gzip Encoding and MIME type type
    add_header  Content-Encoding  gzip;
    gzip off;
    types { application/x-protobuf pbf; }

    # CORS
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET';
}
```
