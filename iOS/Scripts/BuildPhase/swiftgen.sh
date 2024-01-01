#!/bin/sh

#  swiftgen.sh
#  AibaDigital
#
#  Created by Andy Wu on 2023/12/30.
#  

if [ ! -f "${PODS_ROOT}/SwiftGen/bin/swiftgen" ] ; then
  echo "SwiftGen not installed"
  exit 1
fi

${PODS_ROOT}/SwiftGen/bin/swiftgen config run --config SwiftGen/swiftgen.yml
