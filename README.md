# GBC Clean Customisation

The goal of this theme was for a very clean look that's more spaced out.

It uses not javascript and very few scss overrides, the bulk of the styling is done in the theme.scss.json file.


NOTE: The GBC customization was done using the 1.00.53 release.


## Folders
* Screenshots : The screenshots for this README
* gbc-clean : The files for the custom GBC
* distbin : place for zip of GBC


## Building
This was written and tested on Linux. The Makefile and Script are to setup additional folders and to build the GBC.
* 1. The GBC prerequisites building ( grunt nodejs git ) plus: make & zip installed
* 2. Set GBCPROJECTDIR=<folder containing fjs-gbc-1.00.53-build201905131540-project.zip>
 
```
$ git clone <repo url>
$ cd <folder cloned>
$ make
```

## Light
![ss1](https://github.com/neilm-fourjs/gbc_clean/raw/master/Screenshots/SS-1.png "SS1")

## Dark
![ss2](https://github.com/neilm-fourjs/gbc_clean/raw/master/Screenshots/SS-2.png "SS2")

