# Version of Node.js to use
FROM node:12-alpine

LABEL maintainer="Daniel Shevtsov <daniel.shevtsov@gmail.com>"

# Download native dependencies
# See https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images

RUN apk --no-cache add --virtual builds-deps build-base python

# Set node environment with default to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=8080
ENV PORT $PORT

# Create app directory
WORKDIR /usr/src/app

# Set the app user as the owner of the app directory
RUN chown node:node .

# Set user to run app
USER node

# Install app dependencies
COPY --chown=node:node package*.json ./

# NOTE: Rebuild bcrypt based on official instructions.
# See https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images
RUN npm ci --only=production && \
  npm rebuild bcrypt --build-from-source

# Bundle app source
COPY --chown=node:node . .

# Expose app ports
EXPOSE $PORT

# Pre-configure app
ENTRYPOINT ["./docker-entrypoint.sh"]

# Start app
CMD ["node", "src/index"]
