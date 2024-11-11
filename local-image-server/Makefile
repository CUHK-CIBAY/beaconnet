all: install format

install:
	for i in $$(ls -d js-*/); do pushd $$i; yarn install --prod --ignore-optional; popd; done
	yarn install

format:
	yarn run format
	yarn run lint
