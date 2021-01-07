#!/bin/sh
set -e

if [ "${RUN_MIGRATIONS}" = "true" ]; then
  bundle exec rake db:migrate db:seed
fi

if [ "${RUN_ASSETS_PRECOMPILE}" = "true" ]; then
  bundle exec rake  assets:precompile
fi

exec "$@"
