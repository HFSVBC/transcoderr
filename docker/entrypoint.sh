#!/bin/sh
set -e

echo "[ENTRYPOINT] Initializing container..."

# Bootstrap application
$INSTALL_PATH/docker/bootstrap.sh

# Create container user
$INSTALL_PATH/docker/adduser.sh

echo "[ENTRYPOINT] Container Initialized"

# Execute command as user
su-exec transcoderr "$@"
