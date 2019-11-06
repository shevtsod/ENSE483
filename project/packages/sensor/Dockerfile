# Version of Node.js to use
FROM node:12-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

# Start app
CMD ["npm", "start"]
