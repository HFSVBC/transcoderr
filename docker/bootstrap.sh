#!/bin/sh
set -e

# Check if database exists, if not create database
if [ ! -f $INSTALL_PATH/db/$RAILS_ENV.sqlite3 ]; then
  echo "[BOOSTRAP] Creating database..."
  bundle exec rake db:create
fi

# Migrate and seed database
if [ "${RUN_MIGRATIONS}" = "true" ]; then
  echo "[BOOSTRAP] Migrating and seeding database..."
  bundle exec rake db:migrate db:seed
fi

# Generates assets
if [ "${RUN_ASSETS_PRECOMPILE}" = "true" ]; then
  echo "[BOOSTRAP] Precompiling assets..."
  yarn install --check-files
  bundle exec rake  assets:precompile
fi

echo "[BOOSTRAP] Removing node_modules..."
rm -rf $INSTALL_PATH/node_modules
