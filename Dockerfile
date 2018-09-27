FROM node:9.3.0-alpine

RUN apk update && apk add bash && apk add git

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

ENTRYPOINT ["yarn", "start"]