all: build up

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: rm stop
rm: stop
	docker-compose rm -f

.PHONY: stop
stop:
	docker-compose stop

.PHONY: spec-watch
spec-watch:
	docker-compose run app npm run test:spec:watch

.PHONY: spec
spec:
	docker-compose run app npm run test:spec

.PHONY: unit
unit:
	docker-compose run app npm run test:unit

.PHONY: unit-watch
unit-watch:
	docker-compose run app npm run test:unit:watch

.PHONY: test
test:
	docker-compose run app npm test

.PHONY: attach
attach:
	docker-compose run app bash

.PHONY: docs
docs:
	docker-compose run app npm run docs

.PHONY: logs
logs:
	docker-compose logs --follow

.PHONY: logs
logs-spec:
	tail -f spec.log
