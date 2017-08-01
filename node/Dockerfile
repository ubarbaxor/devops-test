FROM node:8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD ./app/package.json /usr/src/app/package.json
#ADD ./app/server.js /usr/src/app/server.js
RUN npm install

EXPOSE 3000

CMD npm start