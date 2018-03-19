#!/bin/bash

ECS_APP=vue-nova-cms
if [ -z $CIRCLE_SHA1 ]; then CIRCLE_SHA1=development; fi
BUILD_DIR=${1:-.}

docker build -t gperreymond/$ECS_APP --build-arg ECS_APP=$ECS_APP --build-arg CIRCLE_SHA1=$CIRCLE_SHA1 $BUILD_DIR

mkdir -p /tmp/images
docker save --output /tmp/images/${ECS_APP}.tar gperreymond/${ECS_APP}
