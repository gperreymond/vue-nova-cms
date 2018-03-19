#!/bin/bash

ECS_APP=vue-nova-cms

docker load --input /tmp/images/${ECS_APP}.tar

export GOSS_FILES_STRATEGY=cp
export GOSS_SLEEP=30

curl -fsSL https://goss.rocks/install | sh
sleep 2s

dgoss run -e ENABLE_DGOSS=1 gperreymond/$ECS_APP
