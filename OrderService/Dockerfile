FROM node:latest
WORKDIR /Orders
COPY package*.json .
RUN npm install
COPY . .
CMD  ["../wait-for.sh mongo:27017", "../wait-for.sh rabbitmq:5672", "npm", "start"]