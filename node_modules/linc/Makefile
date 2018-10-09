all: test build
test:
	jasmine-node --coffee --color --verbose .
build:
	coffee -c -o ./ src/linc.coffee
	smoosh make/build.json
