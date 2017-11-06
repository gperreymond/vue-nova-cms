#!/usr/bin/env bash

export NOVA_SETTINGS_USERPATH="$(pwd)/test/user"
export NOVA_SERVER_PORT=9090

rm -rf test/user/pages/*test*
./node_modules/.bin/nyc --reporter=lcov --reporter=text ./node_modules/.bin/mocha --opts .mocharc
rm -rf test/user/pages/*test*
