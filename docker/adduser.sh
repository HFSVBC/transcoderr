#!/bin/sh
set -e

PUID=${PUID:-1000}
PGID=${PGID:-1000}

echo "[ADDUSER] Adding user..."
addgroup -g $PUID -S transcoderr
adduser -u $PGID transcoderr -G transcoderr -H -D

echo "[ADDUSER] Changing ownership..."
chown -R transcoderr:transcoderr $INSTALL_PATH
chown -R transcoderr:transcoderr /config
