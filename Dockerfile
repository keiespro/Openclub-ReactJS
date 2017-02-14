FROM node:boron

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

COPY . /usr/app

ENV PORT 8001
EXPOSE 8001

CMD [ "node", "server/main.js" ]
