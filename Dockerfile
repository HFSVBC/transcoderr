#
# Node builder
#
FROM node:14.15.0-alpine as node-builder

#
# Stage builder
#
FROM ruby:2.7.2-alpine AS builder

ARG BUNDLE_WITHOUT
ARG EXTRA_PACKAGES
ARG FREEZE_BUNDLE=true
ARG RACK_ENV
ARG RAILS_LOG_TO_STDOUT=true

ENV BUNDLE_WITHOUT ${BUNDLE_WITHOUT}
ENV EXTRA_PACKAGES ${EXTRA_PACKAGES}
ENV FREEZE_BUNDLE ${FREEZE_BUNDLE}
ENV INSTALL_PATH /app
ENV RACK_ENV ${RACK_ENV}
ENV RAILS_LOG_TO_STDOUT ${RAILS_LOG_TO_STDOUT}

COPY --from=node-builder /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN apk add --no-cache \
    alpine-sdk \
    build-base \
    curl \
    ffmpeg \
    file \
    git \
    libcurl \
    python2 \
    sqlite-dev \
    tzdata \
    yarn \
    ${EXTRA_PACKAGES}

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

ADD Gemfile* ./
RUN if [ "${FREEZE_BUNDLE}" = "true" ] ; then bundle config --global frozen 1 ; fi \
  && bundle install -j4 --retry 3 \
  && rm -rf /usr/local/bundle/cache/*.gem \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete

ADD package.json yarn.lock ./
RUN yarn install --check-files

ADD . ./

#
# Stage final
#
FROM ruby:2.7.2-alpine

ARG PGID=1000
ARG PUID=1000
ARG RACK_ENV=production
ARG RAILS_LOG_TO_STDOUT=true
ARG RAILS_SERVE_STATIC_FILES=true
ARG RUN_ASSETS_PRECOMPILE=true
ARG RUN_MIGRATIONS=true

ENV INSTALL_PATH /app
ENV PGID ${PGID}
ENV PUID ${PUID}
ENV RACK_ENV ${RACK_ENV}
ENV RAILS_ENV ${RACK_ENV}
ENV RAILS_LOG_TO_STDOUT ${RAILS_LOG_TO_STDOUT}
ENV RAILS_SERVE_STATIC_FILES ${RAILS_SERVE_STATIC_FILES}
ENV RUN_ASSETS_PRECOMPILE ${RUN_ASSETS_PRECOMPILE}
ENV RUN_MIGRATIONS ${RUN_MIGRATIONS}

COPY --from=node-builder /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN apk add --update --no-cache \
  ffmpeg \
  file \
  git \
  less \
  sqlite-dev \
  tzdata \
  yarn

RUN addgroup -g $PUID -S transcoderr \
&& adduser -u $PGID -S transcoderr -G transcoderr
USER transcoderr

COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=builder --chown=transcoderr:transcoderr $INSTALL_PATH $INSTALL_PATH

WORKDIR $INSTALL_PATH

EXPOSE 3000

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["bundle", "exec", "puma", "-C", "/app/config/puma.rb"]
