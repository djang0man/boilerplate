NODEMON := node_modules/.bin/nodemon
WEBPACK := node_modules/.bin/webpack
LINT    :=  node_modules/.bin/prettylint

clean:
	clean-deps clean-dist

clean-deps:
	clean-lockfile clean-node_modules

clean-dist:
	rm -rf ./web-server/dist

clean-lockfile:
	rm package-lock.json

deps:
	npm i

start:
	npm start

pdev:
	REDUX_DEVTOOLS=true IS_PRETTIER=true VERSION=dev $(WEBPACK) --config ./build/webpack.dev.js -w --progress

pretty:
	$(LINT) --config .prettierrc.json --fix "apps/**/*.js"
	$(LINT) --config .prettierrc.json --fix "shared/**/*.js"

lint:
	$(LINT) --config .prettierrc.json "apps/**/*.js"
	$(LINT) --config .prettierrc.json "shared/**/*.js"

server:
	$(NODEMON) ./web-server/server.js
