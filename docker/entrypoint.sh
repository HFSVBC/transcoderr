#!/bin/sh
set -e

# Bootstrap application
$INSTALL_PATH/docker/bootstrap.sh

# Create container user
$INSTALL_PATH/docker/adduser.sh

# Execute command as user
exec /bin/su transcoderr -s /bin/sh <<EOF
"$@"
EOF
