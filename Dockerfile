FROM library/node:8-alpine
MAINTAINER Gilles Perreymond <gperreymond@gmail.com>

# Automatic arguments pass from circleCI
ARG CIRCLE_SHA1
ENV NOVA_LAST_COMMIT=$CIRCLE_SHA1

# Prepare alpine packages
RUN apk add --update bash

# Prepare the destination
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Add source files
COPY . /usr/app
RUN find . -name *.test.js -delete && \
    find . -name *.spec.js -delete

# Make the install in the container to avoid compilation problems
RUN yarn install --production --ignore-scripts --pure-lockfile --ignore-engines

# Start application
ENTRYPOINT ["./docker-entrypoint.sh"]

# Expose ports
EXPOSE 8000
