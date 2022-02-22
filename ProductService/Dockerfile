FROM node:latest
WORKDIR /Products
COPY package*.json .
RUN npm install
COPY . .
CMD  ["sh", "c", "node createproducts.js && npm start"]