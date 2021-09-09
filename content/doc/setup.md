+++
title = "Setup"
weight = 1
+++

Setup
=====

Installation
------------

<div class="vtab">

### Ubuntu Focal

Install GDAL library:
```
sudo apt install libgdal26
```

Download and install DEB package from [github.com](https://github.com/t-rex-tileserver/t-rex/releases/latest):

```
curl -O -L https://github.com/t-rex-tileserver/t-rex/releases/download/v0.14.0/t-rex_0.14.0_amd64.deb && sudo dpkg -i t-rex_0.14.0_amd64.deb
```

</div><div class="vtab">

### Linux

Download Binary with minimal dependencies (no GDAL driver) from [github.com](https://github.com/t-rex-tileserver/t-rex/releases/latest):

```
curl -O -L https://github.com/t-rex-tileserver/t-rex/releases/download/v0.14.0/t-rex-v0.14.0-x86_64-linux-gnu.tar.gz && sudo tar xf t-rex-v0.14.0-x86_64-linux-gnu.tar.gz -C /usr/local/bin
```

</div><div class="vtab">

### Windows

Download MSI installer from [github.com](https://github.com/t-rex-tileserver/t-rex/releases/latest):

[t-rex-v0.14.0.msi](https://github.com/t-rex-tileserver/t-rex/releases/download/v0.14.0/t-rex-v0.14.0.msi)

Double click to install (needs Administrator permissions).

Run in Command Prompt window:

```
set PROJ_LIB=%programfiles%\t-rex\proj7\share

"%programfiles%\t-rex\t_rex"
```

</div><div class="vtab">

### Docker

Install [Docker](https://www.docker.com/community-edition#/download) on your platform.

Download and run the t-rex Docker image:
```
docker pull sourcepole/t-rex:0.14.0
docker run sourcepole/t-rex:0.14.0 --version
docker run -p 6767:6767 sourcepole/t-rex:0.14.0 serve --bind=0.0.0.0 --openbrowser=false --config=myconfig.toml
```

The process is running as user `www-data` with the working directory `/var/data/in`. For output, a volume `/var/data/out` is available.

Example using input and output volumes (Unix):

`docker run -p 6767:6767 -v $PWD:/var/data/in:ro -v /tmp:/var/data/out sourcepole/t-rex:0.14.0 serve --bind=0.0.0.0 --openbrowser=false --config=myconfig.toml`

Current directory on Windows:

`docker run -p 6767:6767 -v %CD%:/var/data/in:ro sourcepole/t-rex:0.14.0 serve --bind=0.0.0.0 --openbrowser=false --config=myconfig.toml`

</div>


Upgrading
---------

See the [Changelog](https://github.com/t-rex-tileserver/t-rex/blob/master/CHANGELOG.md) for breaking changes in new versions.

### 0.7.x -> 0.8.0

Conversion to new datasource syntax:
```
sed -e 's/\[datasource\]/[[datasource]]/g' \
    -e '/type = "postgis"/d' \
    -e 's/url =/dbconn =/g' \
    infile.toml
```
