FROM node:latest
WORKDIR /Transactions
COPY package*.json .
RUN npm install
COPY . .
CMD  npm start