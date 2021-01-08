#!/bin/sh
set -e

PUID=${PUID:-1000}
PGID=${PGID:-1000}

if ! grep -q transcoderr "/etc/passwd"; then
  echo "[ADDUSER] Adding user..."
  addgroup -g $PUID -S transcoderr
  adduser -u $PGID transcoderr -G transcoderr -H -D
fi

echo "[ADDUSER] Changing ownership..."
chown -R transcoderr:transcoderr $INSTALL_PATH
chown -R transcoderr:transcoderr /config
