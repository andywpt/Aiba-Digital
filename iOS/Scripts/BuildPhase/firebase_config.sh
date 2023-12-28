#!/bin/sh

#  firebase_config.sh
#  Aiba Digital
#
#  Created by Andy Wu on 2023/12/28.
#  

SOURCE_PATH=${PROJECT_DIR}/Firebase
TARGET_PATH=${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist

file=""
if [ "${CONFIGURATION}" == "Release Production" ] || [ "${CONFIGURATION}" == "Debug Production" ]; then
    file=${SOURCE_PATH}/GoogleService-Info-Prod.plist
elif [ "${CONFIGURATION}" == "Release Staging" ] || [ "${CONFIGURATION}" == "Debug Staging" ]; then
    file=${SOURCE_PATH}/GoogleService-Info-Stage.plist
elif [ "${CONFIGURATION}" == "Release Development" ] || [ "${CONFIGURATION}" == "Debug Development" ]; then
    file=${SOURCE_PATH}/GoogleService-Info-Dev.plist
else
    echo "Unknown configuration ${CONFIGURATION}"
    exit 1
fi

if [ ! -f $file ] ; then
    echo "Missing plist file at ${file}"
    exit 1
fi

cp "${file}" "${TARGET_PATH}"
