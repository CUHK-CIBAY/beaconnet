SHELL:=/bin/bash
all:
	git config core.hooksPath .githooks
	for i in $$(ls -d */); do pushd $$i; yarn && make; popd; done
