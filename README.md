# GBC Clean Customisation

The goal of this theme was for a very clean look that's more spaced out.

It uses not javascript and very few scss overrides, the bulk of the styling is done in the theme.scss.json file.

This also added a 'Today' button to the DATEEDIT calendar.


NOTE: The setup scripts and makefile need GENVER to be set to 320 or 400 for Genero 3.20 or 4.00


NOTE: The GBC customization was originally done using the 1.00.53 release and updated / revised for 1.00.60


## Folders
* Screenshots : The screenshots for this README
* gbc-clean : The files for the custom GBC
* distbin : place for zip of GBC


## Building
Current requires: nvm use 16.0.0
This was written and tested on Linux. The Makefile and Script are to setup additional folders and to build the GBC.
* 1. The GBC prerequisites building ( grunt nodejs git ) plus: make & zip installed
* 2. Set GBCPROJECTDIR=<folder containing fjs-gbc project.zip file>
 
```
$ git clone <repo url>
$ cd <folder cloned>
$ make
```

## Light
![ss1](https://github.com/neilm-fourjs/gbc_clean/raw/master/Screenshots/SS-1.png "SS1")

## Dark
![ss2](https://github.com/neilm-fourjs/gbc_clean/raw/master/Screenshots/SS-2.png "SS2")

