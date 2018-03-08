#!/bin/bash

set -e

export NODE_ENV=test

# Environment
echo "Environment: $NODE_ENV"

rm -rf coverage
./node_modules/.bin/nyc --clean --reporter text --reporter lcov --report-dir ./coverage ./node_modules/.bin/mocha --opts .mocharc
