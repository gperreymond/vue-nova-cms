.PHONY: default up down coverage test

default: up

up:
	docker-compose pull;
	docker-compose up -d;

down:
	docker-compose down;

coverage:
	npm run test:coverage;

test:
	npm run test:standard;
	npm run test:coverage;
