#!/bin/sh
set -e

PUID=${PUID:-1000}
PGID=${PGID:-1000}

groupmod -o -g "$PGID" transcoderr
usermod -o -u "$PUID" transcoderrc

chown -R transcoderr:transcoderr $INSTALL_PATH
