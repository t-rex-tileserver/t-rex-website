+++
title = "Setup"
order = 1
+++

Setup
=====

Installation
------------

<div class="vtab">

### Ubuntu

Add UbuntuGIS PPA [Stable](https://launchpad.net/~ubuntugis/+archive/ubuntu/ppa) or [Unstable](https://launchpad.net/~ubuntugis/+archive/ubuntu/ubuntugis-unstable).

Install GDAL 2.x library:
```
sudo apt-get install libgdal20
```

Download and install DEB package from [github.com](https://github.com/t-rex-tileserver/t-rex/releases/latest):

```
curl -O -L https://github.com/t-rex-tileserver/t-rex/releases/download/v0.8.0-beta1/t-rex-v0.8.0-beta1-x86_64-unknown-linux-gnu.deb && sudo dpkg -i t-rex-0.8.0-beta1-x86_64-unknown-linux-gnu.deb
```

</div><div class="vtab">

### Windows

Download MSI installer from [github.com](https://github.com/t-rex-tileserver/t-rex/releases/latest):

[t-rex-v0.8.0-beta1.msi](https://github.com/t-rex-tileserver/t-rex/releases/download/v0.8.0-beta1/t-rex-v0.8.0-beta1.msi)

Double click to install (needs Administrator permissions).

Run in Command Prompt window:

```
%programfiles%\t-rex\t_rex
```

</div><div class="vtab">

### Docker

Install [Docker](https://www.docker.com/community-edition#/download) on your platform.

Download and run the t-rex Docker image:
```
docker pull sourcepole/t-rex
docker run sourcepole/t-rex --version
docker run -p 6767:6767 sourcepole/t-rex serve --bind=0.0.0.0 --openbrowser=false
```

The are two volumes for data input and data output. Argument example using input and output volumes:

`docker run -v $PWD:/var/data/in:ro -v /tmp:/var/data/out`

</div>
