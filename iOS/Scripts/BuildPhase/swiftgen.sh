#!/bin/sh

#  swiftgen.sh
#  AibaDigital
#
#  Created by Andy Wu on 2023/12/30.
#  

if [[ -f "${PODS_ROOT}/SwiftGen/bin/swiftgen" ]]; then
  echo "${PODS_ROOT}/SwiftGen/bin/swiftgen"
  # "${PODS_ROOT}/SwiftGen/bin/swiftgen"
  ${PODS_ROOT}/SwiftGen/bin/swiftgen config run --config SwiftGen/swiftgen.yml
else
  echo "warning: SwiftGen is not installed. Run 'pod install --repo-update' to install it."
fi
