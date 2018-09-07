FROM node:8
LABEL author="One"

WORKDIR /opt
COPY migrations migrations
COPY src src
COPY knexfile.js knexfile.js
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]