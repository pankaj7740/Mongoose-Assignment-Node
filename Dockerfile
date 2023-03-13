FROM node:14.16.0-alpine as DEPEDENCIES_IMAGE

RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm prune --production
RUN /usr/local/bin/node-prune


FROM node:14.16.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY --from=DEPEDENCIES_IMAGE /usr/src/app/node_modules ./node_modules

COPY ./.env ./
COPY ./dist/ ./

CMD node index.js
