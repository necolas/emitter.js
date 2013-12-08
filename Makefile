all: install test

install:
	@ npm install

test:
	@ ./node_modules/.bin/mocha --reporter spec

.PHONY: all install test
