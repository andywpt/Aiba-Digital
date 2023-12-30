#!/bin/sh

#  env_config.sh
#  Aiba Digital
#
#  Created by Andy Wu on 2023/12/28.
#  

# This script should run before the complie step in build phase

TEMPLATE_PATH=${PROJECT_DIR}/Sourcery/config.stencil
OUTPUT_PATH=${PROJECT_DIR}/${TARGET_NAME}/App/Config.swift

file=""
if [ "${CONFIGURATION}" == "Release Production" ] || [ "${CONFIGURATION}" == "Debug Production" ]; then
    file=${PROJECT_DIR}/.env
elif [ "${CONFIGURATION}" == "Release Staging" ] || [ "${CONFIGURATION}" == "Debug Staging" ]; then
    file=${PROJECT_DIR}/.env
elif [ "${CONFIGURATION}" == "Release Development" ] || [ "${CONFIGURATION}" == "Debug Development" ]; then
    file=${PROJECT_DIR}/.env.dev
else
    echo "Unknown configuration ${CONFIGURATION}"
    exit 1
fi

if [ ! -f $file ] ; then
    echo "Missing env file at ${file}"
    exit 1
fi
# Arguments should be separated with , without spaces (i.e. arg1=value,arg2=value)
# To pass in string you should use escaped quotes (\")
arguments=$(sed -n 's/=/ /p' $file | awk '{printf "%s=\"%s\",", $1, $2}' | sed 's/,$//')

# Run Sourcery Codegen
$PODS_ROOT/Sourcery/bin/sourcery \
    --templates $TEMPLATE_PATH \
    --sources $OUTPUT_PATH \
    --output $OUTPUT_PATH \
    --args $arguments
