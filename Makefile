
GBCBASE=$(PWD)

include makefile$(GENVER).inc

BASE=$(shell pwd)
dirs=gbc-clean

all: distbin gbc-current$(GENVER) subdirs

distbin:
	mkdir distbin

# Setup the GBC build env
gbc-current$(GENVER): 
	./gbc-setup.sh > gbc-setup.out

subdirs: $(dirs)
	@for dir in $^ ; do  \
		cd $(BASE)/$$dir && make all; \
	done

clean:
	rm $(DISTBIN)/gbc*.zip

deploy: distbin
	cd distbin && gasadmin gbc --deploy $(dirs).zip

undeploy:
	gasadmin gbc --undeploy $(dirs)

redeploy: undeploy deploy

