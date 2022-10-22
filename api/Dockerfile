FROM node:14-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "node", "server/server.js" ]
