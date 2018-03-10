#!/bin/bash

if [ -z "$NODE_ENV" ]; then export NODE_ENV=test; fi

# Environment
echo "Environment: $NODE_ENV"

# Fix port if dgoss specs tests
echo "DGOSS enable: $ENABLE_DGOSS"
if [ "$ENABLE_DGOSS" ]; then export VHAPI_PORT=8000; fi

# Start application
echo "Start application"
node .
