FROM node:latest
WORKDIR /Orders
COPY package*.json .
RUN npm install
COPY . .
CMD  npm start