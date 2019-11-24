# Version of Node.js to use
FROM node:12-alpine

LABEL maintainer="Daniel Shevtsov <daniel.shevtsov@gmail.com>"

# Set node environment with default to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Set the app user as the owner of the app directory
RUN chown node:node .

# Set user to run app
USER node

# Install app dependencies
COPY --chown=node:node package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

# Run app
CMD ["node", "src/index"]
