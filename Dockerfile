FROM node:boron

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

COPY . /usr/app
RUN npm run clean && npm run compile

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
