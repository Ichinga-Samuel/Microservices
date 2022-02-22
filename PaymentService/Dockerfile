FROM node:latest
WORKDIR /Payments
COPY package*.json .
RUN npm install
COPY . .
CMD  npm start