# Base image
FROM node:lts-alpine

# Setup working directory in the container fs
WORKDIR /home/express-ts-api

# Copy the package dependencies
COPY package.json yarn.lock

# Install npm dependencies
RUN yarn install

# Copy the contents of current host dir to container working dir
COPY . .

# Expose port for mapping
EXPOSE 8848

# Command to start the app
CMD ["yarn", "start:dev"]
