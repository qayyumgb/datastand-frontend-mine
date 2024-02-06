FROM node:16-slim

WORKDIR /app
USER root 

# Install dependencies
COPY ./package*.json ./
RUN npm install

# Copy all files
COPY ./ .

RUN npm run build 

# Expose the port defined in the server.js file.
EXPOSE 8080

CMD [ "node", "server.js" ]