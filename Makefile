all:
	git config core.hooksPath .githooks
	for i in $$(ls -d */); do \
		cd $$i && yarn && make && cd ..; \
	done
