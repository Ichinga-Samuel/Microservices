FROM node:latest
WORKDIR /Transactions
COPY package*.json .
RUN npm install
COPY . .
CMD  ["../wait-for.sh mongo:27017", "npm", "start"]