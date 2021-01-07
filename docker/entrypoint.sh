#!/bin/sh
set -e

if [ "${DOCKER_SERVICE}" = "app"  ]; then
  if [ "${RUN_MIGRATIONS}" = "true" ]; then
    /app/docker/wait-for.sh db:5432 -- bundle exec rake db:create db:migrate
  fi

  if [ "${RUN_ASSETS_PRECOMPILE}" = "true" ]; then
    bundle exec rake  assets:precompile
  fi
fi

exec "$@"
