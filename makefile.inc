
export PACKVER=current$(GENVER)
export GBCPROJECT=../gbc-$(PACKVER)
export DISTBIN=$(PWD)/../distbin
export CWD=$(PWD)
export BUILDCMD=gbc build
#export NVM=nvm use 16.0.0

ifeq (,$(wildcard $(PWD)/custom.json))
	export NOCFG="missing $(PWD)/custom.json"
else
	export CFG=--configuration $(PWD)/custom.json
	#export CFG=--configuration $(PWD)/custom.json --compile-mode prod --create-zip
endif
